import socket

BINDING_PORT = 8000

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind(('localhost', BINDING_PORT))

    print('Listening in for connections')
    s.listen()

    conn, addr = s.accept()
    print(f'Connected to {addr}')

    with conn as client:
        data = client.recv(1024)
        if data: print(f'Received {data}')