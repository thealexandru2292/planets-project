const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler_data.csv')
//connect parse() with fs together by pipe()
//it transform data from stream (0101) to bytes data (text)
    .pipe(parse(
        {
            //dependign on who wrote the csv file put the comment sign and we need to indicate which character is the commented line
            comment: '#',
            columns: true,//set columns as key=>value pairs
        }
    ))
    .on('data', (data) => {
        results.push(data);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(results);
        console.log('done');
    })
