import { useEffect } from "react";
import { useState } from "react";
import ComboBox from "./ComboBox";

const Prediction = () => {


  const [loading, setLoading] = useState(false)
  const [featuresFromDB, setFeaturesFromDB] = useState(null)
  const [predictionResults, setPredictionResults] = useState(null)
  const [features, setFeatures] = useState({
    funding_round_type: "series a",
    category_code: "web",
    region: "SF Bay"
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

        <ComboBox label="Funding Round" name="funding_round_type" list={featuresFromDB.funding_round_type} setFeature={setFeatures} />
        <ComboBox label="Category" name="category_code" list={featuresFromDB.category_code} setFeature={setFeatures} />
        <ComboBox label="Region" name="region" list={featuresFromDB.region} setFeature={setFeatures} />

        <div className="mt-4 ml-auto mr-4 w-fit">
          <button className="bg-primary" onClick={handleSubmit}>Predict</button>
        </div>
      </div>
      <div className="w-full p-4">
        {!loading && predictionResults && (
          <div className="mt-4 h-[100px]">
            <h3 className="font-bold text-lg">Results</h3>
            <p>
              Predicted Value: $ {parseFloat(predictionResults.result).toFixed(2)}
            </p>
            <p>
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