/**
 * @jest-environment jsdom
 */

import { tween } from '../src/main';

class Timer {
    private readonly start = performance.now();

    public isBetween(min: number, max: number): boolean {
        const elapsed = performance.now() - this.start;

        return elapsed >= min && elapsed <= max;
    }
}

test('Tween runs successfully with minimum arguments', async () => {
    const from = 0;
    const to = 100;
    const callback = jest.fn((x) => x);
    const timer = new Timer();

    await expect(
        tween({
            from,
            to,
            callback,
        })
    ).resolves.toBeUndefined();

    const {
        mock: { results },
    } = callback;

    expect(timer.isBetween(1000, 1100)).toBe(true);
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results.at(0)?.value).toBe(from);
    expect(results.at(-1)?.value).toBe(to);
});

test('Tween runs successfully with optional arguments', async () => {
    const callback = jest.fn();
    const timer = new Timer();

    await expect(
        tween({
            from: 0,
            to: 100,
            delay: 100,
            duration: 400,
            callback,
        })
    ).resolves.toBeUndefined();

    expect(timer.isBetween(500, 600)).toBe(true);
    expect(callback).toHaveBeenCalled();
});
