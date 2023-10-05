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
import ChangePwd from "./pages/change pwd/ChangePwd";

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
            <Route index element={<ProtectedRoute element={<Home />} />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route>
            <Route path="/profile">
              <Route index element={<ProtectedRoute element={<Profile />} />} />
              <Route
                path="changePwd"
                element={<ProtectedRoute element={<ChangePwd />} />}
              />
            </Route>
          </Route>

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
          <Route path="/ListAll/">
            <Route
              path="hotels"
              element={<ProtectedRoute element={<ListType />} />}
            />
            <Route
              path="apartments"
              element={<ProtectedRoute element={<ListType />} />}
            />
            <Route
              path="resorts"
              element={<ProtectedRoute element={<ListType />} />}
            />
            <Route
              path="villas"
              element={<ProtectedRoute element={<ListType />} />}
            />
            <Route
              path="cabins"
              element={<ProtectedRoute element={<ListType />} />}
            />
          </Route>
          <Route path="/">
            <Route path="" element={<Home />} />
            <Route path="Flights" element={<ListType />} />
            <Route path="CarRental" element={<ListType />} />
            <Route path="AirportTaxies" element={<ListType />} />
            <Route path="Attractions" element={<ListType />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
