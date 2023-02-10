from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
import pandas as pd
import pprint


from db import db
from predict import predict, PredictionFeatures, Query, CompanyInput, Startup, helper

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
    print(features)
    req = features.copy()
    req["page"] = 1
    companies = await get_companies(req)
    return {"result": results, "companies": companies["data"], "total_count": companies["count"]}


# @app.post("/query")
# async def getnames_based_on_amount(queries: Query):
#     amount = queries.amount
#     one_mil = 1000000
#     one_bil = 1000000000
#     amount_query = [0, 0]
#     if (amount == "more1b"):
#         amount_query[0] = 0
#         amount_query[1] = 1000000000
#     elif (amount == "under10m"):
#         amount_query[0] = 10000000
#         amount_query[1] = 0
#     else:
#         amount = amount.split("_")
#         for i, x in enumerate(amount):
#             prefix = x[-1]
#             a = int(x[:-1])
#             a = a * one_bil if prefix == "b" else a * one_mil
#             amount_query[i] = a

#     database = db.merged
#     cursor =  database.find({"funding_total_usd":  {"$lt": amount_query[0], "$gt": amount_query[1]} })
#     data = []
#     for document in await cursor.to_list(length=100):
#         data.append(helper(document))

#     # data = await database.find_one({"id": 1})

#     # data = []
#     # async for d in database.find({"funding_total_usd":  {"$lt": amount_query[0], "$gt": amount_query[1]} }).to_list(100):
#     #     data.append(helper(d))
#     # print(data)
#     return data

#     # return JSONResponse(status_code=200, content=data)

@app.post("/page")
async def fetch_next_page(req: CompanyInput):
    data = await get_companies(jsonable_encoder(req))
    return {"companies": data["data"], "total_count": data["count"]}

async def get_companies(req: CompanyInput):
    database = db.merged
    cursor = database.find({"funding_round_type": req["funding_round_type"],
                           "category_code": req["category_code"], "region": req["region"]})

    count = await database.count_documents({"funding_round_type": req["funding_round_type"],
                                            "category_code": req["category_code"], "region": req["region"]})
    cursor.skip(req["page"]-1).limit(10)

    data = []
    async for document in cursor:
        data.append(helper(document))

    companies = {
        "data": data,
        "count": count
    }
    return companies
