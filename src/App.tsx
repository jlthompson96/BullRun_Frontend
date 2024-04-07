import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import './App.css'
import ResponsiveAppBar from './common/commonAppBar'
import Footer from './common/Footer'

function App() {

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
        <Footer />
      </ThemeProvider>

    </div>
  )
}

export default App
