import './App.css'
import { Typography } from '@mui/material'
import StockSearch from './components/StockSearch'

function App() {

  return (
    <div>
      <Typography variant='h1'>Welcome to BullRun!</Typography>
      <StockSearch />
    </div>
  )
}

export default App
