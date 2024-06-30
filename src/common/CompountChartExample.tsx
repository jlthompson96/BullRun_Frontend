import Chart from 'react-apexcharts';

const InvestmentChart = () => {
    // Calculate investment growth over 10 years
    let investment = 1000;
    const interestRate = 0.08;
    const data = [];

    for (let year = 0; year <= 40; year++) {
        data.push({
            x: year,
            y: investment.toFixed(2),
        });
        investment *= (1 + interestRate);
    }

    const options = {
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            }
        },
        xaxis: {
            title: {
                text: 'Year'
            }
        },
        yaxis: {
            title: {
                text: 'Investment Amount ($)'
            }
        },
        title: {
            text: 'Investment Growth Over 40 Years',
            align: 'center',
            style: {
                fontSize: '20px'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 5
        },
        tooltip: {
            x: {
                formatter: (value: number) => `Year ${value}`
            },
            y: {
                formatter: (value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            }
        }
    };

    return (
        <Chart
            options={{
                ...options,
                chart: { ...options.chart, type: 'line' },
                title: { ...options.title, align: 'center' }
            }}
            series={[{ data: data }]}
            type="line"
            height={350}
        />
    );
};

export default InvestmentChart;
