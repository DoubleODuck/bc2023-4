const xml = require("fast-xml-parser");
const fs = require("node:fs");
const parser = new xml.XMLParser();
fs.readFile("./data.xml", "utf8", (err, xmldata) => {
    if (err) {
        console.log("File read failed", err);
        return;
    }
    const obj = parser.parse(xmldata);
    const necessaryData = obj.map(item => {
        const container = {};
        if(item.ku==="13" && item.value >5){
            container.value = item.value;
        }
        return container;
    })
    console.log(necessaryData);
});