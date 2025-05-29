import concurrent.futures, requests, time

def measure_time(func):
    """A decorator that measures the execution time of a function."""
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)

        print(f'{func.__name__} took {time.perf_counter() - start_time} seconds')

        return result

    return wrapper

def fetch_url(url):
    """A function that makes a network request."""
    with requests.get(url) as response:
        if not response.ok:
            return response.status_code

        return f'Read {len(response.content)} bytes from {url}'

@measure_time
def fetch_all(urls):
    """A function that fetches a list of urls concurrently."""
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        for future in concurrent.futures.as_completed([executor.submit(fetch_url, url) for url in urls]):
            response = future.result()
            print(response)

def main():
    try:
        fetch_all(['https://python.org', 'https://github.com'])
    except Exception as e:
        print(f'Something went wrong: {e}')

if __name__ == '__main__':
    main()