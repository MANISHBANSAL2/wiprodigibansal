var fs = require("fs");
var file = "Indicators.csv";
var out = "top5LifeExp";
var object = {};
var title = [];
var array = [];
var array1=[];
var array2=[];
var count = 0;
var k=0;
var reader = function(fileName,output) {
// read file stream
 var inStream=fs.createReadStream(fileName);
 var writeStream = fs.createWriteStream(output+'.json');
 writeStream.write("[");
 var readLine=require("readline").createInterface({
   input:inStream
 });

// split data
 readLine.on("line", function (line) {
       var data = line.toString();
       if(count==0){
         title = data.split(",");
        count=1;
       }
       else{
               var lines;
              if(data.includes('\"')){
              lines=data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
              var str = lines[2].toString();
              lines[2]=str.substring(1,str.length-1);
              }else {
               lines = data.split(",");
                   }
           if(lines[0].includes('"')){
          var str = lines[0].toString();
          lines[0]=str.substring(1,str.length-1);

           }
          for (var i = 0; i < lines.length; i++) {
          object[title[i]] = lines[i];

        }
         if(array.indexOf(lines[0])==-1){
         array.push(lines[0]);
         array1[k]={
           countryName:lines[0],
           total:0
         };
         k++;
       }
// access the data by header
       for(var j=0;j<array1.length;j++){

       if(array1[j].countryName==object.CountryName){
       if(object.IndicatorName=="Life expectancy at birth, total (years)"){
       array1[j].total=parseFloat(array1[j].total)+parseFloat(object.Value);
console.log(array1[j]);
         }
       }
     }
   }
 });
 inStream.on("end", function(){


      array1.sort(function(a,b){
       return b.total - a.total;
     });
// write stream
   for (var s=0;s<5;s++){

     writeStream.write(JSON.stringify(array1[s]));

       writeStream.write(",");
   }
   writeStream.write("]");
 console.log('File end');
 }
);

};
reader(file,out);
