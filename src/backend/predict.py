import pickle
import numpy as np
import pandas as pd
from pydantic import BaseModel
loaded_model = pickle.load(open("./models/trained_model.sav", 'rb'))

class PredictionFeatures(BaseModel):
    funding_round_type: str
    category_code: str
    region :str


def predict(features: PredictionFeatures):
    input = pd.DataFrame([features])
    print(input)
    prediction = loaded_model.predict(input)[0]
    return prediction
