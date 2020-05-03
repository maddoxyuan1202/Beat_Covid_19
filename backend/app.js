"use strict";
var express = require('express');
const request = require('request');
const fs = require('fs');
const csv = require('csv-parser');
var cors = require('cors');
var countryList = require('./country_list.json');
var app = express();
app.use(cors());
let getStatistics = require('./lib/getStatistics.js');
app.use(express.static("static"));
app.use(cors());

//set the file name

    var dateObj = new Date;
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate()-2;
    var year = dateObj.getUTCFullYear();

    var month_name = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var formattedMonth = month;

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var newdate = month + "-" + day + "-" + year;
    var formatted_date = day + " " + month_name[formattedMonth-1] + " " + year;
    var fileName = newdate + '.csv';
    let url_github = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + fileName;
   //Create read Stream and write it in local .csv file 
    const writeStream = fs.createWriteStream(fileName)

    const results = [];
    var data = [];
    var totalConfirmed = 0;
    var totalDeaths = 0;
    var totalRecovered = 0;

    const file = fs.createWriteStream(fileName);
      new Promise((resolve, reject) => {
        request({ uri: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + fileName })
            .pipe(file)
            .on('finish', () => {
                fs.createReadStream(fileName)
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', () => {
                        if (results.length > 0) {
                            for (var i = 0; i < results.length; i++) {
                                totalConfirmed = parseInt(results[i].Confirmed) + totalConfirmed;
                                totalDeaths = parseInt(results[i].Deaths) + totalDeaths;
                                totalRecovered = parseInt(results[i].Recovered) + totalRecovered;
                            }
  
                            for (var j = 0; j < countryList.length; j++) {
                                var country_obj = JSON.parse(JSON.stringify(countryList[j]));
                                let statistics = getStatistics(country_obj, results);
                                data.push( statistics);
                            }                         

                            var items = {
                                total_confirmed: totalConfirmed,
                                total_deaths: totalDeaths,
                                total_recovered: totalRecovered,
                                last_date_updated: formatted_date,
                                country_statistics: data.sort((a, b) => b.confirmed - a.confirmed)
                            }

                            async function handleGet(req,res,query){
                                let error = 'NO_ERROR';
                                let country_name;
                                console.log('query: ', JSON.stringify(query));
                                if(query!==undefined&&query.country_name!==undefined){
                                    country_name = query.country_name;
                                    console.log("country_name: ", query)
                                }else{error = "ERROR: wrong country name"}

                                for(let i=0; i<items.country_statistics.length; i++){
                                    if (country_name==items.country_statistics[i].country){
                                            let output = {
                                            countryName : items.country_statistics[i],
                                        }

                                        let ouptutString = JSON.stringify(output,null,2);
                                        console.log("outputString: ", ouptutString);
                                        res.send(ouptutString);
                                    }
                                }

                            }

                            app.get("/", async function (req, res) {
                                if(req.query && Object.keys(req.query).length>0){
                                    console.log("I got a query");
                                    handleGet(req,res,req.query);
                                }
                            })

                            app.listen(7000,(err)=> {
                                console.log('app listening on port 7000!');
                            });                             

                        }
                    });
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            })
    }).catch(error => {
        console.log(`Something happened: ${error}`);
    });

