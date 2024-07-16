import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material"

type ConfirmDialogProps = {
  save: VoidFunction
  close: VoidFunction
  open: boolean
  desc?: string
}

const ConfirmDialog = ({ save, close, open, desc }: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to convert the currencies?
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          fontWeight="bold"
          textAlign="center"
          id="alert-dialog-description"
        >
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={save}
          autoFocus
        >
          Agree
        </Button>
        <Button onClick={close}>Disagree</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
