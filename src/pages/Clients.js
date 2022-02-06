import { onValue, ref, remove } from "firebase/database"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../firebase"

const Clients = () => {
  const [clients, setClients] = useState([])
  useEffect(() => {
    const dbRef = ref(db, "clients/")
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const arr = []
      for (let record in data) {
        arr.push(data[record])
      }
      setClients(arr)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const handleClick = (e) => {
    remove(ref(db, "clients/" + e.target.id))
  }

  return (
    <div>
      <ul>
        {clients.map((i, ind) => (
          <li key={ind}>
            {`${i.firstName} ${i.secondName}`}
            {` `}
            <Link to={`/profile/${i.id}`}>View</Link>
            <Link to={`/edit/${i.id}`} id={i.id}>
              Edit
            </Link>
            <button id={i.id} onClick={handleClick}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Clients
