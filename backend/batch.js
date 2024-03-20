const mysql = require('mysql');
const axios = require('axios');
const { parseString } = require('xml2js');

const config = {
  host: 'gr5home.iptime.org',
  user: 'root',
  password: 'dK4!X!Y(Q6',
  database: 'oil',
  port: 800,
};
async function fetchFuelPrices(id) {
  const apiUrl = `https://www.opinet.co.kr/api/detailById.do?code=${process.env.OPINET_CODE}&id=${id}&out=xml`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return new Promise((resolve, reject) => {
      parseString(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const prices = {};
          const oilPrices = result.RESULT.OIL[0].OIL_PRICE;
          oilPrices.forEach((price) => {
            const prodCd = price.PRODCD[0];
            const priceValue = price.PRICE[0];
            if (['B027', 'B034', 'D047', 'C004'].includes(prodCd)) {
              prices[prodCd] = priceValue;
            }
          });
          resolve(prices);
        }
      });
    });
  } catch (error) {
    console.error('Failed to fetch fuel prices:', error);
    return null;
  }
}

async function UpdateFuelPrices() {
  const connection = mysql.createConnection(config);

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database.');

    const query = 'SELECT code FROM station';
    connection.query(query, async (error, results) => {
      if (error) {
        console.error('Error fetching station codes:', error);
        return;
      }

      for (const row of results) {
        const id = row.code;
        console.log(`Fetching fuel prices for station ${id}`);
        try {
          const prices = await fetchFuelPrices(id);
          if (prices) {
            const premiumGasolinePrice = prices['B034'] || '0';
            const gasolinePrice = prices['B027'] || '0';
            const dieselPrice = prices['D047'] || '0';
            const kerosenePrice = prices['C004'] || '0';

            const updateQuery = `UPDATE station SET premium_gasoline_price = ?, gasoline_price = ?, 
                                  diesel_price = ?, kerosene_price = ? WHERE code = ?`;

            connection.query(updateQuery, [premiumGasolinePrice, gasolinePrice, dieselPrice, kerosenePrice, id], updateError => {
              if (updateError) {
                console.error(`sql 에러 ${id}:`, updateError);
                return;
              }
              console.log(`업데이트 완료. ${id}`);
            });
          } else {
            console.log(`값이 없음 ${id}`);
          }
        } catch (fetchError) {
          console.error(`오류 ${id}:`, fetchError);
        }
      }

      connection.end(() => console.log('Database connection closed.'));
    });
  });
}

module.exports = { UpdateFuelPrices };