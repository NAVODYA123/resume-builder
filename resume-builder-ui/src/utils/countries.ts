import type { CountryOption } from "@/types/countries.types";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

countries.registerLocale(en);

export const countryOptions: CountryOption[] = getCountries()
  .map((code) => ({
    code,
    name: countries.getName(code, "en") || code,
    dialCode: `+${getCountryCallingCode(code)}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
