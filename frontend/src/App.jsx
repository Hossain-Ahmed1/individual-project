import { Box } from "@chakra-ui/react"
import { Route,Routes } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SearchPage from "./pages/SearchPAge"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"

function App() {

  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route element ={<Navbar />}>
        <Route path="/*" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/search/:item" element = {<SearchPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route>
        </Route>
      </Routes>
    </Box>
  )
}

export default App
