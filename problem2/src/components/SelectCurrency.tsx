import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { CURRENCIES, Currency } from "@/constant"
import { Box } from "@mui/material"
import { useState } from "react"

type SelectCurrencyProps = {
  label?: string
  value?: Currency | null
  defaultValue?: Currency
  disabled?: boolean
  setData?: (data: Currency | null) => void
}

const SelectCurrency = ({
  label,
  defaultValue,
  setData,
  value: _value,
  disabled
}: SelectCurrencyProps) => {
  const [value, setValue] = useState<Currency | null>(defaultValue || null)
  const selectValue = _value ?? value

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1.5}
    >
      <Autocomplete
        disabled={disabled}
        value={selectValue}
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
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${option.currency}.svg?raw=true`}
                alt=""
              />
              {option.currency}
            </Box>
          )
        }}
        renderInput={(params) => (
          <TextField
            error={!selectValue}
            helperText={!selectValue ? "Please select currency" : null}
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
