import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import { auth } from "./firebase"
import Add from "./pages/Add"
import Clients from "./pages/Clients"
import Edit from "./pages/Edit"
import Main from "./pages/Main"
import Profile from "./pages/Profile"

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <BrowserRouter>
      <Header authenticated={authenticated} />
      <Routes>
        <Route
          path="/"
          element={authenticated ? <Navigate to="/clients" /> : <Main />}
        />
        <Route
          path="/clients"
          element={authenticated ? <Clients /> : <Navigate to="/" />}
        />
        <Route
          path="/add"
          element={authenticated ? <Add /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:id"
          element={authenticated ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/edit/:id"
          element={authenticated ? <Edit /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
