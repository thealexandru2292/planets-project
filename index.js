const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];


function isHabitablePlanet(planet)
{
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

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

        if(isHabitablePlanet(data))
        {
            habitablePlanets.push(data);
        }
        
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(habitablePlanets);
        console.log(`${habitablePlanets.length} habitable planets found`);
        console.log('done');
    })
