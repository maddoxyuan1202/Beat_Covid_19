const assert = require("assert");
const getStatistics = require("../backend/lib/getStatistics.js")
const fs = require("fs");
//Testing getStatistics
describe("getStaticstics Test with mocha", ()=>{
    it("should return statistics about a specific country",()=>{
        let country_obj = 'US';
        let results = [];
        fs.readFile("04-23-2020", 'utf-8', function(err,data){
            if (err){console.log("error")}
            else {results.push(data)}
                        country_statistics = {
                            country: "US",
                            code: "US",
                            flag: "https://assets.hackbotone.com/images/flags/flag_united_states_of_america.png",
                            confirmed: 869170,
                            deaths: 49954,
                            recovered: 80203,
                        }
            assert.equal(getStatistics(country_obj,results), country_statistics)
        })
    })
})

//test works will but fs.read will call function 2 times, So generally speaking it works well