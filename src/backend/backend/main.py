from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import pandas as pd
import pprint



from db import db, fundsdb
from predict import predict, PredictionFeatures

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/getfeatures")
def get_features():
    df = pd.read_csv("../datasets/startup_investments.csv")
    features = ["funding_round_type", "category_code", "region"]
    df = df.fillna('')
    df = df[features]
    data = {}
    for feature in features:
        data[feature] = list(df[feature].unique())
    # print(data)
    return data


@app.post("/predict")
async def predict_values(features: PredictionFeatures):
    features = jsonable_encoder(features)
    results = predict(features)
    return {"result": results}
