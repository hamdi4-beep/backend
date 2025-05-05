import requests, time

def log_time(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)

        print(f'{func.__name__} took {time.perf_counter() - start} seconds')

        return result

    return wrapper

@log_time
def fetch_site(url):
    try:
        with requests.get(url) as response:
            if not response.ok:
                response.raise_for_status()
            return f'Read {len(response.content)} bytes from {url}'
    except requests.exceptions.RequestException as e:
        print(f'Failed to fetch {url}: {e}')

ret = fetch_site('http://python.org')
print(ret)