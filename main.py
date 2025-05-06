from concurrent.futures import ThreadPoolExecutor
import requests, time

MAX_WORKERS = 10

def measure_time(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)

        print(f'{func.__name__} with the url {args} took {time.perf_counter() - start} seconds')

        return result

    return wrapper

@measure_time
def fetch_site(url):
    try:
        with requests.get(url) as response:
            if response.raise_for_status():
                print('Something went wrong')
            return f'Read {len(response.content)} bytes from {url}'
    except requests.exceptions.RequestException as e:
        print(f'Failed to fetch {url}: {e}')

def fetch_all(urls):
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        return executor.map(fetch_site, urls)

def main():
    urls = [
        'https://python.org',
        'https://realpython.com/python-sockets/',
        'https://realpython.com/python-concurrency/'
    ]

    for ret in fetch_all(urls):
        print(ret)

if __name__ == '__main__':
    main()