import requests, concurrent.futures, time

def measure_time(func):
    """A decorator that measures the execution time of a function"""
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)

        print(f'{func.__name__} took {time.perf_counter() - start} seconds')

        return result

    return wrapper

def fetch_url(url):
    with requests.get(url) as response:
        if response.ok:
            return f'Read {len(response.content)} bytes from {url}'

@measure_time
def fetch_all(urls: list):
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        for future in [executor.submit(fetch_url, url) for url in urls]:
            result = future.result()
            print(result)

def main():
    try:
        fetch_all(['https://www.python.org', 'https://www.github.com'])
    except Exception as e:
        print(f'Something went wrong: {e}')

if __name__ == '__main__':
    main()