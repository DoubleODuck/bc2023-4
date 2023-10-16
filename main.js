const http = require("http");
const xml = require("fast-xml-parser");
const fs = require("node:fs");
const parser = new xml.XMLParser();
const builder = new xml.XMLBuilder({ format: true });
const server = http.createServer((req, res) => {
        const xmldata = fs.readFile("data.xml","utf-8");
        const obj = parser.parse(xmldata);
        const necessaryData = obj.indicators.inflation.map(item => {
            if (item.ku === 13 && item.value > 5) {
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
})