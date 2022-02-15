import React from "react"
import Add from "./dialogs/Add"
import Profile from "./dialogs/Profile"
import Edit from "./dialogs/Edit"
import Confirm from "./dialogs/Confirm"

const Dialogs = () => {
  return (
    <>
      <Confirm />
      <Add />
      <Profile />
      <Edit />
    </>
  )
}

export default Dialogs
