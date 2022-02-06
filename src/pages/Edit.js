import { child, get, ref, set } from "firebase/database"
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { db } from "../firebase"

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const fieldDefaults = {
    firstName: "",
    secondName: "",
    email: "",
    dob: "",
    phone: "",
    membership: "bronze",
  }
  const [fields, setFields] = useState(fieldDefaults)

  useEffect(() => {
    get(child(ref(db), "clients/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFields(snapshot.val())
        } else {
          console.log("No data available")
        }
      })
      .catch((err) => console.log(err))
    //eslint-disable-next-line
  }, [])

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // const key = push(child(ref(db), "clients")).key
    // console.log(key)
    set(ref(db, "clients/" + id), fields)
      .then(() => {
        navigate(`/profile/${id}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <h2>Edit Client</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name</label>
        <input
          autoFocus
          id="firstName"
          type="text"
          placeholder="Joe"
          onChange={handleChange}
          value={fields.firstName}
          required
        />
        <label htmlFor="secondName">Second name</label>
        <input
          id="secondName"
          type="text"
          placeholder="Bloggs"
          onChange={handleChange}
          value={fields.secondName}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="joebloggs@mail.com"
          onChange={handleChange}
          value={fields.email}
          required
        />
        <label htmlFor="dob">Date of birth</label>
        <input
          type="date"
          id="dob"
          onChange={handleChange}
          value={fields.dob}
        />
        <input
          type="tel"
          id="phone"
          onChange={handleChange}
          value={fields.phone}
          required
        />
        <select
          id="membership"
          value={fields.membership}
          onChange={handleChange}
        >
          <optgroup label="Paid plans">
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </optgroup>
          <optgroup label="Free plan">
            <option value="Hobby">Hobby</option>
            <option value="Starter">Starter</option>
          </optgroup>
        </select>
        <input type="submit" value="Update" />
      </form>
      <Link to={`/profile/${id}`}>Back to profile</Link>
    </div>
  )
}

export default Edit
