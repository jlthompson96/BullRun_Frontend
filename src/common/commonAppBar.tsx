import { AppBar, MenuItem, Toolbar, Typography, useMediaQuery, Drawer, List, ListItem, ListItemText, IconButton, Theme } from "@mui/material";
import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import StockSearch from "../routes/StockSearch";
import BullRunLogo from "../assets/BullRunLogo.png";
import LearningCenter from "../routes/LearningCenter";
import Dashboard from "../routes/Dashboard";
import StockNews from "../routes/StockNews";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const CommonAppBar = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const menuItems = [
        { link: "/dashboard", text: "Dashboard" },
        { link: "/stockAnalyzer", text: "Stock Analyzer" },
        { link: "/learningCenter", text: "Learning Center" },
        { link: "/news", text: "News" },
    ];

    return (
        <AppBar position="static">
            <Toolbar>
                <img src={BullRunLogo} alt="BullRun Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                {isMobile ? (
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <MenuIcon sx={{ paddingLeft: '10px' }} />
                        </IconButton>
                        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                            <List>
                                {menuItems.map((item, index) => (
                                    <ListItem button key={index} component={Link} to={item.link} onClick={handleDrawerToggle}>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    menuItems.map((item, index) => (
                        <MenuItem key={index}><Typography variant="h6"><Link to={item.link} style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>{item.text}</Link></Typography></MenuItem>
                    ))
                )}
            </Toolbar>
        </AppBar>
    );
};

const App = () => {
    return (
        <Router>
            <CommonAppBar />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stockAnalyzer" element={<StockSearch />} />
                <Route path="/learningCenter" element={<LearningCenter />} />
                <Route path="/news" element={<StockNews />} />
            </Routes>
        </Router>
    );
};

export default App;