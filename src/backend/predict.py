import pickle
import numpy as np
import pandas as pd
from pydantic import BaseModel
loaded_model = pickle.load(open("./models/trained_model.sav", 'rb'))


class PredictionFeatures(BaseModel):
    funding_round_type: str
    category_code: str
    region: str

class CompanyInput(PredictionFeatures):
    page: int

class Query(BaseModel):
    amount: str


class Startup(BaseModel):
    id: int
    funding_total_usd: int
    name: str
    description: str
    region: str
    hompage_url: str
    funding_round_type: str
    funded_at: str
    status: str
    city: str
    category_code: str


def helper(startup: Startup) -> dict:
    return {
        "id": str(startup["_id"]),
        "funding_total_usd": startup["funding_total_usd"],
        "name": startup["name"],
        "description": startup["description"],
        "funded_at": startup["funded_at"],
        "status": startup["status"],
        "city": startup["city"],
        "homepage_url": startup["homepage_url"],
        "category": startup["category_code"]

    }


def predict(features: PredictionFeatures):
    input = pd.DataFrame([features])
    print(input)
    prediction = loaded_model.predict(input)[0]
    return prediction
