import { Logout } from "@mui/icons-material"
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material"
import { signOut } from "firebase/auth"
import React from "react"
import { connect } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { auth } from "../firebase"

const Header = ({ isMobile, authenticated }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h5"
            variantMapping={{ h5: "h1" }}
            sx={{ cursor: "pointer", color: "inherit", textDecoration: "none" }}
            component={NavLink}
            to="/"
          >
            My Clients
          </Typography>
          <Box flexGrow={1} />
          {authenticated && (
            <>
              {isMobile ? (
                <Tooltip title="Sign out">
                  <IconButton edge="end" color="inherit" onClick={handleClick}>
                    <Logout />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleClick}
                  startIcon={<Logout />}
                >
                  Sign out
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

const mapStateToProps = (state) => ({ isMobile: state.isMobile })

export default connect(mapStateToProps)(Header)
