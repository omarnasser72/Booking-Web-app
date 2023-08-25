import "./profile.scss";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { userInputs } from "../../formSource";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { format } from "date-fns";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const {
    user: fetchedUser,
    loading,
    error,
    reFetch,
  } = useContext(AuthContext);
  const [user, setUser] = useState(fetchedUser);
  const [userInfo, setUserInfo] = useState(null);
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  let resvDiv;

  console.log(reservations);
  console.log(reservationData);

  const filteredInputs = userInputs.filter(
    (input) =>
      input.id !== "username" && input.id !== "email" && input.id !== "password"
  );

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setUpdateMode(true);
    setUpdateBtn(true);
    setEditBtn(false);
  };

  const handleUpdate = async () => {
    setUpdateBtn(false);
    setUpdateMode(false);
    try {
      const newUser = {
        ...user,
        ...info,
        img: file ? file.name : user.img,
      };
      try {
        console.log(newUser);
        setEditBtn(true);
        const res = await axios.put(`/users/${user._id}`, newUser);
        setUser(newUser);
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReservations = async () => {
    try {
      const reservationsRes = await axios.get(
        `/users/reservations/${user._id}`
      );
      const lastUpdatedReservations = reservationsRes.data;
      console.log(lastUpdatedReservations);
      setReservations(lastUpdatedReservations);
    } catch (error) {
      console.log(error);
    }
  };

  const getReservationsData = async () => {
    const uniqueReservationData = [];

    for (const reservation of reservations) {
      try {
        const [hotel, roomType, roomNumber] = await Promise.all([
          axios.get(`hotels/find/${reservation.hotelId}`),
          axios.get(`rooms/${reservation.roomTypeId}`),
          axios.get(
            `/rooms/${reservation.roomTypeId}/${reservation.roomNumberId}`
          ),
        ]);

        const resvData = {
          id: reservation._id,
          hotel: hotel.data,
          roomType: roomType.data,
          roomNumber: roomNumber.data,
          startDate: reservation.reservationDuration.startDate,
          endDate: reservation.reservationDuration.endDate,
        };

        const existingIndex = uniqueReservationData.findIndex(
          (resv) =>
            resv.hotel._id === resvData.hotel._id &&
            resv.roomType._id === resvData.roomType._id &&
            resv.roomNumber._id === resvData.roomNumber._id
        );

        if (existingIndex === -1) {
          uniqueReservationData.push(resvData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setReservationData(uniqueReservationData); // Moved outside the loop
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${user._id}`);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => {
    if (reservations.length > 0) {
      getReservationsData();
    }
  }, [reservations]);

  const handleDelete = async (e) => {
    try {
      const resvDivId = e.target.dataset.reservationId;

      const resvationResponse = await axios.delete(
        `users/reservations/${resvDivId}`
      );

      const resvDivToDelete = reservationData.find(
        (resvDiv) => resvDiv.id === resvDivId
      );

      const updatedReservationData = reservationData.filter(
        (reservation) => reservation.id !== resvDivId
      );

      try {
        const reservationDateResponse = await axios.delete(
          `rooms/${resvDivToDelete.hotel._id}/${resvDivToDelete.roomType._id}/${resvDivToDelete.roomNumber._id}/${resvDivToDelete.startDate}/${resvDivToDelete.endDate}`
        );
      } catch (err) {
        console.log(err);
      }
      setReservationData(updatedReservationData); // Update reservationData directly

      getReservations(); // Fetch the updated list of reservations
      console.log(
        `Reservation with _id = ${resvDivId} has been successfully deleted`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Profile">
      <div className="profileContainer">
        {loading ? (
          "Loading User Data...."
        ) : (
          <div className="info">
            <div className="profileImg">
              <img
                src={
                  file.name !== undefined
                    ? `/upload/profileImages/${file.name}`
                    : user?.img
                    ? `/upload/profileImages/${user.img}`
                    : "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-18.jpg"
                }
                alt="Profile"
              />
              <div className="upload">
                <label htmlFor="file">
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <form>
              <div className="formInput">
                <label>Username</label>
                <p>{user.username}</p>
              </div>
              <div className="formInput">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              {!updateMode &&
                filteredInputs?.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <p>{user[input.id]}</p>
                  </div>
                ))}

              {updateMode &&
                filteredInputs?.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={user[input.id]}
                      id={input.id}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              {editBtn && <button onClick={handleEdit}>Edit Profile</button>}
              {updateBtn && (
                <button onClick={() => handleUpdate()}>Update</button>
              )}
            </form>
          </div>
        )}
        {reservationData && (
          <div className="reservations">
            Reservations:
            {reservationData.map((reservation, index) => {
              if (Object.keys(reservation).length === 0) return null;
              return (
                <div className="reservation" key={index} id={reservation.id}>
                  <div className="property">
                    <label>Hotel:</label> <p>{reservation.hotel.name}</p>
                  </div>
                  <div className="property">
                    <label>Room Type:</label>{" "}
                    <span>{reservation.roomType.title}</span>
                  </div>
                  <div className="property">
                    <label>Room Number:</label>{" "}
                    <span>{reservation.roomNumber.number}</span>
                  </div>
                  <div className="property">
                    <label>Duration:</label>{" "}
                    <span>
                      {`${format(
                        new Date(reservation.startDate),
                        "dd/MM/yyyy"
                      )} to ${format(
                        new Date(reservation.endDate),
                        "dd/MM/yyyy"
                      )}`}
                    </span>
                  </div>
                  <button
                    data-reservation-id={reservation.id}
                    onClick={handleDelete}
                  >
                    Cancel Reservation
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
