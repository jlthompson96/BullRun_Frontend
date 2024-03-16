import './App.css'
import ResponsiveAppBar from './common/commonAppBar'
import Footer from './common/Footer'
import StockSearch from './components/StockSearch'

function App() {

  return (
    <div>
      <ResponsiveAppBar />
      <div className="App" style={{ paddingTop: '50px' }}>
        <StockSearch />
      </div>
      <Footer />
    </div>
  )
}

export default App
