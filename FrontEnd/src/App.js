import "./App.scss"
import HomePage from "../src/pages/home/Home"
import ProfilePage from "../src/pages/profile/Profile"
import Auth from "../src/pages/auth/Auth"
import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"

function App() {

  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <div className="Glass">
      </div>
      <Routes>
        <Route path="/" element={user ? <Navigate to='home' /> : <Navigate to='auth' />}></Route>
        <Route path="/home" element={user ? <HomePage /> : <Navigate to='../auth' />}></Route>
        <Route path="/auth" element={user ? <Navigate to='../home' /> : <Auth />}></Route>
        <Route path="/profile/:id" element={user ? <ProfilePage /> : <Navigate to='/auth'></Navigate>}></Route>
      </Routes>
      {
        // <HomePage />
        // <ProfilePage />

      }
    </div>
  );
}

export default App;
