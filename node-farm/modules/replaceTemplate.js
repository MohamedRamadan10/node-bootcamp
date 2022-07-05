module.exports = (temp, product) => {
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
