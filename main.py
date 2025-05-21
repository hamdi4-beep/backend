import concurrent.futures, requests, time

def measure_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)

        print(f'{func.__name__} took {time.perf_counter() - start_time} seconds')

        return result

    return wrapper

def fetch_url(url):
    with requests.get(url) as response:
        if not response.ok:
            return response.status_code
        return f'Read {len(response.content)} bytes from {url}'

@measure_time
def fetch_all(urls):
    results = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        for future in concurrent.futures.as_completed([executor.submit(fetch_url, url) for url in urls]):
            results.append(future.result())

    return results

def main():
    try:
        response = fetch_all(['https://python.org', 'https://github.com'])
        print(response)
    except Exception as e:
        print(f'Something went wrong: {e}')

if __name__ == '__main__':
    main()