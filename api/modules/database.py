from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import request
from datetime import datetime

uri = "mongodb+srv://atharvadeore:J5oWnr7JXaswM5zq@atharport.jz5ez.mongodb.net/?retryWrites=true&w=majority&appName=atharport"
client = MongoClient(uri, server_api=ServerApi('1'))

def get_database():
    return client['session_data']

dbname = get_database()
collection = dbname["session_id"]

db_name = 'session_data'
def check_and_create():
    db_list = client.list_database_names()

    if db_name in db_list:
        print(f"Database '{db_name}' already exists.")
        return client[db_name] 
    else:
        print(f"Database '{db_name}' does not exist. Creating new one.")
        db = client[db_name]
        db.create_collection("session_id")
        return db

def get_ip():
    if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
        adr = request.environ['REMOTE_ADDR']
        return str(adr)
    else:
        adr = request.environ['HTTP_X_FORWARDED_FOR']
        return str(adr)

def get_time_now():
    now = datetime.now()
    date_time = now.strftime("%d/%m/%Y %H:%M:%S")
    return date_time

def get_time(find_d):
    criteria = {"ip_adr": f"{find_d}"}

    documents = collection.find(criteria)

    for document in documents:
        value = document["time"]
        return value

def fetch_id(find_d):
    criteria = {"ip_adr": f"{find_d}"}

    documents = collection.find(criteria)

    for document in documents:
        value = document["session_id"]
        return value
    
def create_record(dat):
    now = datetime.now()
    date_time = now.strftime("%d/%m/%Y %H:%M:%S")
    temp_dict = {'session_id':f'{dat}', 'time':f'{date_time}', 'ip_adr':f'{get_ip()}'}
    collection.insert_one(temp_dict)
