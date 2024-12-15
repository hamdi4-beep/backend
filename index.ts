import { createServer } from 'http'

const server = createServer((req, res) => {
    if (req.method !== 'GET') {
        res
            .writeHead(405, {
                'Content-Type': 'text/plain'
            })
            .end('Only GET requests are allowed')
    }

    switch (req.url) {
        case '/':
            res
                .writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                .end('The server sent a response')

            break

        default:
            res
                .writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                .end('404 Not Found')
    }
})

server.listen(3000, () => console.log('The server is listening on port', 3000))