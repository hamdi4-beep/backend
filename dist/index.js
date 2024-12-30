"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gen = generateSequence(Array.from({ length: 8 }, (_, i) => i + 1));
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
function* generateSequence(arr) {
    let i = 0;
    while (i < 3) {
        const items = createPartition(arr, 3);
        yield items[i++];
    }
}
function createPartition(items, divideBy) {
    const results = [];
    let prev;
    for (let i = 1; i <= divideBy; i++) {
        const chunks = [];
        for (let j = prev !== null && prev !== void 0 ? prev : 0; j < (prev = Math.round(items.length / divideBy) * i); j++)
            chunks.push(items[j]);
        results.push(chunks.filter(Boolean));
    }
    return results;
}
