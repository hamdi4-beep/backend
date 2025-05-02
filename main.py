from concurrent.futures import ThreadPoolExecutor
import requests, threading, time

# creates a thread object through which we can track concurrent tasks
local_thread = threading.local()

def get_session_for_thread():
    # returns the respective session object for each existing thread
    if not hasattr(local_thread, 'session'):
        # creates a session object that keeps track of relevant parameters per session.
        local_thread.session = requests.Session()
    return local_thread.session

def fetch_site(url):
    session = get_session_for_thread()

    try:
        with session.get(url) as response:
            print(f'Fetched the following data: \n{response.text}')
    except Exception as e:
        print(f'Failed to fetch site: {e}')

def main():
    with ThreadPoolExecutor(max_workers=10) as executor:
        executor.map(fetch_site, [
            'https://realpython.com/python-concurrency/',
            'https://realpython.com/python-gil/',
            'https://requests.readthedocs.io/en/latest/user/advanced/',
        ])

if __name__ == '__main__':
    main()