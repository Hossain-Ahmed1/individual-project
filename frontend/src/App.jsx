import { Box } from "@chakra-ui/react"
import { Route,Routes } from "react-router-dom"
import CreatePage from "./pages/AddItemPage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SearchPage from "./pages/SearchPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import UserPage from "./pages/UserPage"
import ItemPage from "./pages/ItemPage"
import TradingPage from "./pages/TradingPage"
import LiveTradePage from "./pages/LiveTradePage"
import {io} from "socket.io-client"
import { URL } from "./api/congig"

function App() {
  const socket = io(URL)

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
        <Route path="/trade/:id" element={<TradingPage />} />
        <Route path="/livetrade/:id" element={<LiveTradePage socket={socket}/>}/>
        </Route>
        <Route>
        </Route>
      </Routes>
    </Box>
  )
}

export default App
