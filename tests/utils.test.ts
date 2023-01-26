import { clamp, toRange } from '../src/utils';

test('Clamp successfully keeps values within bounds', () => {
    expect(clamp(0, 10, 20)).toBe(10);
    expect(clamp(1000, 10, 20)).toBe(20);
    expect(clamp(15, 10, 20)).toBe(15);
});

test('Decimal successfully converted to range', () => {
    expect(toRange(0, 10, 20)).toBe(10);
    expect(toRange(1, 10, 20)).toBe(20);
    expect(toRange(0.5, 10, 20)).toBe(15);
});
