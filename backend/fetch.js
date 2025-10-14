const axios = require("axios");
const fs = require("fs");

const API_KEY = "051442f84dc3402b885a0e52cecb4272";
const BASE_URL = "https://api.rawg.io/api";

const endpoints = {
  developers: `${BASE_URL}/developers?key=${API_KEY}&page_size=40`,
  platforms: `${BASE_URL}/platforms?key=${API_KEY}&page_size=40`,
  genres: `${BASE_URL}/genres?key=${API_KEY}&page_size=40`,
  tags: `${BASE_URL}/tags?key=${API_KEY}&page_size=40`,
};

async function fetchAllData(endpointName, url) {
  let page = 1;
  let hasNext = true;
  const results = [];

  console.log(`\n🔍 Fetching all ${endpointName.toUpperCase()}...`);

  while (hasNext) {
    try {
      const { data } = await axios.get(`${url}&page=${page}`);
      const items = data.results.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      results.push(...items);

      console.log(`✅ Fetched ${items.length} ${endpointName} on page ${page}`);

      if (data.next) {
        page++;
      } else {
        hasNext = false;
      }
    } catch (error) {
      console.error(
        `❌ Error fetching ${endpointName} page ${page}:`,
        error.message
      );
      break;
    }
  }

  console.log(
    `✅ Completed fetching ${endpointName}. Total: ${results.length}`
  );
  return results;
}

async function main() {
  const finalData = {};

  for (const [key, url] of Object.entries(endpoints)) {
    const data = await fetchAllData(key, url);
    finalData[key] = data;
  }

  fs.writeFileSync("rawg_data.json", JSON.stringify(finalData, null, 2));
  console.log("\n📦 Data saved to rawg_data.json");
}

main();
