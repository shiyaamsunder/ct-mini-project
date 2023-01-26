import { useEffect } from "react";
import { useState } from "react";
import ComboBox from "./ComboBox";

const Prediction = () => {


  const [loading, setLoading] = useState(false)
  const [featuresFromDB, setFeaturesFromDB] = useState(null)
  const [predictionResults, setPredictionResults] = useState(null)
  const [features, setFeatures] = useState({
    location: "Bangalore",
    vertical: "E-Commerce",
    subvertical: "Online-Shopping",
    investment_type: "Series A"
  })

  useEffect(() => {
    fetch("http://localhost:8000/getfeatures").then(res => res.json()).then(data => setFeaturesFromDB(data))
  }, [])


  const handleSubmit = async () => {
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: JSON.stringify(features),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()
      console.log(data)
      setPredictionResults(data)
      setLoading(false)
    }

    catch (err) {
      setLoading(false)
      console.log("Error Occured")
    }
  }


  return featuresFromDB ? (
    <div className="flex flex-col p-4">

      <div>

        <ComboBox label="Location" name="location" list={featuresFromDB.locations} setFeature={setFeatures} />
        <ComboBox label="Vertical" name="vertical" list={featuresFromDB.vertical} setFeature={setFeatures} />
        <ComboBox label="Sub Vertical" name="sub_vertical" list={featuresFromDB.subvertical} setFeature={setFeatures} />
        <ComboBox label="Investment Type" name="invest_type" list={featuresFromDB.investment_type} setFeature={setFeatures} />

        <div className="mt-4 ml-auto mr-4 w-fit">
          <button className="bg-primary" onClick={handleSubmit}>Predict</button>
        </div>
      </div>
      <div className="w-full p-4">
        {!loading && predictionResults && (
          <div className="mt-4 h-[100px]">
            <h3 className="font-bold text-lg">Results</h3>
            <p>
              Predicted Value: $ {parseFloat(predictionResults.amount_in_usd).toFixed(2)}
            </p>
            <p>
            Confidence: {JSON.parse(predictionResults.amount_in_usd_explain).confidence}
            </p>
          </div>
        )
        }
        {loading && (
          <div>Predicting...</div>
        )
        }
      </div>
    </div>
  ) : <h3 className="mt-4">Loading...</h3>
}

export default Prediction;