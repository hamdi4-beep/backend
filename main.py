import requests

def handle_request(url):
    with requests.get(url) as response:
        if response.ok:
            return f'Read {len(response.content)} bytes from {url}'

def main():
    try:
        result = handle_request("htp://python.org")
        print(result)
    except Exception as e:
        print(f'Something went wrong: {e}')

if __name__ == '__main__':
    main()