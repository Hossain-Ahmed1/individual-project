import { Box } from "@chakra-ui/react"
import { Route,Routes } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SearchPage from "./pages/SearchPAge"

function App() {

  return (
    <Box minH={"100vh"}>
      <Navbar /> 
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/search/:item" element = {<SearchPage />}/>
      </Routes>
    </Box>
  )
}

export default App
