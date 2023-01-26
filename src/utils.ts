/**
 * Given a value, clamp it within a provided range.
 */
function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Given a decimal between 0 and 1, find its value within a provided range.
 */
function toRange(value: number, min: number, max: number): number {
    return min + (max - min) * value;
}

export { clamp, toRange };
