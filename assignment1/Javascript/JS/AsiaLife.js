var fs = require("fs");
var file = "Indicators.csv";
var out = "AsiaLife";
var object = {};
var title = [];
var array = [];
var array1 = [];
var start = 0;
var end = 55;
var flag=0,count=0,count1= 0;
var count = 0;
var count1 = 0;
var asianCountries = ["Afghanistan", "Armenia", "Azerbaijan", "Bangladesh",
   "Bhutan", "Cambodia", "China", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel",
   "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives",
   "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Qatar", "Russia", "Saudi Arabia",
   "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand",
   "Philippines", "United Arab Emirates", "Turkmenistan", "Uzbekistan", "Vietnam", "Yemen",
   "Europe & Central Asia (all income levels)",
   "South Asia", "East Asia & Pacific (all income levels)"
];
var asianCountrieslenght=asianCountries.length;
var reader = function(start,end,fileName,output) {
 for(var d = start; d <= end ;d++){
   array[d] = {
     year : parseInt(d) + 1960,
     gender: 0,
     values : 0
   };
   array1[d] = {
     year : parseInt(d) + 1960,
     gender: 0,
     values : 0
   };
 }
 //console.log(array);
 var inStream=fs.createReadStream(fileName);
 var writeStream = fs.createWriteStream(output+'.json');
 writeStream.write("[");
 var readLine=require("readline").createInterface({
   input:inStream
 });
 readLine.on("line", function (line) {
   var data = line.toString();
   if(flag==0){
     title = data.split(",");
     flag=1;
   }
   else{
     var lines;
     if(data.includes("\"")){
       lines=data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
       var str = lines[2].toString();
       lines[2]=str.substring(1,str.length-1);
     }else {
       lines = data.split(",");
     }
     for (var i = 0; i < lines.length; i++) {

       object[title[i]] = lines[i];
     }
     for (var j = start ; j <= end ; j++){
      for(var m=0;m<asianCountrieslenght;m++)
      {
     if(object["CountryName"] == asianCountries[m]){
         if(array[j].year==object["Year"]){
           if(object["IndicatorName"]=="Life expectancy at birth, female (years)"){
             
               array[j].gender = 'female';
             array[j].values += parseFloat(object["Value"]);
            
         }
         }
       }
     }
     }
     for (var j = start ; j <= end ; j++){
     for(var m=0;m<asianCountrieslenght;m++)
      {
     if(object["CountryName"] == asianCountries[m]){
         if(array[j].year==object["Year"]){
           if(object["IndicatorName"]=="Life expectancy at birth, male (years)"){
             
               array1[j].gender = 'male';
             array1[j].values += parseFloat(object["Value"]);
             
         }
         console.log(array1[j]);
         }
       }
     }
   }
     //var last=lines[lines.length-1];
     //object[title[lines.length-1]]=last.substring(1,last.length-1);
     //writeStream.write(JSON.stringify(object));
     //writeStream.write(",");
   }
 });
 inStream.on("end", function(){
   for (var k=start;k<=end;k++){
     writeStream.write(JSON.stringify(array[k]));
       writeStream.write(",");
     writeStream.write(JSON.stringify(array1[k]));
     console.log(array[k]);
     console.log(array1[k]);
     writeStream.write(",");
   }
   writeStream.write("]");
 });
};
reader(start,end,file,out);
