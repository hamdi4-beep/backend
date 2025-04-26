import socket

BINDING_PORT = 8000

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind(('127.0.0.1', BINDING_PORT))

    print(f'Listening for connections on port {BINDING_PORT}')
    s.listen()

    conn, addr = s.accept()
    print(f'Connected to {addr[0]}:{addr[1]}')

    try:
        with conn as c:
            while True:
                data = c.recv(1024).decode()
                if not data: break
                print(data)
    except KeyboardInterrupt:
        print(f'Connection interrupted by user')
    except ConnectionResetError:
        print(f'Connection reset by peer')