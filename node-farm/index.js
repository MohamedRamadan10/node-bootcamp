const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

/** Files **/
// Blocking , synchronous way
// const dataInt = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(dataInt);

// const dataOut = `This is what we know about the avocado: ${dataInt}.\n Created At ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", dataOut);
// console.log("File is written");

// Non-blocking , asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, dataOne) => {
//    if (err) console.log("ERROR!! 💥");
//    fs.readFile(`./txt/${dataOne}.txt`, "utf-8", (err, dataTwo) => {
//       if (err) console.log("ERROR!! 💥");
//       fs.writeFile("./txt/final.txt", `${dataOne}\n\n${dataTwo}`, (err) => {
//          if (err) console.log("ERROR!! 💥");
//          console.log("File is written 😉");
//       });
//    });
// });
// console.log("Reading File..........");

/** Server **/
const replaceTemp = (temp, product) => {
   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
   output = output.replace(/{%ID%}/g, product.id);
   output = output.replace(/{%IMAGE%}/g, product.image);
   output = output.replace(/{%PRICE%}/g, product.price);
   output = output.replace(/{%DESCRIPTION%}/g, product.description);
   output = output.replace(/{%QUANTITIES%}/g, product.quantity);
   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
   output = output.replace(/{%COUNTRY%}/g, product.from);

   if (!product.organic)
      output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

   return output;
};

const tempOverview = fs.readFileSync(
   `${__dirname}/templates/template-overview.html`,
   "utf-8"
);
const tempProduct = fs.readFileSync(
   `${__dirname}/templates/template-product.html`,
   "utf-8"
);
const tempProductCard = fs.readFileSync(
   `${__dirname}/templates/template-card.html`,
   "utf-8"
);

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
   const pathName = req.url;

   if (pathName === "/" || pathName === "/overview") {
      const productsCard = dataObj
         .map((proCard) => replaceTemp(tempProductCard, proCard))
         .join("");

      const output = tempOverview.replace("{%PRODUCT_CARDS%}", productsCard);

      res.writeHead(200, { "content-type": "text/html" }).end(output);
   } else if (pathName === "/products") {
      res.end("This is products page");
   } else if (pathName === "/api") {
      res.writeHead(200, { "content-type": "application/json" }).end(data);
   } else {
      res.writeHead(404, {
         "content-type": "text/html",
      }).end("<h1>Page is not found!!!</h1>");
   }
});

server.listen(8000, "127.0.0.1", () =>
   console.log("Listening to requests on port 8000")
);
