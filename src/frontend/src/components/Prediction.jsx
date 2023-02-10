import { useEffect } from "react";
import { useState } from "react";
import ComboBox from "./ComboBox";
import DataGrid from "./DataGrid";

const Prediction = () => {


  const [loading, setLoading] = useState(false)
  const [featuresFromDB, setFeaturesFromDB] = useState(null)
  const [predictionResults, setPredictionResults] = useState(null)
  const [page, setPage] = useState(1);
  const [features, setFeatures] = useState({
    funding_round_type: "series-a",
    category_code: "web",
    region: "London"
  })

  useEffect(() => {
    fetch("http://localhost:8000/getfeatures").then(res => res.json()).then(data => setFeaturesFromDB(data))
  }, [])


  const get_next_companies_page =async (page) => {
     
  }
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
      setPredictionResults(data)
      setLoading(false)
    }

    catch (err) {
      setLoading(false)
      console.log("Error Occured")
    }
  }


  const nextPage =  async()=> {
    if(page>predictionResults.total_count) return
    try {
      setLoading(true)
      const res = await fetch("http://localhost:8000/page", {
        body: JSON.stringify({...features, page: page+1}),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      setPage(prev=>prev+1)

      const data = await res.json()
      setPredictionResults(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  } 
  const prevPage = async ()=> {
    if(page<1) return
    try {
      setLoading(true)
      const res = await fetch("http://localhost:8000/page", {
        body: JSON.stringify({...features, page: page-1}),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      setPage(prev=>prev-1)
      const data = await res.json()
      setPredictionResults(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return featuresFromDB ? (
    <div className="flex flex-col items-start p-4">

      <div className="w-full">

        <ComboBox label="Funding Round" name="funding_round_type" list={featuresFromDB.funding_round_type} setFeature={setFeatures} selected="series-a" />
        <ComboBox label="Category" name="category_code" list={featuresFromDB.category_code} setFeature={setFeatures} selected="web" />
        <ComboBox label="Region" name="region" list={featuresFromDB.region} setFeature={setFeatures} selected="London" />

        <div className="mt-4 ml-auto mr-4 w-fit">
          <button className="bg-primary" onClick={handleSubmit}>Predict</button>
        </div>
      <div className="w- p-4">
        {!loading && predictionResults && (
          <div className="mt-4 h-[100px]">

            <div className="p-2 m-8 border-b">
                <div className="font-bold text-2xl">Results</div>
                  Predicted Funding for given Features: <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    ${parseFloat(predictionResults.result).toFixed(2)}
                </span>
            </div>
            {predictionResults.companies.length > 0  ? 
            <div className="mt-4">
              <h3 className="font-bold text-xl">Previous Startup Companies funds for the given Features</h3>
            <DataGrid data={predictionResults.companies}  count={predictionResults.total_count} page={page} setPage={setPage} nextPage={nextPage} prevPage={prevPage} />
            </div>
            : (
              <div className="mt-4"> No Previous Company Data found</div>
            )}
          </div>
        )
        }
      </div>
        {loading && (
          <div>Predicting...</div>
        )
        }
      </div>
    </div>
  ) : <h3 className="mt-4">Loading...</h3>
}

export default Prediction;