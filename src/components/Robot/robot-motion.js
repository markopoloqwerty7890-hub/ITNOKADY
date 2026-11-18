export const ROBOT_MOVE_SCROLL_PX = 720;
export const ROBOT_EXIT_SHIFT_PX = 100;
export const ROBOT_SMOOTH = 0.08;
export const ROBOT_WALK_CYCLE_DISTANCE = 1100;
export const ROBOT_WALK_MOVE_THRESHOLD = 0.8;
export const ROBOT_WALK_SWING_SMOOTH = 0.08;
export const ROBOT_WALK_SETTLE_FACTOR = 0.94;

export function getLeftExitOffset() {
    return ROBOT_EXIT_SHIFT_PX;
}

export function createSmoothScroll(applyScroll) {
    let targetY = window.scrollY || 0;
    let currentY = targetY;
    let frameId = 0;
    let isRunning = false;
    const tick = () => {
        const delta = targetY - currentY;
        if (Math.abs(delta) < 0.15) {
            currentY = targetY;
            applyScroll(currentY);
            isRunning = false;
            frameId = 0;
            return;
        }
        currentY += delta * ROBOT_SMOOTH;
        applyScroll(currentY);
        frameId = requestAnimationFrame(tick);
    };
    const setTarget = (scrollY) => {
        targetY = scrollY;
        if (!isRunning) {
            isRunning = true;
            frameId = requestAnimationFrame(tick);
        }
    };
    const jumpTo = (scrollY) => {
        targetY = scrollY;
        currentY = scrollY;
        applyScroll(currentY);
    };
    const destroy = () => {
        if (frameId) {
            cancelAnimationFrame(frameId);
        }
        isRunning = false;
        frameId = 0;
    };
    return { setTarget, jumpTo, destroy };
}
