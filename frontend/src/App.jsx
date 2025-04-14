import { Box } from "@chakra-ui/react"
import { Route,Routes } from "react-router-dom"
import CreatePage from "./pages/AddItemPage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SearchPage from "./pages/SearchPAge"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import UserPage from "./pages/UserPage"
import ItemPage from "./pages/ItemPage"

function App() {


  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route element ={<Navbar />}>
        <Route path="/*" element={<HomePage />} />
        <Route path="/add" element={<CreatePage />} />
        <Route path="/search/:item" element = {<SearchPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        </Route>
        <Route>
        </Route>
      </Routes>
    </Box>
  )
}

export default App
