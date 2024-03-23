import { Container, Paper, Typography } from "@mui/material";

const News = () => {
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    News
                </Typography>
                <hr />
                <Typography variant="body1">
                    Welcome to the News section! Here you can read the latest news about the stock market, investing, and more. We have articles, tutorials, and videos to help you stay up to date with the latest news.
                </Typography>
            </Paper>
        </Container>
    );
}

export default News;