import sqlite3

# creates a database connection
conn = sqlite3.connect('db/chinook.db')
res = conn.execute('SELECT name, composer FROM tracks')

print(res.fetchone())

conn.close()