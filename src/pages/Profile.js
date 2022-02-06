import { child, get, ref } from "firebase/database"
import moment from "moment"
import "moment/locale/en-gb"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { db } from "../firebase"

const Profile = () => {
  const { id } = useParams()
  const [user, setUser] = useState()
  useEffect(() => {
    get(child(ref(db), "clients/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val())
        } else {
          console.log("no data available")
        }
      })
      .catch((err) => {
        console.log(err)
      })
    //eslint-disable-next-line
  }, [])
  return (
    <div>
      {user && (
        <>
          <h2>{`${user.firstName} ${user.secondName}`}</h2>
          <ul>
            <li>
              <strong>Email: </strong>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </li>
            <li>
              <strong>Telephone: </strong>
              {user.phone}
            </li>
            <li>
              <strong>Date of birth: </strong>
              {moment(user.dob).format("LL")} (
              {moment(moment.now()).diff(moment(user.dob), "years")} years old)
            </li>
            <li>
              <strong>Membership plan: </strong>
              {user.membership}
            </li>
            <li>
              <strong>Date joined: </strong>
              {moment(user.dateAdded).format("LL")}
            </li>
            <li>
              <strong>Last modified: </strong>
              {moment(user.dateModified).format("LL")}
            </li>
          </ul>
          <Link to="/clients">Back to clients</Link>
          <Link to={`/edit/${id}`}>Edit profile</Link>
        </>
      )}
    </div>
  )
}

export default Profile
