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
        const container = {};
        if(item.ku === 13 && item.value >5){
            container.value=item.value;
        }
        return container;
    })
    const filteredData = necessaryData.filter(item => Object.keys(item).length !== 0);
    const xmlstring = builder.build(filteredData);
    fs.writeFile("output.xml", xmlstring, (err) => {
        if (err) {
            console.log("File write failed",err);
            return;
        }
    })
});