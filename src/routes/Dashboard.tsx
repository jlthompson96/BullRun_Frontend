import { Container, Paper, Typography } from "@mui/material";

const Dashboard = () => {
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to BullRun!
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    Stay up-to-date with the latest news on your favorite stocks.
                </Typography>
            </Paper>
        </Container>
    );
}

export default Dashboard;