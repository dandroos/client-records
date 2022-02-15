import { LocalizationProvider } from "@mui/lab"
import AdapterMoment from "@mui/lab/AdapterMoment"
import { Box, Container, Toolbar, useMediaQuery, useTheme } from "@mui/material"
import { onAuthStateChanged } from "firebase/auth"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Toast from "./components/Toast"
import { auth, db } from "./firebase"
import { setClients, setIsMobile } from "./redux/store"
import FontFaceObserver from "fontfaceobserver"
import { onValue, ref } from "firebase/database"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Dialogs from "./components/Dialogs"
import Footer from "./components/Footer"

function App({ dispatch }) {
  const [authenticated, setAuthenticated] = useState(undefined)
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    })
    const dbRef = ref(db, "clients/")
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const arr = []
      for (let record in data) {
        arr.push(data[record])
      }
      dispatch(setClients(arr))
    })
    const loadFont = () => {
      var font = new FontFaceObserver("Futura PT")

      font.load().then(function () {
        //font loaded successfully
        setFontLoaded(true)
      }, loadFont)
    }
    loadFont()
    return () => {
      unsubscribe()
      unsubscribeAuth()
    }
    //eslint-disable-next-line
  }, [])

  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  return (
    typeof authenticated !== "undefined" &&
    fontLoaded && (
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Dialogs />
          <Toast />
          <Header authenticated={authenticated} />
          <Box
            pb={2}
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Toolbar />
              <AnimatePresence exitBeforeEnter>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Box component="main" mt={1} py={2}>
                    <Container>
                      <Routes>
                        <Route
                          path="/"
                          element={
                            authenticated ? (
                              <Dashboard />
                            ) : (
                              <Navigate to="/login" />
                            )
                          }
                        />
                        <Route
                          path="/login"
                          element={
                            authenticated ? <Navigate to="/" /> : <Login />
                          }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </Container>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
            <Footer />
          </Box>
        </LocalizationProvider>
      </BrowserRouter>
    )
  )
}

export default connect()(App)
