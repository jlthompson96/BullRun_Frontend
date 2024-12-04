import axios from 'axios';
import { useEffect, useState } from 'react';

function StockData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = 'stockData/stockPrice?symbol=F';
    console.log('Requesting:', url);

    axios.get('stockData/stockPrice?symbol=F', { withCredentials: false })
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stock Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default StockData;
