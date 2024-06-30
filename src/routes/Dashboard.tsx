import { Container, Paper, Typography } from "@mui/material";
import StockSearch from "./StockSearch";
import StockNews from "./StockNews";

const Dashboard = () => {
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Dashboard
                </Typography>
                <hr />
                <Typography variant="body1">
                    Welcome to the Dashboard! Here you can view your portfolio, watchlist, and more. We have tools to help you track your investments and make informed decisions.
                </Typography>
            </Paper>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <StockSearch />
                <StockNews />
            </div>
        </Container>
    );
}

export default Dashboard;