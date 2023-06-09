import { indigo, blue } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
// https://mui.com/material-ui/customization/theming/
export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: indigo,
    secondary: blue
  }
})
