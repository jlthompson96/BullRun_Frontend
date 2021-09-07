function generateChart() {
    let i = 0;
    let balance = new Array();
    let nums = new Array();
    let principle = document.getElementById("principle").value;
    let rate = document.getElementById("rate").value;
    let frequency = document.getElementById("frequency").value;
    let years = document.getElementById("years").value;
    let convertRate = rate / 100;

    while (i < years) {
        nums.push(i + " Years");
        let newAmount = principle * Math.pow(1 + (convertRate / frequency), frequency * i);
        balance.push(newAmount);
        i++;
    }


    // Create Compound Interest Chart
    const labels = nums;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Balance ($USD)',
            backgroundColor: 'rgb(46,139,87)',
            borderColor: 'rgb(46,139,87)',
            data: balance
        }]
    };
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'lightBlue';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };
    const config = {
        type: 'line',
        data: data,
        plugins: [plugin],
        options: {}
    };



    var myChart = new Chart(
        document.getElementById('compound'),
        config
    );
    return myChart;
}