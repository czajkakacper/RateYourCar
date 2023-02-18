import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import My from "./components/My"
import Update from "./components/Update"
import SeeOpinion from "./components/SeeOpinion"

function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      {user && <Route path="/update/:id" exact element={<Update />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/my" exact element={<My />} />
      <Route path="/SeeOpinion" exact element={< SeeOpinion/>} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default App
