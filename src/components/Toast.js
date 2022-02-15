import { Alert, Snackbar } from "@mui/material"
import React from "react"
import { connect } from "react-redux"
import { setToast } from "../redux/store"

const Toast = ({ dispatch, toast, isOpen, msg, severity }) => {
  const handleClose = () => {
    dispatch(setToast({ ...toast, isOpen: false }))
  }

  return (
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={5000}
      TransitionProps={{
        onExited: () => {
          dispatch(setToast({ ...toast, msg: "" }))
        },
      }}
    >
      <Alert variant="filled" severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  )
}

const mapStateToProps = (state) => ({
  toast: state.toast,
  isOpen: state.toast.isOpen,
  msg: state.toast.msg,
  severity: state.toast.severity,
})

export default connect(mapStateToProps)(Toast)
