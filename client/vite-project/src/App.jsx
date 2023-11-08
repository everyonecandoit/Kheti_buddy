import {BrowserRouter , Routes , Route} from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Forgotpassword from "./components/Forgotpassword";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/login" element={<Loginpage/>}></Route>
        <Route path="/register" element={<Registerpage/>}></Route>
        <Route path="/seller" element={<Dashboard/>}></Route>
        <Route path="/forgot-password" element={<Forgotpassword/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
