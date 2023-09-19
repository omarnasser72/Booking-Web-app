import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import SingleUser from "./pages/singleUser/SingleUser";
import NewUser from "./pages/newUser/NewUser";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hotelInputs, roomInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  hotelColumns,
  reservationColumns,
  roomColumns,
  userColumns,
} from "./datatableSource";
import SingleHotel from "./pages/singleHotel/SingleHotel";
import SingleRoom from "./pages/singleRoom/SingleRoom";
import SingleReservation from "./pages/singleReservation/SingleReservation";
import NewReservation from "./pages/newReservation/NewReservation";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    //console.log(user);
    if (user) {
      return children;
    }
    return <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <SingleUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <SingleHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path=":roomId"
                element={
                  <ProtectedRoute>
                    <SingleRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="reservations">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={reservationColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path=":reservationId"
                element={
                  <ProtectedRoute>
                    <SingleReservation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewReservation />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
