const xml = require("fast-xml-parser");
const fs = require("node:fs");
const parser = new xml.XMLParser();
const builder = new xml.XMLBuilder();
fs.readFile("./data.xml", "utf8", (err, xmldata) => {
    if (err) {
        console.log("File read failed", err);
        return;
    }
    const obj = parser.parse(xmldata);
    const necessaryData = obj.indicators.inflation.map(item => {
        if(item.ku === 13 && item.value >5){
            return item.value;
        }
    })
    const filteredData = necessaryData.filter(item => item !== undefined);
    const xmlObj = {
        data: {
            value: filteredData 
        }
    };
    const xmlstring = builder.build(xmlObj);
    fs.writeFile("output.xml", xmlstring, (err) => {
        if (err) {
            console.log("File write failed",err);
            return;
        }
    })
});