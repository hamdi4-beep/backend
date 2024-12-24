"use strict";
const creatTaskQueue = (concurrency) => new class {
    constructor() {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    addTask(task) {
        this.queue.push(task);
        return this;
    }
    runTask(value, callback) {
        let task;
        if (this.running < this.concurrency && (task = this.queue.shift())) {
            this.running++;
            task(() => {
                callback(value);
                this.running--;
            });
        }
        return this;
    }
};
const taskQueue = creatTaskQueue(2);
taskQueue
    .addTask(delay(3000))
    .addTask(delay(6000))
    .addTask(delay(9000));
taskQueue
    .runTask('Task 1', console.log)
    .runTask('Task 2', console.log)
    .runTask('Task 3', console.log);
function delay(ms) {
    return (callback) => setTimeout(callback, ms);
}
