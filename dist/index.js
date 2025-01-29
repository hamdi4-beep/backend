"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createList = (iteration) => iteration > 0 ? [...createList(iteration - 1), iteration] : [];
console.log(createList(4));
