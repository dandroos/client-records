import { Cancel, CheckCircle } from "@mui/icons-material"
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
import { child, push, ref, set } from "firebase/database"
import React, { useRef, useState } from "react"
import { connect } from "react-redux"
import { db } from "../../firebase"
import { setDialogs, setToast } from "../../redux/store"

const Add = ({ dispatch, open }) => {
  const fieldDefaults = {
    firstName: "",
    secondName: "",
    email: "",
    dob: null,
    phone: "",
    membership: "",
  }
  const [fields, setFields] = useState(fieldDefaults)

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const key = push(child(ref(db), "clients")).key
    set(ref(db, "clients/" + key), {
      ...fields,
      id: key,
      dateAdded: new Date().getTime(),
      dateModified: new Date().getTime(),
    })
      .then(() => {
        dispatch(
          setToast({
            isOpen: true,
            msg: `Successfully added ${fields.firstName} ${fields.secondName}!`,
          })
        )
        setFields(fieldDefaults)
        firstNameRef.current.focus()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const firstNameRef = useRef(null)

  const handleClose = () => {
    dispatch(setDialogs({ add: { open: false } }))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionProps={{ onExited: () => setFields(fieldDefaults) }}
      fullWidth
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="h4" variantMapping={{ h4: "h2" }} gutterBottom>
            Add Client
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                autoFocus
                label="First name"
                inputRef={firstNameRef}
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
                onChange={(newValue) =>
                  setFields({
                    ...fields,
                    dob: newValue.toString(),
                  })
                }
                value={fields.dob}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button color="success" type="submit" startIcon={<CheckCircle />}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  open: state.dialogs.add.open,
})

export default connect(mapStateToProps)(Add)
