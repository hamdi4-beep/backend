import requests, time

def measure_time(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)

        print(f'{func.__name__} took {time.perf_counter() - start} seconds')

        return result

    return wrapper

@measure_time
def fetch_site(url):
    with requests.get(url) as response:
        if response.raise_for_status():
            return response.raise_for_status()
        print(f'Read {len(response.content)} bytes from {url}')

try:
    fetch_site('http://google.con')
except requests.exceptions.RequestException as e:
    print(e)