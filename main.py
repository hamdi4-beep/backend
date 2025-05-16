import socket

BINDING_PORT = 8000

def handle_client(client_socket):
    received_data = ''

    while True:
        data = client_socket.recv(1024).decode()
        if not data: break
        received_data += data

    print(f'Received: {received_data}')

def main():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('localhost', BINDING_PORT))

        s.listen()
        print("Waiting for connection...")

        conn, addr = s.accept()
        print("Connected by", addr)

        try:
            handle_client(conn)
        except Exception as e:
            print(f'Something went wrong: {e}')

if __name__ == '__main__':
    main()