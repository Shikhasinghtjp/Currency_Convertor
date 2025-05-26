import https from 'https';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({   //to interact with cli
    input: process.stdin,               //read data
    output: process.stdout              //write data in cli
});

const apikey = '6f1cf92123939c3f5359b738';
const url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;

const convertCurrency = (amount , rate ) =>{
    return (amount * rate).toFixed(2);
}

https.get(url ,(response) =>{
    let data = ""
    response.on('data' , (chunk) => {
        data += chunk;
    });
    response.on('end' , () => {
        const rates = JSON.parse(data).conversion_rates;
        rl.question("Enter the amount you want to convert: ", (amount) => {
            rl.question("Enter the target currency you want to convert to(eg: INR, EUR, NPR): ", (currency) => {
                const rate = rates[currency.toUpperCase()];
                if (rate) {
                    console.log(`${amount} USD is equal to ${convertCurrency(amount , rate )} ${currency}`);
                } else {
                    console.log("Invalid currency code. Please try again.");
                }
               rl.close();
            })
        })

    })
})