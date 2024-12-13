import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CompoundChartExample from "../common/CompountChartExample";
import { useState } from "react";

const LearningCenter = () => {
    const [presentValue, setPresentValue] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(0);
    const [years, setYears] = useState<number>(0);
    const [futureValue, setFutureValue] = useState<number | null>(null);

    const calculateFutureValue = () => {
        const fv = presentValue * Math.pow(1 + interestRate / 100, years);
        setFutureValue(fv);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h4" align="center" gutterBottom>
                    Learning Center
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    Explore concepts like Compound Interest, P/E Ratio, and more to enhance your financial knowledge.
                </Typography>
            </Paper>
            <Divider sx={{ marginY: '20px' }} />
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" id="table-of-contents" gutterBottom>
                    Table of Contents
                </Typography>
                <Accordion sx={{ backgroundColor: 'rgb(237, 242, 247)' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Topics</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List sx={{ padding: '10px' }}>
                            <ListItem component="a" href="#stock-market-basics" sx={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Stock Market Basics" />
                            </ListItem>
                            <ListItem component="a" href="#compound-interest" sx={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Compound Interest" />
                            </ListItem>
                            <ListItem component="a" href="#pe-ratio" sx={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Price to Earnings Ratio (P/E)" />
                            </ListItem>
                            <ListItem component="a" href="#dividend-yield" sx={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Dividend Yield" />
                            </ListItem>
                            <ListItem component="a" href="#fair-value" sx={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Fair Value Calculation" />
                            </ListItem>
                            <ListItem component="a" href="#future-value" sx={{ padding: '10px', textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Future Value Calculation" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Paper>
            <div style={{ display: 'flex', columnGap: '5%', flexWrap: 'nowrap' }}>
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                    <Typography variant="h5" id="stock-market-basics" gutterBottom>
                        Stock Market Basics
                    </Typography>
                    <hr />
                    <Typography variant="body1">
                        The stock market is a place where investors can buy and sell shares of publicly traded companies. The stock market is an essential part of the economy and plays a crucial role in the financial system. In this section, you will learn about the basics of the stock market, how it works, and how you can invest in it.
                    </Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} id="stock-search-container">
                    <Typography variant="h5" gutterBottom>
                        Investing 101
                    </Typography>
                    <hr />
                    <Typography variant="body1">
                        Investing is the process of putting money into financial assets with the expectation of generating a profit in the future. Investing is an essential part of building wealth and achieving financial goals. In this section, you will learn the basics of investing, how to get started, and how to build a diversified investment portfolio.
                    </Typography>
                </Paper>
            </div>
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" id="compound-interest" gutterBottom>
                    Compound Interest
                </Typography>
                <hr style={{ margin: '20px' }} />
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Compound interest is the interest calculated on the initial principal, which also includes all the accumulated interest from previous periods on a deposit or loan. Compound interest is an essential concept in investing and can help you grow your wealth over time. In this section, you will learn how compound interest works and how you can use it to your advantage.
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    Lets Calculate Compound Interest
                </Typography>
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
                <Typography variant="body1" style={{ padding: '20px' }}>
                    <a href="#table-of-contents" style={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit', backgroundColor: 'rgb(237, 242, 247)' }}>Back to Table of Contents</a>
                </Typography>
            </Paper>
            {/* Create a section about calculating a stocks P/E */}
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" id="pe-ratio" gutterBottom>
                    Price to Earnings Ratio (P/E)
                </Typography>
                <hr style={{ margin: '20px' }} />
                <Typography variant="body1" style={{ padding: '20px' }}>
                    The Price to Earnings Ratio (P/E) is a financial ratio used to evaluate a company's current share price relative to its earnings per share (EPS). The P/E ratio is a valuable tool for investors to determine whether a stock is overvalued, undervalued, or fairly valued. In this section, you will learn how to calculate a stock's P/E ratio and how to interpret the results.
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    How to Calculate a Stock's P/E Ratio
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    The formula to calculate a stock's P/E ratio is:
                    P/E Ratio = Stock Price / Earnings Per Share (EPS)
                    Where:
                    Stock Price = the current market price of the stock
                    Earnings Per Share (EPS) = the company's net income divided by the number of outstanding shares
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    Example:
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Suppose a company's stock is trading at $50 per share, and its earnings per share (EPS) is $5. What is the company's P/E ratio?
                    <br />
                    <br />
                    P/E Ratio = Stock Price / Earnings Per Share (EPS)
                    <br />
                    P/E Ratio = $50 / $5
                    <br />
                    P/E Ratio = 10
                    <br />
                    <br />
                    <b>The company's P/E ratio is 10.</b>
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    <a href="#table-of-contents" style={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit', backgroundColor: 'rgb(237, 242, 247)' }}>Back to Table of Contents</a>
                </Typography>
            </Paper>
            {/* Create a section about calculating a stocks Dividend Yield */}
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" id="dividend-yield" gutterBottom>
                    Dividend Yield
                </Typography>
                <hr style={{ margin: '20px' }} />
                <Typography variant="body1" style={{ padding: '20px' }}>
                    The Dividend Yield is a financial ratio that shows how much a company pays out in dividends each year relative to its share price. The Dividend Yield is an essential metric for income investors looking to generate passive income from their investments. In this section, you will learn how to calculate a stock's Dividend Yield and how to interpret the results.
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    How to Calculate a Stock's Dividend Yield
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    The formula to calculate a stock's Dividend Yield is:
                    Dividend Yield = Annual Dividends Per Share / Stock Price
                    Where:
                    Annual Dividends Per Share = the total annual dividends paid by the company divided by the number of outstanding shares
                    Stock Price = the current market price of the stock
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    Example:
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Suppose a company pays an annual dividend of $2 per share, and its stock is trading at $50 per share. What is the company's Dividend Yield?
                    <br />
                    <br />
                    Dividend Yield = Annual Dividends Per Share / Stock Price
                    <br />
                    Dividend Yield = $2 / $50
                    <br />
                    Dividend Yield = 0.04 or 4%
                    <br />
                    <br />
                    <b>The company's Dividend Yield is 4%.</b>
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    <a href="#table-of-contents" style={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit', backgroundColor: 'rgb(237, 242, 247)' }}>Back to Table of Contents</a>
                </Typography>
            </Paper>

            {/* Create a section about calculating a stocks fair value */}
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" id="fair-value" gutterBottom>
                    Fair Value Calculation
                </Typography>
                <hr style={{ margin: '20px' }} />
                <Typography variant="body1" style={{ padding: '20px' }}>
                    The Fair Value of a stock is the estimated value of a company's stock based on its financial performance and future growth prospects. The Fair Value Calculation is an essential tool for investors to determine whether a stock is overvalued, undervalued, or fairly valued. In this section, you will learn how to calculate a stock's Fair Value and how to interpret the results.
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    How to Calculate a Stock's Fair Value
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    The formula to calculate a stock's Fair Value is:
                    Fair Value = (EPS * P/E Ratio) * Future Growth Rate
                    Where:
                    EPS = Earnings Per Share
                    P/E Ratio = Price to Earnings Ratio
                    Future Growth Rate = the expected annual growth rate of the company's earnings
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    Example:
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Suppose a company has an EPS of $5, a P/E ratio of 10, and an expected annual growth rate of 5%. What is the company's Fair Value?
                    <br />
                    <br />
                    Fair Value = (EPS * P/E Ratio) * Future Growth Rate
                    <br />
                    Fair Value = ($5 * 10) * 0.05
                    <br />
                    Fair Value = $50 * 0.05
                    <br />
                    Fair Value = $2.50
                    <br />
                    <br />
                    <b>The company's Fair Value is $2.50.</b>
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    <a href="#table-of-contents" style={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit', backgroundColor: 'rgb(237, 242, 247)' }}>Back to Table of Contents</a>
                </Typography>
            </Paper>

            {/* Create a section about calculating a stocks future value */}
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }} className="stock-search-container">
                <Typography variant="h5" id="future-value" gutterBottom>
                    Future Value Calculation
                </Typography>
                <hr style={{ margin: '20px' }} />
                <Typography variant="body1" style={{ padding: '20px' }}>
                    The Future Value of an investment is the estimated value of an investment at a future date based on the expected rate of return. The Future Value Calculation is an essential tool for investors to determine how much an investment will be worth in the future. In this section, you will learn how to calculate the Future Value of an investment and how to interpret the results.
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    How to Calculate the Future Value of an Investment
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    The formula to calculate the Future Value of an investment is:
                    FV = PV * (1 + r)^n
                    Where:
                    FV = Future Value of the investment
                    PV = Present Value of the investment
                    r = the annual interest rate
                    n = the number of years
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    Example:
                </Typography>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    Suppose you have an investment of $1,000 (PV) with an annual interest rate of 5% (r) for 10 years (n). The Future Value (FV) of the investment would be calculated as follows:
                    <br />
                    FV = 1000 * (1 + 0.05)^10 = 1000 * 1.62889 = $1,628.89
                </Typography>
                <Typography variant="h5" style={{ padding: '20px' }}>
                    Calculate Your Own Future Value:
                </Typography>
                <div style={{ padding: '20px' }}>
                    <TextField
                        label="Present Value (PV)"
                        type="number"
                        value={presentValue}
                        onChange={(e) => setPresentValue(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Annual Interest Rate (r) %"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Number of Years (n)"
                        type="number"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={calculateFutureValue} style={{ marginTop: '20px' }}>
                        Calculate Future Value
                    </Button>
                    {futureValue !== null && (
                        <Typography variant="h6" style={{ marginTop: '20px' }}>
                            Future Value (FV): ${futureValue.toFixed(2)}
                        </Typography>
                    )}
                </div>
                <Typography variant="body1" style={{ padding: '20px' }}>
                    <a href="#table-of-contents" style={{ padding: '10px', borderBottom: '1px solid #ddd', textDecoration: 'none', color: 'inherit', backgroundColor: 'rgb(237, 242, 247)' }}>Back to Table of Contents</a>
                </Typography>
            </Paper>

        </Container>
    );
}

export default LearningCenter;