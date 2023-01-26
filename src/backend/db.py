from pymongo import MongoClient
import motor.motor_asyncio
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')
print(MONGO_URI)
# client = MongoClient(MONGO_URI)
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)

db = client.mindsdb
fundsdb = client["stp_fund_final"]
