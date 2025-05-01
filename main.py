import socket

BINDING_PORT = 8000

def handle_client(client_socket):
    while True:
        # The recv method accepts a chunk of 1024 bytes.
        data = client_socket.recv(1024)
        if not data: break
        print(data.decode())
        print('End of iteration')

    # Blocks until all data is sent.
    client_socket.sendall(b'The request was processed successfully.')

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind(('127.0.0.1', BINDING_PORT))

    print(f'Listening for connections on port {BINDING_PORT}')
    s.listen()

    while True:
        conn, addr = s.accept()
        print(f'Connected to {addr[0]}:{addr[1]}')

        try:
            with conn as c:
                handle_client(c)
        except KeyboardInterrupt:
            print(f'Connection interrupted by user')
        except ConnectionResetError:
            print(f'Connection reset by peer')
        except Exception as e:
            print(f'Unexpected error: {e}')