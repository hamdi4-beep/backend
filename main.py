import requests, concurrent.futures

def fetch_url(url):
    with requests.get(url) as response:
        if response.ok:
            return f'Read {len(response.content)} bytes from {url}'

def fetch_all(urls: list):
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        for future in [executor.submit(fetch_url, url) for url in urls]:
            result = future.result()
            print(result)

def main():
    try:
        fetch_all(['https://python.org', 'https://github.com'])
    except Exception as e:
        print(f'Something went wrong: {e}')

if __name__ == '__main__':
    main()