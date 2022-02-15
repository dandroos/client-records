import { createStore } from "redux"

const SET_CLIENTS = "SET_CLIENTS"
const SET_IS_MOBILE = "SET_IS_MOBILE"
const SET_TOAST = "SET_TOAST"
const SET_DIALOGS = "SET_DIALOGS"

export const setClients = (payload) => ({
  type: SET_CLIENTS,
  payload,
})

export const setIsMobile = (payload) => ({
  type: SET_IS_MOBILE,
  payload,
})

export const setToast = (payload) => ({
  type: SET_TOAST,
  payload,
})

export const setDialogs = (payload) => ({
  type: SET_DIALOGS,
  payload,
})

const reducer = (
  state = {
    clients: [],
    isMobile: null,
    toast: { open: false, msg: "", severity: "success" },
    dialogs: {
      edit: {
        open: false,
        id: null,
      },
      profile: {
        open: false,
        id: null,
      },
      add: {
        open: false,
      },
      confirm: {
        open: false,
        title: "",
        msg: "",
        proceed: null,
      },
    },
  },
  { type, payload }
) => {
  const newState = Object.assign({}, state)

  switch (type) {
    case SET_CLIENTS:
      newState.clients = payload
      break
    case SET_IS_MOBILE:
      newState.isMobile = payload
      break
    case SET_TOAST:
      newState.toast = payload
      break
    case SET_DIALOGS:
      newState.dialogs = {
        ...state.dialogs,
        ...payload,
      }
      break
    default:
      break
  }
  return newState
}

export const store = createStore(reducer)
