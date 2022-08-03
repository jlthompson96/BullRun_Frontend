function sanitizeUserInput(element) {
   return DOMPurify.sanitize(element);   
}

function generateChart() {
    let i = 0;
    let balance = new Array();
    let nums = new Array();
    let contributions = new Array();
    let principle = sanitizeUserInput(document.getElementById("principle").value);
    let rate = sanitizeUserInput(document.getElementById("rate").value);
    let frequency;
    let years = sanitizeUserInput(document.getElementById("years").value);
    let convertRate = rate / 100;

    //Dropdown Menu Selection
    let select = document.getElementById("choices");
    let result = select.options[select.selectedIndex].value;
    let resultText = select.options[select.selectedIndex].text;
    if (result == 1) {
        frequency = 365;
    } else if (result == 2) {
        frequency = 4;
    } else if (result == 3) {
        frequency = 12
    } else {
        frequency = 1
    }

    //Add Data to the Arrays
    while (i <= years) {
        nums.push(i + " Years");
        let newAmount = principle * Math.pow(1 + (convertRate / frequency), frequency * i);
        let formatNum = newAmount.toFixed(2);
        balance.push(formatNum);
        contributions.push(principle);
        i++;
    }
    let finalNum = balance[balance.length - 1];
    let formatHeader = finalNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let formatPrincipal = principle.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Create Compound Interest Chart
    let options = {
        series: [{
            name: "Compounded Amount",
            data: balance
        },
                 {
                     name: "Total Contributions",
                     data: contributions
                 }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Annual Compound Balance',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            type: 'string',
            categories: nums,
        },
        markers: {
            size: 4,
            colors: undefined,
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
              size: undefined,
              sizeOffset: 3
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    let formatNum = value.toFixed(2);
                    let commas = formatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return "$" + commas;


                }
            }
        }
    };

    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    document.getElementById("result").innerHTML = "<h1>In " + years + " years at a rate of " + rate + "% compounded "+resultText+" your $" + formatPrincipal + " will turn into $" + formatHeader;
}
