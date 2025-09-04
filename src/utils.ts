export const isObjectEmpty = (obj: Object) =>
    Object.keys(obj).length === 0

export const handleError = (message: string, statusCode: number) => {
    const error = new Error(message) as Error & { statusCode: number}
    error.statusCode = statusCode
    throw error
}