import { Autocomplete, Stack, TextField } from "@mui/material";

import ReactCountryFlag from "react-country-flag";

import { countryOptions } from "@/utils/countries";
import type { CountryOption } from "@/types/countries.types";

interface PhoneInputProps {
  country: CountryOption | null;
  phone: string;
  onCountryChange: (country: CountryOption | null) => void;
  onPhoneChange: (phone: string) => void;
}

export const PhoneInput = ({
  country,
  phone,
  onCountryChange,
  onPhoneChange,
}: PhoneInputProps) => {
  return (
    <Stack direction="row" spacing={1}>
      <Autocomplete
        options={countryOptions}
        value={country}
        onChange={(_, value) => onCountryChange(value)}
        getOptionLabel={(option) => `${option.name} (${option.dialCode})`}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        renderOption={(props, option) => (
          <li {...props} key={option.code}>
            <Stack>
              <ReactCountryFlag countryCode={option.code} svg />
              {option.name} ({option.dialCode})
            </Stack>
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Country" />}
        sx={{ width: 190 }}
      />

      <TextField
        fullWidth
        label="Phone number"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
      />
    </Stack>
  );
};
