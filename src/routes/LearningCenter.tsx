import { Container, Paper, Typography } from "@mui/material";

const LearningCenter = () => {
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Learning Center
                </Typography>
                <hr />
                <Typography variant="body1">
                    Welcome to the Learning Center! Here you can learn about the stock market, investing, and more. We have articles, tutorials, and videos to help you learn more about the stock market.
                </Typography>
            </Paper>
        </Container>
    );
}

export default LearningCenter;