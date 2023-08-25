import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import { AuthContext, AuthContextProvider } from "./context/AuthContext"; // Import the AuthContextProvider
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import Reservation from "./pages/Reservation/Reservation";
import ListType from "./pages/ListType/ListType";

function App() {
  const ProtectedRoute = ({ element }) => {
    // Change `children` to `element`
    const { user } = useContext(AuthContext);
    const isLoginOrRegister =
      useLocation().pathname.match(/^(login|register)$/);
    if (user || isLoginOrRegister) {
      return element; // Return the provided element directly
    }
    return <Navigate to="/login" />;
  };

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={<ProtectedRoute element={<Home />} />} />
          </Route>
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/hotels"
            element={<ProtectedRoute element={<List />} />}
          />
          <Route
            path="/hotels/:id"
            element={<ProtectedRoute element={<Hotel />} />}
          />
          <Route
            path="/hotels/reservation/:id"
            element={<ProtectedRoute element={<Reservation />} />}
          />
          <Route
            path="/ListAll/hotels"
            element={<ProtectedRoute element={<ListType />} />}
          />
          <Route
            path="/ListAll/apartments"
            element={<ProtectedRoute element={<ListType />} />}
          />
          <Route
            path="/ListAll/resorts"
            element={<ProtectedRoute element={<ListType />} />}
          />
          <Route
            path="/ListAll/villas"
            element={<ProtectedRoute element={<ListType />} />}
          />
          <Route
            path="/ListAll/cabins"
            element={<ProtectedRoute element={<ListType />} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
