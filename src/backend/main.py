from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import pandas as pd

from pydantic import BaseModel


from db import db, fundsdb


class PredictionFeatures(BaseModel):
    location: str
    vertical: str
    subvertical: str
    investment_type: str


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/getfeatures")
def get_features():
    df = pd.read_csv("../datasets/dataset_final.csv")

    locations = df.location.unique()
    vertical = df.vertical.unique()
    sub_vertical = df.subvertical.unique()
    invest_type = df.investment_type.unique()
    data = dict({"locations": list(locations), "vertical": list(
        vertical), "subvertical": list(sub_vertical), "investment_type": list(invest_type)})
    # print(sub_vertical)
    return data


@app.post("/predict")
async def predict(features: PredictionFeatures):

    print(features)
    features = jsonable_encoder(features)
    models = await db["stp_model_final"].find(features).to_list(10)
    print(models)

    # return models
    return models[0]


@app.post("/query")
async def query():
    return {"query": "query"}