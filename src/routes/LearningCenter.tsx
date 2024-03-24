import { Container, Paper, Typography } from "@mui/material";
import CompoundChartExample from "../common/CompountChartExample";

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
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Stock Market Basics
                </Typography>
                <hr />
                <Typography variant="body1">
                    The stock market is a place where investors can buy and sell shares of publicly traded companies. The stock market is an essential part of the economy and plays a crucial role in the financial system. In this section, you will learn about the basics of the stock market, how it works, and how you can invest in it.
                </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Investing 101
                </Typography>
                <hr />
                <Typography variant="body1">
                    Investing is the process of putting money into financial assets with the expectation of generating a profit in the future. Investing is an essential part of building wealth and achieving financial goals. In this section, you will learn the basics of investing, how to get started, and how to build a diversified investment portfolio.
                </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" gutterBottom>
                    Compound Interest
                </Typography>
                <hr style={{ margin: '20px' }} />
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Compound interest is the interest calculated on the initial principal, which also includes all the accumulated interest from previous periods on a deposit or loan. Compound interest is an essential concept in investing and can help you grow your wealth over time. In this section, you will learn how compound interest works and how you can use it to your advantage.
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    Lets Calculate Compound Interest
                </Typography>
                <hr style={{ margin: '20px' }} />
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Compound interest is calculated using the formula:
                    A = P(1 + r/n)^(nt)
                    Where:
                    A = the future value of the investment/loan, including interest
                    P = the principal investment amount (the initial deposit or loan amount)
                    r = the annual interest rate (decimal)
                    n = the number of times that interest is compounded per year
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    Example:
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Suppose you invest $1,000 in a savings account that pays 8% interest compounded annually. How much will your investment be worth after 40 years?
                    <br />
                    <br />
                    A = 1000(1 + 0.08/1)^(1*40)
                    <br />
                    A = 1000(1 + 0.08)^40
                    <br />
                    A = 1000(1.08)^40
                    <br />
                    A = 1000 * 21.725
                    <br />
                    A = $21,725
                    <br />
                    <br />
                    <b>Your investment will be worth $21,725 after 40 years.</b>
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Chart showing the growth of an investment of $1,000 at a 8% annual interest rate over 40 years.
                </Typography>
                <CompoundChartExample />
            </Paper>
        </Container>
    );
}

export default LearningCenter;