import { signOut } from "firebase/auth"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"

const Header = ({ authenticated }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <nav>
      <h1>Clients</h1>
      {authenticated ? (
        <>
          <Link to="/clients">View clients</Link>
          <Link to="/add">Add client</Link>
          <button onClick={handleClick}>Signout</button>
        </>
      ) : null}
    </nav>
  )
}

export default Header
