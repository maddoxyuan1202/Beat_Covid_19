module.exports = function getStatistics(country_obj, results) {
    var country;
    var code;
    var flag;
    var confirmed = 0;
    var deaths = 0;
    var recovered = 0;
    var country_statistics;

    for (var i = 0; i < results.length; i++) {
        if (results[i].Country_Region == country_obj.country) {
            country = results[i].Country_Region;
            code = country_obj.code;
            flag = country_obj.flag;

            confirmed = parseInt(results[i].Confirmed) + confirmed;
            deaths = parseInt(results[i].Deaths) + deaths;
            recovered = parseInt(results[i].Recovered) + recovered;
            }
        }

    country_statistics = {
        country: country,
        code: code,
        flag: flag,
        confirmed: confirmed,
        deaths: deaths,
        recovered: recovered,
    }
    return country_statistics;
}
