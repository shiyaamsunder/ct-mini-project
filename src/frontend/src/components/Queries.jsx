import { useState } from "react";

const queries = ["Which City has got the highest funding overall?", ""]
const Queries = () => {

  const [amount, setAmount] = useState("under10m")
  const [loading, setLoading] = useState(false)

  const onOptionChange = (e) => {
    setAmount(e.target.value)
  }

  const findNames = async (amount) => {
    try{
      setLoading(true)
      const res = await fetch("http://localhost:8000/query", {
      method: "POST",
      body: JSON.stringify({ amount: amount }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await res.json()
    console.log(data)
  }
  catch(err){
    console.error(err)
  }
  }
  return (
    <div>
      Queries Tab

      <div className="p-4">

        <div className="md:w-1/3 flex flex-col items-start">
          <p className="mb-3">Funding Raised in USD</p>
          <div className="flex items-center justify-between md:w-[300px]">
            <div className="">
              <div className="flex items-center mb-4">
                <input onChange={onOptionChange} id="under10m" type="radio" value="under10m" name="amount" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="under10m" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Under $10 Million</label>
              </div>
              <div className="flex items-center mb-4">
                <input onChange={onOptionChange} id="10m_50m" type="radio" value="10m_50m" name="amount" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="10m_50m" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$10M - $50M</label>
              </div>
              <div className="flex items-center mb-4">
                <input onChange={onOptionChange} id="50m_100m" type="radio" value="50m_100m" name="amount" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="50m_100m" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$50 - $100M</label>
              </div>
            </div>
            <div>

              <div className="flex items-center mb-4">
                <input onChange={onOptionChange} id="100m_500m" type="radio" value="100m_500m" name="amount" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="100m_500m" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$100M - $500M</label>
              </div>
              <div className="flex items-center mb-4">
                <input onChange={onOptionChange} id="500m_1b" type="radio" value="500m_1b" name="amount" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="500m_1b" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$500M - $1B</label>
              </div>
              <div className="flex items-center mb-4">
                <input onChange={onOptionChange} id="more1b" type="radio" value="more1b" name="amount" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="more1b" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">More than $1B</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => findNames(amount)}>Send</button>
    </div>
  )
}

export default Queries;