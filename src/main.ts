import { clamp, toRange } from './utils';

interface Options {
    from: number;
    to: number;
    callback: (value: number) => void;
    duration?: number;
    delay?: number;
    timing?: (value: number) => number;
}

/**
 * Tween between two values.
 */
function tween(options: Options): Promise<void> {
    return new Promise((resolve) => {
        let start: number;

        const { to, from, callback, duration, delay, timing } = {
            duration: 1000,
            timing: (value: number) => value,
            ...options,
        };

        const animate = (time: DOMHighResTimeStamp) => {
            // Set the start time on the first iteration.
            start ??= time;

            const elapsed = time - start;
            const value = timing(clamp(elapsed, 0, duration) / duration);

            callback(toRange(value, from, to));

            if (elapsed < duration) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        };

        // If a delay has been defined then set a timer,
        // otherwise begin the tween immediately.
        ((start) => (delay ? globalThis.setTimeout(start, delay) : start()))(
            () => requestAnimationFrame(animate)
        );
    });
}

export { tween };
