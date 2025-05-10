import concurrent.futures, requests
import time

def measure_time(func):
    """A decorator that wraps a function around the decorated function to encapsulate the behavior-specific properties."""
    def wrapper(*args, **kwargs):
        """A wrapper that measures the execution time of the function."""
        start_time = time.perf_counter()
        # Storing the return value of the decorated function means we also have access to the returned value.
        result = func(*args, **kwargs)

        print(f'{func.__name__} took {time.perf_counter() - start_time} seconds')

        return result

    return wrapper

def handle_request(url):
    """A function that takes a url and returns a response."""
    with requests.get(url) as response:
        if response.ok:
            return f'Read {len(response.content)} bytes from {url}'
        return f'Error status: {response.status_code} from {url}'

@measure_time
def fetch_all(urls):
    """A function that takes a list of urls and returns a list of responses."""
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        # Stores a list of "future objects" which represent the execution of the submitted function.
        futures = [executor.submit(handle_request, url) for url in urls]

        for future in concurrent.futures.as_completed(futures):
            ret = future.result()
            print(ret)

def main():
    fetch_all(['https://www.google.com', 'https://www.yahoo.com', 'https://www.bing.com', 'https://github.com'])

if __name__ == '__main__':
    main()