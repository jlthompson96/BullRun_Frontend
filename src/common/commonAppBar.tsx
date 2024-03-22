import { AppBar, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import StockSearch from "../routes/StockSearch";
import BullRunLogo from "../assets/BullRunLogo.png";

// Import your components (Home, About, Contact)

const CommonAppBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <img src={BullRunLogo} alt="BullRun Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <MenuItem><Typography variant="h6"><Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>Dashboard</Link></Typography></MenuItem>
                <MenuItem><Typography variant="h6"><Link to="/stockAnalyzer" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>Stock Analyzer</Link></Typography></MenuItem>
                <MenuItem><Typography variant="h6"><Link to="/learningCenter" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>Learning Center</Link></Typography></MenuItem>
                <MenuItem><Typography variant="h6"><Link to="/news" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>News</Link></Typography></MenuItem>
            </Toolbar>
        </AppBar>
    );
};

const App = () => {
    return (
        <Router>
            <CommonAppBar />
            <Routes>
                <Route path="/stockAnalyzer" element={<StockSearch />} />
                {/* <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
