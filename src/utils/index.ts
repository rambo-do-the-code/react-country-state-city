import {
  City,
  Country,
  CountryState,
  CountryStateCity,
  Language,
  Phonecodes,
  Region,
  State,
} from "../types";

// Import dữ liệu từ các file JSON local
import regionsData from "../data/regionsminified.json";
import countriesData from "../data/countriesminified.json";
import languagesData from "../data/languagesminified.json";
import statesData from "../data/statesminified.json";
import citiesData from "../data/citiesminified.json";

// Lấy danh sách các khu vực (regions)
export const GetRegions = async (): Promise<Region[] | []> => {
  return regionsData as unknown as Array<Region>;
};

// Lấy mã điện thoại theo khu vực (region)
export const GetPhonecodesByRegion = async (
  _region: string
): Promise<Phonecodes[] | []> => {
  let filtered = countriesData as Array<Phonecodes>;
  if (_region) {
    filtered = filtered.filter(
      (country: Phonecodes) => country.region === _region
    );
  }
  return filtered.map((item) => ({
    id: item.id,
    name: item.name,
    phone_code: item.phone_code,
    region: item.region,
  }));
};

// Lấy tất cả mã điện thoại
export const GetPhonecodes = async (): Promise<Phonecodes[] | []> => {
  const filtered = countriesData as Array<Phonecodes>;
  return filtered.map((item) => ({
    id: item.id,
    name: item.name,
    phone_code: item.phone_code,
    region: item.region,
  }));
};

// Lấy danh sách các quốc gia theo khu vực (region)
export const GetCountriesByRegion = async (
  _region: string
): Promise<Country[] | []> => {
  let filtered = countriesData as Array<Country>;
  if (_region) {
    filtered = filtered.filter(
      (country: Country) => country.region === _region
    );
  }
  return filtered;
};

// Lấy danh sách tất cả các quốc gia
export const GetCountries = async (): Promise<Country[] | []> => {
  return countriesData as Array<Country>;
};

// Lấy danh sách các ngôn ngữ
export const GetLanguages = async (): Promise<Language[] | []> => {
  return languagesData as Array<Language>;
};

// Lấy danh sách các bang (states) dựa trên ID quốc gia
export const GetState = async (id: number): Promise<Array<State> | []> => {
  const record = statesData as Array<CountryState>;
  const statesone = record.find((e: CountryState) => e.id === id);
  return statesone && statesone.states ? statesone.states : [];
};

// Lấy danh sách các thành phố (cities) dựa trên ID quốc gia và ID bang
export const GetCity = async (
  countryid: number,
  stateid: number
): Promise<Array<City> | []> => {
  const record = citiesData as Array<CountryStateCity>;
  const country = record.find((e: CountryStateCity) => e.id === countryid);
  if (country) {
    const state = country.states.find((e) => e.id === stateid);
    return state && state.cities ? state.cities : [];
  }
  return [];
};

// Lấy danh sách tất cả các thành phố (cities)
export const GetAllCities = async (): Promise<Array<City> | []> => {
  const record = citiesData as Array<CountryStateCity>;
  const allCities: Array<City> = [];
  for (const country of record) {
    for (const state of country.states) {
      allCities.push(...state.cities);
    }
  }
  return allCities;
};
