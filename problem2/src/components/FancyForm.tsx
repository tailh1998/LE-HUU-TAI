import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import CurrencySelect from "./SelectCurrency"
import { useEffect, useMemo, useState } from "react"
import { CURRENCIES, Currency } from "@/constant"

const CurrencySwapForm = () => {
  const [from, setFrom] = useState<Currency | null>(CURRENCIES[0])
  const [to, setTo] = useState<Currency | null>(CURRENCIES[5])
  const [disable, setDisable] = useState(false)
  const [amount, setAmount] = useState("")

  const receive = useMemo(() => {
    if (from?.price && to?.price) {
      return (Number(amount) / from?.price) * to?.price
    }
    return ""
  }, [amount, from?.price, to?.price])

  const rate = useMemo(() => {
    if (from?.price && to?.price) {
      return (1 / from.price) * to.price
    }
    return ""
  }, [from?.price, to?.price])

  useEffect(() => {
    if (!from?.id || !to?.id) {
      setDisable(true)
      setAmount("")
    } else {
      setDisable(false)
    }
  }, [from?.id, to?.id])

  return (
    <Box
      action=""
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "max-content",
        width: "500px",
        margin: "0 auto",
        padding: "16px",
        border: "0.5px solid #ccc",
        borderRadius: "8px",
        boxShadow: "2px 2px 12px rgba(0,0,0,0.1)"
      }}
    >
      <TextField
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        inputMode="numeric"
        label="Pay"
        disabled={disable}
      />
      <CurrencySelect
        value={from}
        setData={setFrom}
        label="From"
      />
      <CurrencySelect
        value={to}
        setData={setTo}
        label="To"
      />
      <TextField
        value={receive}
        label="Receive"
        disabled
      />
      {from && to && (
        <Box>
          <Typography
            fontWeight="bold"
            gutterBottom={false}
          >
            Current Rates:
          </Typography>
          <Grid container>
            <Grid
              item
              xs={2}
            >
              {`1 ${from.currency} =`}
            </Grid>
            <Grid
              item
              xs={10}
            >
              {` $${from.price}`}
            </Grid>
            <Grid
              item
              xs={2}
            >
              {`1 ${to.currency} =`}
            </Grid>
            <Grid
              item
              xs={10}
            >
              {` $${to.price}`}
            </Grid>
          </Grid>
        </Box>
      )}
      {from && to && amount && (
        <Box>
          <Typography
            fontWeight="bold"
            gutterBottom={false}
          >
            Receive:
          </Typography>
          <Typography>{"1 " + from?.currency + " = " + rate + " " + to?.currency}</Typography>
        </Box>
      )}

      <Button variant="contained">Trade</Button>
    </Box>
  )
}

export default CurrencySwapForm
