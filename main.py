from concurrent.futures import ThreadPoolExecutor
import requests, time, threading

MAX_WORKERS = 10
local_thread = threading.local()

def fetch_site(url):
    try:
        with requests.get(url) as response:
            print(f'Read {len(response.content)} bytes from {url}')
    except requests.exceptions.RequestException as e:
        print(f'Fetching {url} failed: {e}')

def fetch_all(sites):
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        executor.map(fetch_site, sites)

def main():
    start_time = time.perf_counter()

    fetch_all([
        'https://python.org',
        'https://github.com',
        'https://realpython.com/python-concurrency/',
        'https://realpython.com/python-gil/'
    ])

    print(f'Fetched in {time.perf_counter() - start_time} seconds')

if __name__ == '__main__':
    main()