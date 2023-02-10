import { useState } from 'react'
import './App.css'
import Wrapper from './components/Wrapper'
import { Tab, TabItem } from './components/Tab'
import Queries from './components/Queries'
import Prediction from './components/Prediction'

function App() {
  const [currentTab, setCurrentTab] = useState("predict");

  const onClickHandler = (tabItem) => {
    setCurrentTab(tabItem)
  }
  return (
    <div className="App">
      <h1 className='text-4xl font-bold'>Startup Funding</h1>

      <Wrapper>
        <Tab>
          {/* <TabItem selected={currentTab == "queries"} onClick={() => onClickHandler("queries")}>Queries</TabItem> */}
          <TabItem selected={currentTab == "predict"} onClick={() => onClickHandler("predict")}>Predict</TabItem>
        </Tab>

        {currentTab == "queries" ? <Queries /> : <Prediction />}
      </Wrapper>
    </div>
  )
}

export default App
