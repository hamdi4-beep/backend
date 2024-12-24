const createTaskQueue = (concurrency: number) => new class {
    concurrency: number
    running: number
    queue: Function[]

    constructor() {
        this.concurrency = concurrency
        this.running = 0
        this.queue = []
    }

    addTask(task: Function) {
        this.queue.push(task)
        return this
    }

    runTask(value: string, callback: Function) {
        let task

        if (this.running < this.concurrency && (task = this.queue.shift())) {
            this.running++

            task(() => {
                callback(value)
                this.running--
            })
        }

        return this
    }
}

const taskQueue = createTaskQueue(2)

taskQueue
    .addTask(delay(3000))
    .addTask(delay(6000))
    .addTask(delay(9000))

taskQueue
    .runTask('Task 1', console.log)
    .runTask('Task 2', console.log)
    .runTask('Task 3', console.log)

function delay(ms: number) {
    return (callback: Function) =>
        setTimeout(callback, ms)
}