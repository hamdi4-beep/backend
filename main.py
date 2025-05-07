import concurrent.futures, requests

def handle_request(url):
    with requests.get(url) as response:
        if response.ok:
            return f'Read {len(response.content)} bytes from {url}'
        return f'Error status: {response.status_code} from {url}'

def main():
    urls = [
        'https://www.google.com',
        'https://www.yahoo.com',
        'https://www.bing.com',
        'https://github.com'
    ]

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(handle_request, url) for url in urls]

        for future in concurrent.futures.as_completed(futures):
            try:
                response = future.result()
                print(response)
            except requests.exceptions.RequestException as e:
                print(e)

if __name__ == '__main__':
    main()