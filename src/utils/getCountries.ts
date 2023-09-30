import {
	getCountries,
	getCountryCallingCode,
	Country,
} from "react-phone-number-input";
import es from "react-phone-number-input/locale/es.json";
import en from "react-phone-number-input/locale/en.json";

export const sortedCountries = (
	countries: Country[],
	labels: Record<string, string>,
	CountryNumber: number
) => {
	// Aquí ordenamos los países por orden alfabético
	// y firstCountry va de primero
	const listOfCountries: lstCountries[] = [];
	countries.forEach((country: Country) => {
		listOfCountries.push({
			name: labels[country],
			nameCodeNumber: `${labels[country]} +${getCountryCallingCode(country)}`,
			codeNumber: parseInt(getCountryCallingCode(country)),
		});
	});

	// firstCountry first
	const firstCountry = listOfCountries.find(
		(country) => country.codeNumber === CountryNumber
	);

	const filteredCountries = listOfCountries.filter(
		(country) => country.codeNumber !== CountryNumber
	);

	// Ordenar sin Lodash
	const sortedCountries = filteredCountries.sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});

	if (firstCountry) sortedCountries.unshift(firstCountry);

	return sortedCountries;
};

type lstCountries = {
	name: string;
	codeNumber: number;
	nameCodeNumber: string;
};

export type PropsList =
	| ["name"]
	| ["name", "codeNumber"]
	| ["nameCodeNumber", "codeNumber"]
	| ["name", "codeNumber", "nameCodeNumber"];

export const listCountriesCodes = (
	listToReturn: PropsList,
	CountryNumber = 506,
	lang: "es" | "en"
) => {
	let langToUse = es;
	if (lang === "en") langToUse = en;
	if (lang === "es") langToUse = es;

	return sortedCountries(getCountries(), langToUse, CountryNumber).map(
		(country) => {
			if (country) {
				switch (listToReturn.length) {
					case 1:
						return {
							[listToReturn[0]]: country.nameCodeNumber,
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
			}else{
        return {}
      }
		}
	);
};
