export const guessFormHelper = (data: any) => {
  console.log("parsedData", data);

  let maxProbability = 0;
  let countryWithMaxProbability = null;

  data.country.forEach((country: any) => {
    if (country.probability > maxProbability) {
      maxProbability = country.probability;
      countryWithMaxProbability = country;
    }
  });

  return countryWithMaxProbability;
};
