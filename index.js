
var result = require('./country-city.json');
var fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const  { codes } = require('country-calling-code');

const helperFunc = async () => {
    // const result = await fetch('./country-city.json')
    const alo = {}
    Object.keys(result).forEach((city) => {
        let existingCountries = []

        const newCities = result[city].map(country => {
            if (!existingCountries.includes(country)) {
                existingCountries.push(country)

                return country
            }
        }).filter(Boolean)
        
        alo[city] = newCities
    })

    console.log('alo ', alo)

    fs.writeFile('myjsonfile.json', JSON.stringify(alo), 'utf8', (err) => {
        console.log('err ', err)
    });
}

// helperFunc()

const getPhoneCodeByISOCode3 = (isoCode3) => {
    if (isoCode3 === "GUF") {
        return 594
    }

    if (isoCode3 === "MTQ") {
        return 596
    }

    if (isoCode3 === )
    console.log('iso ', isoCode3)
    const result =  codes.find(countryCodeItem => countryCodeItem.isoCode3 === isoCode3)
    console.log('result ', result)
    const { countryCodes } = result

    return countryCodes[0]
}

const makeCountriesCityObj = (array) => {
    return array.map(item => {
        const phoneCode = getPhoneCodeByISOCode3(item[6])
        if (!phoneCode) {
            return
        }

        return {
            cityName: item[0],
            code: item[6],
            regionId: '',
            phoneCode: phoneCode
        }
    }).filter(Boolean)
}

const getDataFunc = async () => {
    let countriesCityObj = {}
    
    readXlsxFile(Buffer.from(fs.readFileSync('./sample.xlsx'))).then(async (data) => {
        // if (errors) {
        //     console.log('errors ', errors)
        //     return;
        // }

        const countriesCity = await readXlsxFile(Buffer.from(fs.readFileSync('./sample.xlsx')), { sheet: 3 })
        countriesCityObj = makeCountriesCityObj(countriesCity.slice(1, countriesCity.length - 1))

        console.log(countriesCityObj)
        // console.log("data ", data[1]);
        // const 
        data.slice(1, data.length - 1).forEach(country => {
            const [cityName, countryName, _, region]  = country
            // console.log('countryName ', cityName)
            // console.log('cityName ', cityName)

        })
    });
}

getDataFunc()