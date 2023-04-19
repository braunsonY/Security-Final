from flask import Flask, request
import hashlib
import pymongo
from pymongo import MongoClient
import uuid
import ssl

app = Flask(__name__)

mongo_client = MongoClient("mongodb+srv://cit270:password123@db.sbotv.mongodb.net/db?retryWrites=true&w=majority")
db = mongo_client.accounts
users = db.users

@app.route('/', methods=['GET'])
def index():
    return "Hello!\n"

@app.route('/login', methods=['POST'])
def login():
    username = request.json['userName']
    password = hashlib.sha256(request.json['password'].encode('utf-8')).hexdigest()

    user = users.find_one({'name': username})

    if user and user['password'] == password:
        return str(uuid.uuid4()), 200
    else:
        return 'Who are you? ' + password, 400

@app.route('/register', methods=['POST'])
def register():
    password = request.json['password']
    vpassword = request.json['verifyPassword']

    # Compare the password with the verify password to determine whether to make the connection
    if password == vpassword:
        password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        user = {
            'name': request.json['userName'],
            'email': request.json['email'],
            'password': password,
            'accountType': request.json['accountType'],
        }

        try:
            users.insert_one(user)
            print(request.json['userName'] + " made an account.")
            return 'Account created, please log in.', 200
        except pymongo.errors.PyMongoError as e:
            return str(e), 400

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
ssl_context.load_cert_chain('server.cert', 'server.key', password='P@ssw0rd')

if __name__ == '__main__':
    app.run(host='localhost', port=4443, ssl_context=ssl_context, debug=True)