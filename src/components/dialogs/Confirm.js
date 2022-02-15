import { Portal } from "@mui/base"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import React from "react"
import { connect } from "react-redux"
import { setDialogs } from "../../redux/store"

const Confirm = ({ dispatch, open, title, msg, proceed, confirm }) => {
  const handleClose = () => {
    dispatch(setDialogs({ confirm: { ...confirm, open: false } }))
  }

  return (
    <Portal>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionProps={{
          onExited: () =>
            dispatch(
              setDialogs({
                confirm: { ...confirm, title: "", msg: "", proceed: null },
              })
            ),
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{msg}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            id="yes"
            onClick={() => {
              proceed()
              handleClose()
            }}
          >
            Yes
          </Button>
          <Button color="error" onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Portal>
  )
}

const mapStateToProps = (state) => ({
  open: state.dialogs.confirm.open,
  title: state.dialogs.confirm.title,
  msg: state.dialogs.confirm.msg,
  proceed: state.dialogs.confirm.proceed,
  confirm: state.dialogs.confirm,
})

export default connect(mapStateToProps)(Confirm)
