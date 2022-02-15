import { Add } from "@mui/icons-material"
import { Fab } from "@mui/material"
import React from "react"
import { connect } from "react-redux"
import { setDialogs } from "../redux/store"

const AddFab = ({ dispatch }) => {
  return (
    <Fab
      variant="extended"
      color="primary"
      sx={{
        position: "fixed",
        bottom: 15,
        right: 15,
      }}
      onClick={() => dispatch(setDialogs({ add: { open: true } }))}
    >
      <Add sx={{ mr: 1 }} />
      Add
    </Fab>
  )
}

export default connect()(AddFab)
