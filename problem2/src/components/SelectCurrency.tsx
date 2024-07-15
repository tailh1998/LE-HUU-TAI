import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { CURRENCIES, Currency } from "@/constant"
import { Box } from "@mui/material"
import { useState } from "react"

type SelectCurrencyProps = {
  label?: string
  value?: Currency | null
  defaultValue?: Currency
  setData?: (data: Currency | null) => void
}

const SelectCurrency = ({ label, defaultValue, setData, value: _value }: SelectCurrencyProps) => {
  const [value, setValue] = useState<Currency | null>(defaultValue || null)

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1.5}
    >
      <Autocomplete
        value={_value ?? value}
        onChange={(_, newValue) => {
          setValue(newValue)
          setData?.(newValue)
        }}
        options={CURRENCIES}
        autoHighlight
        getOptionLabel={(option) => option.currency}
        renderOption={(props, option) => {
          return (
            <Box
              key={`${option.currency}`}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/65c7313a57660dbd3244d8a4d090e0af647e6532/tokens/${option.currency}.svg?raw=true`}
                alt=""
              />
              {option.currency}
            </Box>
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password" // disable autocomplete and autofill
            }}
          />
        )}
      />
    </Box>
  )
}

export default SelectCurrency
