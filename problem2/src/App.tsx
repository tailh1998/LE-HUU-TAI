import { Box } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import FancyForm from "@components/FancyForm"

const App = () => (
  <Box
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <CssBaseline />
    <FancyForm />
  </Box>
)

export default App
