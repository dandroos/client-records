import { createTheme, responsiveFontSizes } from "@mui/material"
import { indigo } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: { main: indigo[800] },
    background: {
      default: indigo[50],
    },
  },
  typography: {
    fontFamily: "Futura PT",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        InputLabelProps: { required: false },
      },
    },
    MuiListItem: {
      defaultProps: {
        disableGutters: true,
      },
    },
  },
})

export default responsiveFontSizes(theme)
