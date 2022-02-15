import { Cancel, Edit, Email, Person, Phone } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import { child, get, ref } from "firebase/database"
import moment from "moment"
import "moment/locale/en-gb"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { db } from "../../firebase"
import { setDialogs } from "../../redux/store"

const Profile = ({ dispatch, isMobile, open, id }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    if (open) {
      get(child(ref(db), "clients/" + id))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val())
          } else {
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    //eslint-disable-next-line
  }, [open])

  const theme = useTheme()

  const handleClose = () => {
    dispatch(setDialogs({ profile: { open: false, id } }))
  }

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      TransitionProps={{
        onExited: () =>
          dispatch(setDialogs({ profile: { open: false, id: null } })),
      }}
    >
      {user && (
        <>
          <DialogContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection={isMobile ? "column" : "row"}
            >
              <Typography
                variant="h5"
                variantMapping={{ h4: "h2" }}
                gutterBottom
              >{`${user.firstName} ${user.secondName}`}</Typography>
              <Tooltip title={`${user.membership} membership`}>
                <Avatar
                  sx={{
                    color: theme.palette.common.white,
                    backgroundColor: (() => {
                      switch (user.membership) {
                        case "Gold":
                          return "#ffd700"
                        case "Silver":
                          return "#c0c0c0"
                        case "Bronze":
                          return "#cd7f32"
                        case "Starter":
                          return "#444"
                        default:
                          return undefined
                      }
                    })(),
                  }}
                >
                  <Person />
                </Avatar>
              </Tooltip>
            </Box>
            <List>
              <ListItem
                secondaryAction={
                  <Tooltip title="Send email">
                    <IconButton component="a" href={`mailto:${user.email}`}>
                      <Email />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              <ListItem
                secondaryAction={
                  <Tooltip title="Call">
                    <IconButton component="a" href={`tel:${user.phone}`}>
                      <Phone />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText primary="Telephone" secondary={user.phone} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Date of Birth"
                  secondary={`${moment(new Date(user.dob)).format(
                    "LL"
                  )} (${moment(moment.now()).diff(
                    moment(new Date(user.dob)),
                    "years"
                  )} years old)`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Membership Plan"
                  secondary={user.membership}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Date joined"
                  secondary={moment(new Date(user.dateAdded)).format("LL")}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Last modified"
                  secondary={moment(new Date(user.dateModified)).format("LL")}
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button color="error" startIcon={<Cancel />} onClick={handleClose}>
              Close
            </Button>
            <Button
              color="info"
              startIcon={<Edit />}
              onClick={() => {
                handleClose()
                dispatch(setDialogs({ edit: { open: true, id: user.id } }))
              }}
            >
              Edit
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  open: state.dialogs.profile.open,
  id: state.dialogs.profile.id,
})

export default connect(mapStateToProps)(Profile)
