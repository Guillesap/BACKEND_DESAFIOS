const axios = require("axios");

module.exports = async function prefixService() {
   
  const response = await axios.get(
    "https://api-prefixes.herokuapp.com/api/prefixes"
  );
  const result = response.data;
  console.log(result);
  return result.prefix;
};
