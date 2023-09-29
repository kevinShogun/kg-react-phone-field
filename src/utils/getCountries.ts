import {
  getCountries,
  getCountryCallingCode,
  Country,
} from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es.json';
import en from 'react-phone-number-input/locale/en.json';
import _ from 'lodash';

export const sortedCountries = (
  countries: Country[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any,
  CountryNumber: number
) => {
  // aqui ordenamos los paises por orden alfabetico
  // y firstCountry va de primero
  const listOfCountries: lstCountries[] = [];
  countries.forEach((country: Country) => {
    listOfCountries.push({
      label: labels[country],
      value: `${labels[country]} +${getCountryCallingCode(country)}`,
      numericValue: parseInt(getCountryCallingCode(country)),
    });
  });
  console.log(listOfCountries);
  // firstCountry first
  const firstCountry = listOfCountries.find(
    country => country.numericValue === CountryNumber
  );
  const filteredCountries = listOfCountries.filter(
    country => country.numericValue !== CountryNumber
  );
  const sortedCountries = _.sortBy(filteredCountries, ['label']);
  if (firstCountry) sortedCountries.unshift(firstCountry);
  // sort by label
  return sortedCountries;
};

type lstCountries = {
  label: string;
  numericValue: number;
  value: string;
};

export type PropsList =
  | ['label']
  | ['label', 'numericValue']
  | ['value', 'numericValue']
  | ['label', 'numericValue', 'value'];

export const listCountriesCodes = (
  listToReturn: PropsList,
  CountryNumber = 506,
  lang: 'es' | 'en'
) => {
  let langToUse = es;
  if (lang === 'en') langToUse = en;
  if (lang === 'es') langToUse = es;

  return sortedCountries(getCountries(), langToUse, CountryNumber).map(
    country => {
      if (country) {
        switch (listToReturn.length) {
          case 1:
            return {
              [listToReturn[0]]: country.value,
            };
          case 2:
            return {
              [listToReturn[0]]: country[listToReturn[0]],
              [listToReturn[1]]: country[listToReturn[1]],
            };
          case 3:
            return {
              [listToReturn[0]]: country[listToReturn[0]],
              [listToReturn[1]]: country[listToReturn[1]],
              [listToReturn[2]]: country[listToReturn[2]],
            };
        }
      } else {
        return null;
      }
    }
  );
};
