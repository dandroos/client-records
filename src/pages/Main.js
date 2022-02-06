import { signInWithEmailAndPassword } from "firebase/auth"
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"

const Main = () => {
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
        navigate("/clients")
      })
      .catch((err) => {
        console.log(err)
        userRef.current.focus()
      })
  }

  const userRef = useRef(null)

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          ref={userRef}
          id="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={fields.password}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Main
