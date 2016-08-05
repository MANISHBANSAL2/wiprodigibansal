const readline = require('readline');
const fs = require('fs');
var header = [];
var jsonData = [];
var tempData = {};
var year, prvYear = 0,
    toalBirth = 0,
    totalDeath = 0,
    index;
var isHeader = true;

const rl = readline.createInterface({
    input: fs.createReadStream('../CSV/Indicators.csv')
});
rl.on('line', function(line) {
    var lineRecords = line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);;
    if (isHeader) {
        for (var i = 0; i < lineRecords.length; i++) {
            header[i] = lineRecords[i];
        }
        isHeader = false;
    } else {
        index = header.indexOf("Year");
        year=lineRecords[index];
             if (lineRecords[header.indexOf("CountryName")] === "India") {
                console.log(year+","+lineRecords[header.indexOf("IndicatorName")]+","+
              lineRecords[header.indexOf("Value")] );
        
            if (lineRecords[header.indexOf("IndicatorName")] === '"Birth rate, crude (per 1,000 people)"') {
                console.log("birth");
                toalBirth = lineRecords[header.indexOf("Value")];
            } else if (lineRecords[header.indexOf("IndicatorName")] === '"Death rate, crude (per 1,000 people)"') {
                console.log("Death");
                totalDeath = lineRecords[header.indexOf("Value")];
            }

            if (toalBirth != 0 && totalDeath != 0) {
                tempData["year"] = year;
                tempData["Birthratecrude"] = toalBirth;
                tempData["Deathratecrude"] = totalDeath;
                jsonData.push(tempData);
                tempData = {};
                totalDeath = 0;
                toalBirth = 0;
                fs.writeFileSync("birthDeath.json", JSON.stringify(jsonData), encoding = "utf8");

            }
        }
    }
});