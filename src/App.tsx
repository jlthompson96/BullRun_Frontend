import './App.css'
import ResponsiveAppBar from './common/commonAppBar'
import Footer from './common/Footer'
import IndiciesTicker from './components/IndicesTicker'
import StockSearch from './components/StockSearch'

function App() {

  return (
    <div>
      <ResponsiveAppBar />
      <div className="App" style={{ paddingTop: '50px' }}>
        {/* <IndiciesTicker /> */}
        <StockSearch />
      </div>
      <Footer />
    </div>
  )
}

export default App
