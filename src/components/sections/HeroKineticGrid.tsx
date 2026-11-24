import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

interface GridPoint {
    homeX: number;
    homeY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface TrailPoint {
    x: number;
    y: number;
    time: number;
}

export function HeroKineticGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reduced = !!useReducedMotion();
    const { dark } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        const rootStyle = getComputedStyle(document.documentElement);
        const lineColor = rootStyle.getPropertyValue("--accent").trim();
        const dotColor = rootStyle.getPropertyValue("--ink").trim();
        const pointer = { x: -1000, y: -1000, active: false };
        const trail: TrailPoint[] = [];
        let grid: GridPoint[][] = [];
        let width = 0;
        let height = 0;
        let spacing = 48;
        let frameId = 0;

        const draw = (animate: boolean) => {
            const now = performance.now();
            let moving = false;
            context.clearRect(0, 0, width, height);

            for (const column of grid) {
                for (const point of column) {
                    if (animate) {
                        let ax = (point.homeX - point.x) * 0.075;
                        let ay = (point.homeY - point.y) * 0.075;

                        if (pointer.active) {
                            const dx = pointer.x - point.x;
                            const dy = pointer.y - point.y;
                            const distance = Math.hypot(dx, dy);
                            const radius = 190;
                            if (distance < radius && distance > 0.001) {
                                const pull = (1 - distance / radius) * 2.4;
                                ax += (dx / distance) * pull;
                                ay += (dy / distance) * pull;
                            }
                        }

                        point.vx = (point.vx + ax) * 0.8;
                        point.vy = (point.vy + ay) * 0.8;
                        point.x += point.vx;
                        point.y += point.vy;

                        if (Math.abs(point.vx) + Math.abs(point.vy) > 0.025) {
                            moving = true;
                        } else {
                            point.vx = 0;
                            point.vy = 0;
                        }
                    }
                }
            }

            const radius = 190;
            for (let columnIndex = 0; columnIndex < grid.length; columnIndex++) {
                const column = grid[columnIndex];
                for (let rowIndex = 0; rowIndex < column.length; rowIndex++) {
                    const point = column[rowIndex];
                    const distance = pointer.active
                        ? Math.hypot(pointer.x - point.x, pointer.y - point.y)
                        : radius;
                    const proximity = Math.max(0, 1 - distance / radius);

                    context.strokeStyle = `rgb(${lineColor})`;
                    context.globalAlpha = 0.06 + proximity * 0.38;
                    context.lineWidth = 0.6 + proximity * 1.2;
                    const right = grid[columnIndex + 1]?.[rowIndex];
                    const below = column[rowIndex + 1];
                    if (right) {
                        context.beginPath();
                        context.moveTo(point.x, point.y);
                        context.lineTo(right.x, right.y);
                        context.stroke();
                    }
                    if (below) {
                        context.beginPath();
                        context.moveTo(point.x, point.y);
                        context.lineTo(below.x, below.y);
                        context.stroke();
                    }

                    context.fillStyle = `rgb(${dotColor})`;
                    context.globalAlpha = 0.28 + proximity * 0.62;
                    context.beginPath();
                    context.arc(point.x, point.y, 1.1 + proximity * 1.1, 0, Math.PI * 2);
                    context.fill();
                }
            }

            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = `rgb(${lineColor})`;
            for (let index = trail.length - 1; index >= 0; index--) {
                const point = trail[index];
                const age = now - point.time;
                if (age > 260) {
                    trail.splice(index, 1);
                    continue;
                }
                if (index === 0) continue;

                const previous = trail[index - 1];
                context.globalAlpha = (1 - age / 260) * 0.45;
                context.lineWidth = 1.5;
                context.beginPath();
                context.moveTo(previous.x, previous.y);
                context.lineTo(point.x, point.y);
                context.stroke();
            }

            context.globalAlpha = 1;
            return moving || trail.length > 0;
        };

        const animate = () => {
            frameId = 0;
            if (draw(true)) frameId = requestAnimationFrame(animate);
        };

        const scheduleFrame = () => {
            if (!frameId) frameId = requestAnimationFrame(animate);
        };

        const resize = () => {
            const bounds = canvas.getBoundingClientRect();
            width = Math.max(1, bounds.width);
            height = Math.max(1, bounds.height);
            spacing = width < 640 ? 36 : 48;
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            const columns = Math.ceil(width / spacing) + 1;
            const rows = Math.ceil(height / spacing) + 1;
            grid = Array.from({ length: columns }, (_, columnIndex) =>
                Array.from({ length: rows }, (_, rowIndex) => {
                    const x = columnIndex * spacing;
                    const y = rowIndex * spacing;
                    return { homeX: x, homeY: y, x, y, vx: 0, vy: 0 };
                }),
            );
            draw(false);
        };

        const onPointerMove = (event: PointerEvent) => {
            const bounds = canvas.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;
            const inside = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;

            pointer.active = inside;
            if (inside) {
                pointer.x = x;
                pointer.y = y;
                trail.push({ x, y, time: performance.now() });
                if (trail.length > 24) trail.shift();
            }
            scheduleFrame();
        };

        const onPointerEnd = (event: PointerEvent) => {
            if (event.pointerType === "touch") {
                pointer.active = false;
                scheduleFrame();
            }
        };

        const onScroll = () => {
            pointer.active = false;
            scheduleFrame();
        };

        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(canvas);

        if (!reduced) {
            window.addEventListener("pointermove", onPointerMove, { passive: true });
            window.addEventListener("pointerup", onPointerEnd, { passive: true });
            window.addEventListener("pointercancel", onPointerEnd, { passive: true });
            window.addEventListener("scroll", onScroll, { passive: true });
        }

        return () => {
            cancelAnimationFrame(frameId);
            observer.disconnect();
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerEnd);
            window.removeEventListener("pointercancel", onPointerEnd);
            window.removeEventListener("scroll", onScroll);
        };
    }, [dark, reduced]);

    return <canvas ref={canvasRef} className="hero-grid" aria-hidden="true" />;
}
