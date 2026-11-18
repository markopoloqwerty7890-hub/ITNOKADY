"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../animations/gsap";
import { useRobotAnchor } from "./RobotAnchorProvider";
import Robot from "./Robot";
import {
    createSmoothScroll,
    getLeftExitOffset,
    ROBOT_MOVE_SCROLL_PX,
} from "./robot-motion";

const easeMove = gsap.parseEase("sine.inOut");

export default function RobotAnchor({ id, pose, className = "", mode = "fly" }) {
    const markerRef = useRef(null);
    const localRef = useRef(null);
    const { registerAnchor, unregisterAnchor, isDesktop } = useRobotAnchor();
    useEffect(() => {
        if (!isDesktop || mode !== "fly") {
            return;
        }
        const el = markerRef.current;
        if (!el) {
            return;
        }
        registerAnchor(id, el, pose);
        return () => unregisterAnchor(id);
    }, [id, pose, mode, isDesktop, registerAnchor, unregisterAnchor]);
    useEffect(() => {
        if (!isDesktop || mode !== "local") {
            return;
        }
        const robotEl = localRef.current;
        if (!robotEl) {
            return;
        }
        const section = robotEl.closest("section") || robotEl;
        const exitX = -getLeftExitOffset();
        const applyLocalProgress = (scrollY) => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const sectionBottom = sectionTop + section.offsetHeight;
            const enterStart = sectionTop - window.innerHeight * 0.75;
            const enterEnd = enterStart + ROBOT_MOVE_SCROLL_PX;
            const exitStart = sectionBottom - window.innerHeight * 0.55;
            const exitEnd = exitStart + ROBOT_MOVE_SCROLL_PX;
            if (scrollY <= enterStart) {
                gsap.set(robotEl, { x: exitX, opacity: 0 });
                return;
            }
            if (scrollY < enterEnd) {
                const u = gsap.utils.clamp(0, 1, (scrollY - enterStart) / ROBOT_MOVE_SCROLL_PX);
                const eased = easeMove(u);
                gsap.set(robotEl, {
                    x: gsap.utils.interpolate(exitX, 0, eased),
                    opacity: eased,
                });
                return;
            }
            if (scrollY < exitStart) {
                gsap.set(robotEl, { x: 0, opacity: 1 });
                return;
            }
            if (scrollY < exitEnd) {
                const u = gsap.utils.clamp(0, 1, (scrollY - exitStart) / ROBOT_MOVE_SCROLL_PX);
                const eased = easeMove(u);
                gsap.set(robotEl, {
                    x: gsap.utils.interpolate(0, exitX, eased),
                    opacity: 1 - eased,
                });
                return;
            }
            gsap.set(robotEl, { x: exitX, opacity: 0 });
        };
        const smoothScroll = createSmoothScroll(applyLocalProgress);
        gsap.set(robotEl, { x: exitX, opacity: 0 });
        const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: () => smoothScroll.setTarget(window.scrollY || window.pageYOffset || 0),
            onRefresh: () => smoothScroll.jumpTo(window.scrollY || window.pageYOffset || 0),
        });
        smoothScroll.jumpTo(window.scrollY || window.pageYOffset || 0);
        return () => {
            trigger.kill();
            smoothScroll.destroy();
        };
    }, [isDesktop, mode]);
    if (mode === "local") {
        return (
          <div ref={localRef} className={className}>
            <Robot className="h-full w-full" />
          </div>
        );
    }
    if (!isDesktop) {
        return <Robot className={className} />;
    }
    return <div ref={markerRef} className={`invisible ${className}`} aria-hidden="true" />;
}
