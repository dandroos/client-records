import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import {
  //   sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth"
import React, { useRef, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import PageWrapper from "../components/PageWrapper"
import { auth } from "../firebase"
import { setDialogs, setToast } from "../redux/store"

const Login = ({ dispatch }) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    })
  }
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, fields.email, fields.password)
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        if (
          err.message.indexOf("wrong-password") > -1 ||
          err.message.indexOf("not-found") > -1
        ) {
          dispatch(
            setToast({
              isOpen: true,
              msg: "Please check your login credentials and try again.",
              severity: "error",
            })
          )
        } else {
          dispatch(
            setToast({
              isOpen: true,
              msg: "There was a problem logging you in. Please try again later.",
              severity: "error",
            })
          )
        }
        userRef.current.focus()
      })
  }

  const userRef = useRef(null)

  return (
    <PageWrapper>
      <Typography variant="h4" variantMapping={{ h4: "h2" }} gutterBottom>
        Log in
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              id="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              required
              inputRef={userRef}
              autoFocus
              InputLabelProps={{ required: false }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              type="password"
              id="password"
              value={fields.password}
              onChange={handleChange}
              required
              InputLabelProps={{ required: false }}
            />
          </Grid>
          <Grid item xs={12}>
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() =>
                dispatch(
                  setDialogs({
                    confirm: {
                      open: true,
                      title: "Reset password",
                      msg: "Would you like to reset your password? (This is disabled)",
                      proceed: () => console.log("Password reset request made"),
                      // sendPasswordResetEmail(auth, "test@mail.com"),
                    },
                  })
                )
              }
            >
              Forgotten your password?
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit">
              Log in
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="caption" display="block">
              <strong>DEMO APP</strong>
            </Typography>
            <Typography align="center" variant="caption" display="block">
              If you want to try it out, you can log in with the email
              "test@mail.com" and password "test1234".
            </Typography>
          </Grid>
        </Grid>
      </form>
    </PageWrapper>
  )
}

export default connect()(Login)
