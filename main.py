from concurrent.futures import ThreadPoolExecutor
import requests, time
import random

MAX_WORKERS = 10

def fetch_site(url):
    start_time = time.perf_counter()

    try:
        with requests.get(url) as response:
            if not response.ok:
                raise requests.exceptions.RequestException

            time.sleep(random.random() * 10)

            return f'Read {len(response.content)} bytes from {url} in {round(time.perf_counter() - start_time, 2)} seconds\n'
    except requests.exceptions.RequestException as e:
        print(f'Failed to fetch {url}: {e}')

def fetch_all(urls: list):
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        return executor.map(fetch_site, urls)

def save_to_file(content):
    try:
        with open('log.text', 'a+') as f:
            f.write(content)
    except Exception as e:
        print(f'Something went wrong: {e}')

def main():
    for result in fetch_all([
        'https://docs.python.org/3/tutorial/inputoutput.html#fancier-output-formatting',
        'https://docs.python.org/3/tutorial/errors.html'
    ]):
        save_to_file(result)

    print('All done!')

if __name__ == '__main__':
    main()