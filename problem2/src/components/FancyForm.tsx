import { ReactNode, useEffect, useMemo, useState } from "react"
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import CurrencySelect from "./SelectCurrency"
import { CURRENCIES, Currency } from "@/constant"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import CircularProgress from "@mui/material/CircularProgress"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import toast from "react-hot-toast"
import ConfirmDialog from "./ConfirmDialog"

const FormWrapper = ({ children }: { children: ReactNode }) => (
  <Box
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
    {children}
  </Box>
)

const FancyForm = () => {
  const [from, setFrom] = useState<Currency | null>(CURRENCIES[0])
  const [to, setTo] = useState<Currency | null>(CURRENCIES[5])
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(false)
  const [amount, setAmount] = useState("")
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

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

  const tradeInfo = `${amount} ${from?.currency} to ${receive} ${to?.currency}`

  const handleChangeCurrency = () => {
    if (to && from) {
      setFrom(to)
      setTo(from)
    }
  }

  const handleTrade = () => {
    if (amount && from && to) {
      handleCloseDialog()
      setLoading(true)
      setTimeout(() => {
        reset()
        setLoading(false)
        toast.success("You have successfully converted your currencies!")
      }, 2_000)
    }
  }

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false)
  }

  const handleOpenDialog = () => {
    setOpenConfirmDialog(true)
  }

  const reset = () => {
    setFrom(CURRENCIES[0])
    setTo(CURRENCIES[5])
    setAmount("")
  }

  useEffect(() => {
    if (!from?.id || !to?.id) {
      setDisable(true)
      setAmount("")
    } else {
      setDisable(false)
    }
  }, [from?.id, to?.id])

  return (
    <FormWrapper>
      <Typography variant="h5">Currency Converter</Typography>
      <TextField
        value={amount}
        helperText={!amount ? "Please input your pay if you want to trade" : null}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        inputMode="numeric"
        label="Amount"
        disabled={disable || loading}
      />
      <Box
        display="flex"
        alignContent="center"
        gap={2}
      >
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <CurrencySelect
            disabled={loading}
            value={from}
            setData={setFrom}
            label="From"
          />
          <CurrencySelect
            disabled={loading}
            value={to}
            setData={setTo}
            label="To"
          />
        </Box>
        <Box display="flex">
          <IconButton
            disabled={!to || !from || loading}
            sx={{ margin: "auto" }}
            color="primary"
            aria-label="Change Currency"
            onClick={handleChangeCurrency}
          >
            <SwapVertIcon />
          </IconButton>
        </Box>
      </Box>
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
            Reference Price:
          </Typography>
          <Typography>{"1 " + from?.currency + " = " + rate + " " + to?.currency}</Typography>
        </Box>
      )}

      <Button
        disabled={!from || !to || !amount || loading}
        startIcon={loading ? <CircularProgress size={20} /> : <CurrencyExchangeIcon />}
        variant="outlined"
        onClick={handleOpenDialog}
      >
        Trade
      </Button>
      <ConfirmDialog
        desc={tradeInfo}
        save={handleTrade}
        open={openConfirmDialog}
        close={handleCloseDialog}
      />
    </FormWrapper>
  )
}

export default FancyForm
