function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function toRange(value: number, min: number, max: number): number {
    return min + (max - min) * value;
}

export { clamp, toRange };
