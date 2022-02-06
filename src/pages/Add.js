import { child, push, ref, set } from "firebase/database"
import React, { useRef, useState } from "react"
import { db } from "../firebase"

const Add = () => {
  const fieldDefaults = {
    firstName: "",
    secondName: "",
    email: "",
    dob: "",
    phone: "",
    membership: "Starter",
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
    console.log(key)
    set(ref(db, "clients/" + key), {
      ...fields,
      id: key,
      dateAdded: new Date().getTime(),
      dateModified: new Date().getTime(),
    })
      .then(() => {
        setFields(fieldDefaults)
        firstNameRef.current.focus()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const firstNameRef = useRef(null)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name</label>
        <input
          autoFocus
          ref={firstNameRef}
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
        <label htmlFor="phone">Phone</label>
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
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}

export default Add
