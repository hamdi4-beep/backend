import concurrent.futures

import requests

def fetch_url(url: str):
    with requests.get(url) as response:
        if response.ok:
            return response.content

def threaded_fetch(url: str):
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future = executor.submit(fetch_url, url)

        if concurrent.futures.as_completed(future):
            return future.result()

def main():
    try:
        result = threaded_fetch("https://api.github.com/users/hamdi4-beep")
        print(result)
    except Exception as e:
        print(f'Something went wrong: {e}')

if __name__ == '__main__':
    main()