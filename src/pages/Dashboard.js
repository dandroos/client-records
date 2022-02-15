import { Add, Edit, Person, Search } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import AddFab from "../components/AddFab"
import PageWrapper from "../components/PageWrapper"
import { setDialogs } from "../redux/store"

const Dashboard = ({ dispatch, clients }) => {
  const [clientQuery, setClientQuery] = useState(clients)
  const [searchField, setSearchField] = useState("")

  useEffect(() => {
    if (searchField.length > 0) {
      //search
      const arr = clients.filter((i) => {
        if (i.firstName.toLowerCase().indexOf(searchField.toLowerCase()) > -1) {
          return i
        }
        if (
          i.secondName.toLowerCase().indexOf(searchField.toLowerCase()) > -1
        ) {
          return i
        }
        if (i.email.toLowerCase().indexOf(searchField.toLowerCase()) > -1) {
          return i
        }
        return null
      })
      setClientQuery(arr)
    } else {
      setClientQuery(clients)
    }
    //eslint-disable-next-line
  }, [searchField])

  useEffect(() => {
    setClientQuery(clients)
  }, [clients])

  const theme = useTheme()

  return (
    <PageWrapper containerWidth="sm">
      <AddFab />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" variantMapping={{ h4: "h2" }}>
            Client Directory
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Showing {clientQuery.length} of {clients.length} records
          </Typography>
        </Box>
        <Button
          color="error"
          size="small"
          startIcon={<Add />}
          onClick={() =>
            dispatch(
              setDialogs({
                add: {
                  open: true,
                },
              })
            )
          }
        >
          Add
        </Button>
      </Box>
      <TextField
        value={searchField}
        size="small"
        autoFocus
        fullWidth
        placeholder="Enter search query..."
        onChange={(e) => setSearchField(e.target.value)}
        sx={{ mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      {clientQuery.map((i, ind) => (
        <Card key={ind} sx={{ mb: 1 }}>
          <CardActionArea
            onClick={() =>
              dispatch(setDialogs({ profile: { open: true, id: i.id } }))
            }
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignContent="center"
              >
                <Typography variant="h5">{`${i.firstName} ${i.secondName}`}</Typography>
                <Tooltip title={`${i.membership} membership`}>
                  <Avatar
                    sx={{
                      color: theme.palette.common.white,
                      backgroundColor: (() => {
                        switch (i.membership) {
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
                      height: 35,
                      width: 35,
                    }}
                  >
                    <Person />
                  </Avatar>
                </Tooltip>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List disablePadding dense sx={{ display: "flex" }}>
                <ListItem>
                  <ListItemText
                    primary="Age"
                    secondary={`${moment(moment.now()).diff(
                      moment(new Date(i.dob)),
                      "years"
                    )} years old`}
                  />
                </ListItem>
                <ListItem sx={{ textAlign: "right" }}>
                  <ListItemText primary="Membership" secondary={i.membership} />
                </ListItem>
              </List>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              color="success"
              startIcon={<Search />}
              onClick={() =>
                dispatch(setDialogs({ profile: { open: true, id: i.id } }))
              }
            >
              View
            </Button>
            <Button
              color="info"
              startIcon={<Edit />}
              onClick={() =>
                dispatch(setDialogs({ edit: { open: true, id: i.id } }))
              }
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}
    </PageWrapper>
  )
}

const mapStateToProps = (state) => ({
  clients: state.clients,
})

export default connect(mapStateToProps)(Dashboard)
