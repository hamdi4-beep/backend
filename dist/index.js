"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createList = (n, i = 1, num = '') => i <= n ? createList(n, i + 1, num += i !== 1 ? `.${i}` : i) : num.split('.');
const results = [];
const divideBy = 4;
for (let i = 1, prev; i <= divideBy; i++) {
    const chunks = [];
    for (let j = prev !== null && prev !== void 0 ? prev : 0; j < (prev = Math.round(createList(20).length / divideBy) * i); j++)
        chunks.push(j + 1);
    results.push(chunks);
}
console.log(results);
