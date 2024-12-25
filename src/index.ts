const createTaskQueue = (concurrency = 2) => new class {
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

    next(callback: Function) {
        let currentTask

        if (!this.queue.length) {
            console.log('Done:', this.running)
            return
        }

        if (this.running < this.concurrency && (currentTask = this.queue.shift())) {
            this.running++

            currentTask(() => {
                callback()
                this.running--
                this.next(callback)
            })
        }

        return this
    }
}

const taskQueue = createTaskQueue(2)

taskQueue
    .addTask(delay(1000))
    .addTask(delay(2000))
    .addTask(delay(3000))
    .addTask(delay(4000))
    .addTask(delay(5000))

taskQueue
    .next(() => console.log('Currently running:', taskQueue.running))

function delay(ms: number) {
    return (callback: Function) =>
        setTimeout(callback, ms)
}