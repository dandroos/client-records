import { Cancel, CheckCircle, Delete } from "@mui/icons-material"
import { DesktopDatePicker } from "@mui/lab"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { child, get, ref, remove, set } from "firebase/database"
import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { db } from "../../firebase"
import { setDialogs, setToast } from "../../redux/store"

const Edit = ({ dispatch, open, id }) => {
  const fieldDefaults = {
    firstName: "",
    secondName: "",
    email: "",
    dob: "",
    phone: "",
    membership: "",
  }
  const [fields, setFields] = useState(fieldDefaults)
  const [originalState, setOriginalState] = useState()

  useEffect(() => {
    if (open) {
      get(child(ref(db), "clients/" + id))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setOriginalState(snapshot.val())
            setFields(snapshot.val())
          } else {
            console.log("No data available")
          }
        })
        .catch((err) => console.log(err))
    }
    //eslint-disable-next-line
  }, [open])

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (JSON.stringify(fields) !== JSON.stringify(originalState)) {
      set(ref(db, "clients/" + id), {
        ...fields,
        dateModified: new Date().getTime(),
      })
        .then(() => {
          dispatch(
            setToast({
              isOpen: true,
              severity: "success",
              msg: "Successfully updated!",
            })
          )
          handleClose()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const firstNameRef = useRef(null)

  const handleClose = () => {
    dispatch(setDialogs({ edit: { open: false, id } }))
  }

  const handleClick = () => {
    dispatch(
      setDialogs({
        confirm: {
          open: true,
          title: "Confirm delete",
          msg: "Are you sure?",
          proceed: () => {
            remove(ref(db, "clients/" + id))
          },
        },
      })
    )
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionProps={{
        onExited: () =>
          dispatch(setDialogs({ edit: { open: false, id: null } })),
      }}
    >
      <>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Typography variant="h4" variantMapping={{ h4: "h2" }} gutterBottom>
              Edit Client
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="First name"
                  autoFocus
                  ref={firstNameRef}
                  id="firstName"
                  type="text"
                  placeholder="Joe"
                  onChange={handleChange}
                  value={fields.firstName}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Second name"
                  id="secondName"
                  type="text"
                  placeholder="Bloggs"
                  onChange={handleChange}
                  value={fields.secondName}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="joebloggs@mail.com"
                  onChange={handleChange}
                  value={fields.email}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DesktopDatePicker
                  label="Date of Birth"
                  id="dob"
                  onChange={(newValue) => {
                    setFields({ ...fields, dob: newValue.toString() })
                  }}
                  value={new Date(fields.dob)}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Phone"
                  type="tel"
                  id="phone"
                  onChange={handleChange}
                  value={fields.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="membership-label">Membership Plan</InputLabel>
                  <Select
                    labelId="membership-label"
                    label="Membership Plan"
                    id="membership"
                    value={fields.membership}
                    onChange={(e) => {
                      setFields({ ...fields, membership: e.target.value })
                    }}
                    required
                  >
                    <ListSubheader>Paid plans</ListSubheader>
                    <MenuItem value="Gold">Gold</MenuItem>
                    <MenuItem value="Silver">Silver</MenuItem>
                    <MenuItem value="Bronze">Bronze</MenuItem>
                    <ListSubheader>Free plan</ListSubheader>
                    <MenuItem value="Starter">Starter</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="error"
                  fullWidth
                  startIcon={<Delete />}
                  onClick={handleClick}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose} startIcon={<Cancel />}>
              Cancel
            </Button>
            <Button
              color="success"
              disabled={
                JSON.stringify(fields) === JSON.stringify(originalState)
              }
              startIcon={<CheckCircle />}
              type="submit"
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  open: state.dialogs.edit.open,
  id: state.dialogs.edit.id,
})

export default connect(mapStateToProps)(Edit)
