import requests

def get_url(url, session):
    try:
        with session.get(url) as response:
            print(response.content)
    except Exception as e:
        print(e)


def main():
    with requests.Session() as s:
        get_url("https://www.python.org/", s)

if __name__ == '__main__':
    main()