import './App.css'
import ResponsiveAppBar from './common/commonAppBar'
import Footer from './common/Footer'
import IndiciesBanner from './components/IndiciesBanner'
import StockSearch from './components/StockSearch'

function App() {

  return (
    <div>
      <ResponsiveAppBar />
      <div className="App" style={{ paddingTop: '50px' }}>
        {/* <IndiciesBanner /> */}
        <StockSearch />
      </div>
      <Footer />
    </div>
  )
}

export default App
