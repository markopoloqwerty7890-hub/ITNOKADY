"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../animations/gsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Robot from "./Robot";
import {
    createSmoothScroll,
    getLeftExitOffset,
    ROBOT_MOVE_SCROLL_PX,
    ROBOT_WALK_CYCLE_DISTANCE,
    ROBOT_WALK_MOVE_THRESHOLD,
    ROBOT_WALK_SETTLE_FACTOR,
    ROBOT_WALK_SWING_SMOOTH,
} from "./robot-motion";

const BASE_WIDTH = 200;
const BASE_HEIGHT = 230;
const easeMove = gsap.parseEase("sine.inOut");
const RobotAnchorContext = createContext(null);

export function useRobotAnchor() {
    const ctx = useContext(RobotAnchorContext);
    if (!ctx) {
        throw new Error("useRobotAnchor должен использоваться внутри RobotAnchorProvider");
    }
    return ctx;
}

export function RobotAnchorProvider({ children }) {
    const containerRef = useRef(null);
    const robotRef = useRef(null);
    const anchorsMapRef = useRef(new Map());
    const walkRef = useRef({ phase: 0, lastX: null, swing: 0, isWalking: false });
    const [isReady, setIsReady] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const registerAnchor = (id, el, anchorPose) => {
        anchorsMapRef.current.set(id, { el, pose: anchorPose });
    };
    const unregisterAnchor = (id) => {
        anchorsMapRef.current.delete(id);
    };
    useEffect(() => {
        const container = containerRef.current;
        const robotEl = robotRef.current;
        if (!container || !robotEl || !isDesktop) {
            setIsReady(false);
            return;
        }
        let scrollTrigger;
        let resizeTimeout;
        let settleFrame = 0;
        let docAnchors = [];
        let smoothScroll;
        const setWalk = (swing) => {
            walkRef.current.swing = swing;
            robotEl.style.setProperty("--walk-swing", swing.toFixed(4));
            robotEl.style.setProperty("--walk-bob", "0");
        };
        const settleWalk = () => {
            cancelAnimationFrame(settleFrame);
            const step = () => {
                const swing = walkRef.current.swing;
                if (Math.abs(swing) < 0.015) {
                    setWalk(0);
                    return;
                }
                setWalk(swing * ROBOT_WALK_SETTLE_FACTOR);
                settleFrame = requestAnimationFrame(step);
            };
            settleFrame = requestAnimationFrame(step);
        };
        const updateWalk = (centerX) => {
            const walk = walkRef.current;
            if (walk.lastX === null) {
                walk.lastX = centerX;
                return;
            }
            const distance = Math.abs(centerX - walk.lastX);
            walk.lastX = centerX;
            if (distance <= ROBOT_WALK_MOVE_THRESHOLD) {
                if (walk.isWalking) {
                    walk.isWalking = false;
                    settleWalk();
                }
                return;
            }
            cancelAnimationFrame(settleFrame);
            walk.isWalking = true;
            walk.phase = (walk.phase + distance / ROBOT_WALK_CYCLE_DISTANCE) % 1;
            const targetSwing = Math.sin(walk.phase * Math.PI * 2);
            setWalk(walk.swing + (targetSwing - walk.swing) * ROBOT_WALK_SWING_SMOOTH);
        };
        const buildAnchors = () => {
            const entries = Array.from(anchorsMapRef.current.values());
            if (entries.length === 0) {
                return [];
            }
            return entries
                .map(({ el, pose: anchorPose }) => {
                    const rect = el.getBoundingClientRect();
                    return {
                        pose: anchorPose,
                        centerX: rect.left + window.scrollX + rect.width / 2,
                        centerY: rect.top + window.scrollY + rect.height / 2,
                        width: rect.width,
                        scrollY: 0,
                    };
                })
                .sort((a, b) => a.centerY - b.centerY);
        };
        const applyPosition = (centerX, centerY, width, opacity) => {
            const containerRect = container.getBoundingClientRect();
            const containerLeftDoc = containerRect.left + window.scrollX;
            const containerTopDoc = containerRect.top + window.scrollY;
            const scale = Math.max(width / BASE_WIDTH, 0.001);
            const x = centerX - (BASE_WIDTH * scale) / 2 - containerLeftDoc;
            const y = centerY - (BASE_HEIGHT * scale) / 2 - containerTopDoc;
            gsap.set(robotEl, {
                x,
                y,
                scale,
                opacity,
                transformOrigin: "0 0",
            });
            if (opacity > 0.05) {
                updateWalk(centerX);
                return;
            }
            walkRef.current.lastX = centerX;
            walkRef.current.isWalking = false;
            setWalk(0);
        };
        const recalcAnchorScroll = () => {
            docAnchors.forEach((anchor) => {
                anchor.scrollY = anchor.centerY - window.innerHeight * 0.5;
            });
        };
        const getLeftOffscreenX = (anchor) => {
            return anchor.centerX - getLeftExitOffset();
        };
        const buildLeftMove = ({ fromX, toX, centerY, width, u, fadeIn }) => {
            const eased = easeMove(u);
            return {
                centerX: gsap.utils.interpolate(fromX, toX, eased),
                centerY,
                width,
                opacity: fadeIn ? eased : 1 - eased,
            };
        };
        const buildLeftTransition = (prev, next, scrollY) => {
            const exitX = getLeftOffscreenX(prev);
            const enterX = getLeftOffscreenX(next);
            const gap = Math.max(next.scrollY - prev.scrollY, 1);
            const movePx = Math.min(ROBOT_MOVE_SCROLL_PX, gap * 0.4);
            const exitEnd = prev.scrollY + movePx;
            const enterStart = next.scrollY - movePx;
            if (scrollY <= prev.scrollY) {
                return {
                    centerX: prev.centerX,
                    centerY: prev.centerY,
                    width: prev.width,
                    opacity: 1,
                };
            }
            if (scrollY < exitEnd) {
                const u = gsap.utils.clamp(0, 1, (scrollY - prev.scrollY) / movePx);
                return buildLeftMove({
                    fromX: prev.centerX,
                    toX: exitX,
                    centerY: prev.centerY,
                    width: prev.width,
                    u,
                    fadeIn: false,
                });
            }
            if (scrollY <= enterStart) {
                return {
                    centerX: enterX,
                    centerY: next.centerY,
                    width: next.width,
                    opacity: 0,
                };
            }
            if (scrollY < next.scrollY) {
                const u = gsap.utils.clamp(0, 1, (scrollY - enterStart) / movePx);
                return buildLeftMove({
                    fromX: enterX,
                    toX: next.centerX,
                    centerY: next.centerY,
                    width: next.width,
                    u,
                    fadeIn: true,
                });
            }
            return {
                centerX: next.centerX,
                centerY: next.centerY,
                width: next.width,
                opacity: 1,
            };
        };
        const applyScroll = (scrollY) => {
            if (docAnchors.length === 0) {
                return;
            }
            const first = docAnchors[0];
            const last = docAnchors[docAnchors.length - 1];
            if (scrollY <= first.scrollY) {
                applyPosition(first.centerX, first.centerY, first.width, 1);
                return;
            }
            if (scrollY >= last.scrollY) {
                applyPosition(last.centerX, last.centerY, last.width, 1);
                return;
            }
            for (let i = 0; i < docAnchors.length - 1; i += 1) {
                const prev = docAnchors[i];
                const next = docAnchors[i + 1];
                if (scrollY < prev.scrollY || scrollY > next.scrollY) {
                    continue;
                }
                const pose = buildLeftTransition(prev, next, scrollY);
                applyPosition(pose.centerX, pose.centerY, pose.width, pose.opacity);
                return;
            }
        };
        const setup = () => {
            docAnchors = buildAnchors();
            if (docAnchors.length === 0) {
                return;
            }
            walkRef.current.lastX = null;
            walkRef.current.swing = 0;
            walkRef.current.isWalking = false;
            setWalk(0);
            scrollTrigger?.kill();
            smoothScroll?.destroy();
            smoothScroll = createSmoothScroll(applyScroll);
            scrollTrigger = ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                onUpdate: () => smoothScroll.setTarget(window.scrollY || window.pageYOffset || 0),
                onRefresh: () => {
                    recalcAnchorScroll();
                    smoothScroll.jumpTo(window.scrollY || window.pageYOffset || 0);
                },
            });
            recalcAnchorScroll();
            smoothScroll.jumpTo(window.scrollY || window.pageYOffset || 0);
            setIsReady(true);
        };
        const raf = requestAnimationFrame(setup);
        const handleResize = () => {
            window.clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                setup();
                ScrollTrigger.refresh();
            }, 200);
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("load", setup);
        return () => {
            cancelAnimationFrame(raf);
            cancelAnimationFrame(settleFrame);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("load", setup);
            window.clearTimeout(resizeTimeout);
            scrollTrigger?.kill();
            smoothScroll?.destroy();
        };
    }, [isDesktop]);
    return (
      <RobotAnchorContext.Provider value={{ registerAnchor, unregisterAnchor, isDesktop }}>
        <div ref={containerRef} className="relative overflow-x-clip">
          {children}
          <div
            ref={robotRef}
            className={`pointer-events-none absolute left-0 top-0 z-30 hidden lg:block ${isReady ? "" : "opacity-0"}`}
            style={{ width: BASE_WIDTH, height: BASE_HEIGHT }}
            aria-hidden="true"
          >
            <Robot className="h-full w-full drop-shadow-md" />
          </div>
        </div>
      </RobotAnchorContext.Provider>
    );
}
