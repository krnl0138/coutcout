const fs = require("fs");

/**
 * A helper to generate fake data based on countries
 */

const countries = {
  countries: {
    0: "argentina",
    1: "australia",
    2: "austria",
    3: "brazil",
    4: "canada",
    5: "chile",
    6: "china",
    7: "denmark",
    8: "englang",
    9: "france",
    10: "germany",
    11: "greece",
    12: "india",
    13: "ireland",
    14: "israel",
    15: "italy",
    16: "japan",
    17: "latvia",
    18: "mexico",
    19: "poland",
    20: "portugal",
    21: "russia",
    22: "spain",
    23: "sweden",
    24: "UK",
    25: "ukraine",
    26: "USA",
  },
};

const mappedSubcategories = {
  0: { 0: 0, 1: 1, 2: 2 },
  1: { 0: 3, 1: 4, 2: 5, 3: 6 },
  2: { 0: 7, 1: 8 },
  3: { 0: 9, 1: 10, 2: 11 },
  4: { 0: 12, 1: 13, 2: 14 },
  5: {},
  6: { 0: 15, 1: 16 },
  7: {},
  8: { 0: 17, 1: 18, 2: 19, 3: 20, 4: 21 },
  9: { 0: 22, 1: 23 },
};

const list = Object.keys(countries.countries);

const content = { compareCategories: {}, compareSubcategories: {} };
const generateSpendings = (limit) => {
  let catId = 0;
  let categorySum = 0;
  for (let i = 0; i < 24; i++) {
    // generate random spending for each subcat
    const randomSubSpending = Math.floor(Math.random() * limit);
    // write 23 subcats
    content.compareSubcategories[i] = {
      spendings: randomSubSpending,
    };

    const lastSubNumber = Object.values(mappedSubcategories[catId]).pop();
    categorySum += randomSubSpending;
    if (i === lastSubNumber) {
      content.compareCategories[catId] = { spendings: categorySum };
      catId++;
      categorySum = 0;
    } else if (catId === 5) {
      content.compareCategories[catId] = {
        spendings: Math.floor(Math.random() * limit),
      };
      catId++;
      categorySum = 0;
    } else if (catId === 7) {
      content.compareCategories[catId] = {
        spendings: Math.floor(Math.random() * limit),
      };
      catId++;
      categorySum = 0;
    }
  }
};

list.forEach((c, i) => {
  generateSpendings(600);
  const folderName = `/Users/user/coutcout/server/countries/${c}`;
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      fs.writeFile(
        `/Users/user/coutcout/server/countries/${c}/spendings.json`,
        JSON.stringify(content),
        (err) => {
          if (err) {
            console.error(err);
          }
          // file written successfullly
        }
      );
    }
  } catch (err) {
    console.error(err);
  }
});
