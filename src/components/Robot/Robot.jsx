"use client";

import { useEffect, useState } from "react";
import robotNeutralBody from "../../assets/robot/robot-neutral-body.svg";
import robotNeutralArmLeft from "../../assets/robot/robot-neutral-arm-left.svg";
import robotNeutralArmRight from "../../assets/robot/robot-neutral-arm-right.svg";
import robotNeutralEarLeft from "../../assets/robot/robot-neutral-ear-left.svg";
import robotNeutralEarRight from "../../assets/robot/robot-neutral-ear-right.svg";
import { getAssetSrc } from "../../lib/asset-src";

const CANVAS_WIDTH = 244;
const CANVAS_HEIGHT = 268;
const ROBOT_LABEL = "Робот-талисман IT NOKADY";
const BLINK_MIN_DELAY_MS = 2200;
const BLINK_MAX_DELAY_MS = 5600;
const BLINK_CLOSE_MS = 120;
const BLINK_GAP_MS = 100;
const DOUBLE_BLINK_CHANCE = 0.28;
const ROBOT_PARTS = [
  {
    id: "ear-left",
    src: robotNeutralEarLeft,
    x: 5.861,
    y: 0.001,
    width: 24.049,
    height: 47.117,
    className: "robot-ear-left",
  },
  {
    id: "ear-right",
    src: robotNeutralEarRight,
    x: 208.542,
    y: 0.171,
    width: 23.876,
    height: 47.029,
    className: "robot-ear-right",
  },
  {
    id: "body",
    src: robotNeutralBody,
    x: 0,
    y: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  {
    id: "arm-left",
    src: robotNeutralArmLeft,
    x: -2.235,
    y: 149.517,
    width: 51.845,
    height: 95.972,
    className: "robot-arm-left",
  },
  {
    id: "arm-right",
    src: robotNeutralArmRight,
    x: 189.823,
    y: 148.546,
    width: 51.845,
    height: 95.972,
    className: "robot-arm-right",
  },
];
const ROBOT_EYELIDS = [
  {
    id: "eyelid-left",
    x: 78.2,
    y: 51.0,
    width: 34.2,
    height: 38.2,
  },
  {
    id: "eyelid-right",
    x: 127.9,
    y: 51.5,
    width: 34.6,
    height: 38.2,
  },
];

function toPercent(value, total) {
  return `${(value / total) * 100}%`;
}

function getBlinkDelay() {
  return BLINK_MIN_DELAY_MS + Math.random() * (BLINK_MAX_DELAY_MS - BLINK_MIN_DELAY_MS);
}

function useRobotBlink() {
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    let delayTimeoutId = 0;
    let closeTimeoutId = 0;
    let gapTimeoutId = 0;
    const clearTimers = () => {
      window.clearTimeout(delayTimeoutId);
      window.clearTimeout(closeTimeoutId);
      window.clearTimeout(gapTimeoutId);
    };
    const closeEyes = (onDone) => {
      setIsBlinking(true);
      closeTimeoutId = window.setTimeout(() => {
        setIsBlinking(false);
        onDone();
      }, BLINK_CLOSE_MS);
    };
    const scheduleBlink = () => {
      delayTimeoutId = window.setTimeout(() => {
        closeEyes(() => {
          if (Math.random() >= DOUBLE_BLINK_CHANCE) {
            scheduleBlink();
            return;
          }
          gapTimeoutId = window.setTimeout(() => {
            closeEyes(scheduleBlink);
          }, BLINK_GAP_MS);
        });
      }, getBlinkDelay());
    };
    scheduleBlink();
    return clearTimers;
  }, []);
  return isBlinking;
}

export default function Robot({ className = "" }) {
  const isBlinking = useRobotBlink();
  return (
    <div
      role="img"
      aria-label={ROBOT_LABEL}
      className={`relative ${className}`}
    >
      <div className="robot-figure">
        {ROBOT_PARTS.map((part) => (
          <img
            key={part.id}
            src={getAssetSrc(part.src)}
            alt=""
            className={`absolute max-w-none ${part.className ?? ""}`}
            style={{
              left: toPercent(part.x, CANVAS_WIDTH),
              top: toPercent(part.y, CANVAS_HEIGHT),
              width: toPercent(part.width, CANVAS_WIDTH),
              height: toPercent(part.height, CANVAS_HEIGHT),
            }}
          />
        ))}
        {ROBOT_EYELIDS.map((eyelid) => (
          <span
            key={eyelid.id}
            aria-hidden="true"
            className={`robot-eyelid${isBlinking ? " is-closed" : ""}`}
            style={{
              left: toPercent(eyelid.x, CANVAS_WIDTH),
              top: toPercent(eyelid.y, CANVAS_HEIGHT),
              width: toPercent(eyelid.width, CANVAS_WIDTH),
              height: toPercent(eyelid.height, CANVAS_HEIGHT),
            }}
          />
        ))}
      </div>
    </div>
  );
}
