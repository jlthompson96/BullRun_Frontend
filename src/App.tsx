import './App.css'
import ResponsiveAppBar from './common/commonAppBar'
import StockSearch from './components/StockSearch'

function App() {

  return (
    <div>
      <ResponsiveAppBar />
      <div className="App" style={{ paddingTop: '50px' }}>
        <StockSearch />
      </div>
    </div>
  )
}

export default App
