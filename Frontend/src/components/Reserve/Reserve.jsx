import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { DateRange } from "react-date-range";

const Reserve = ({ hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([{}]);
  const [dateFound, setDateFound] = useState(true);
  const [openCalender, setOpenCalender] = useState(false);
  const [dateDuration, setDuration] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { date: contextDate } = useContext(SearchContext);
  const [date, setDate] = useState(contextDate);

  console.log(date);
  const navigate = useNavigate();

  const handleSelect = (e, roomId) => {
    const checkedRooms = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checkedRooms
        ? [...selectedRooms, { value, roomId }]
        : selectedRooms.filter((item) => item.value !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    if (startDate === undefined) {
      return []; // Return an empty array if startDate is undefined
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const initialDate =
      startDate !== undefined ? new Date(startDate.getTime()) : "";
    const dates = [];

    while (initialDate <= end) {
      dates.push(new Date(initialDate).getTime());
      initialDate.setDate(new Date(initialDate.getDate() + 1));
    }
    return dates;
  };

  const dateRange = [
    {
      startDate: date[0].startDate,
      endDate: date[0].endDate,
      key: "selection",
    },
  ];

  useEffect(() => {
    if (
      date[0].startDate === undefined ||
      date[0].endDate === undefined ||
      date[0].startDate.getTime() === date[0].endDate.getTime()
    ) {
      setDateFound(false);
    } else setDateFound(true);
  }, [date]);

  useEffect(() => {
    if (
      dateDuration[0].startDate !== undefined &&
      dateDuration[0].endDate !== undefined &&
      dateDuration[0].startDate.getTime() !== dateDuration[0].endDate.getTime()
    ) {
      setDate([
        {
          startDate: dateDuration[0].startDate,
          endDate: dateDuration[0].endDate,
          key: "selection",
        },
      ]);
    }
  }, [dateDuration]);

  console.log(date[0].startDate);
  console.log(date[0].endDate);

  console.log(dateDuration[0].startDate);
  console.log(dateDuration[0].endDate);

  const allDates =
    date.startDate !== undefined || date[0].startDate !== undefined
      ? getDatesInRange(date[0].startDate, date[0].endDate)
      : null;

  console.log(allDates);
  console.log(dateFound);

  const handeleReserveClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (selectedRoom) => {
          if (!selectedRoom.value) return;
          const res = await axios.put(
            `/rooms/availability/${selectedRoom.value}`,
            {
              dates: allDates,
            }
          );
          console.log(allDates);
          const reserve = {
            userId: JSON.parse(localStorage.getItem("user"))._id,
            hotelId,
            roomTypeId: selectedRoom.roomId,
            roomNumberId: selectedRoom.value,
            reservationDuration: {
              startDate: date[0].startDate,
              endDate: date[0].endDate,
            },
          };
          console.log(reserve);
          const reserveRes = await axios.post(
            `/hotels/reserve/${hotelId}`,
            reserve
          );
          console.log(reserveRes);
          return res.data;
        })
      );
      //setOpen(false);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    const available = !isFound;
    console.log(
      `Room ${roomNumber.number} is ${
        available ? "available" : "unavailable"
      } for selected dates`
    );
    return available;
  };
  console.log(selectedRooms);
  return (
    <div className="reserve">
      {dateFound ? (
        <div className="reserveContainer">
          <div className="selectRooms">
            <h1>Select rooms:</h1>
          </div>
          <div className="reservationRooms">
            {data?.map((room) => (
              <div className="reserveRoom" key={room._id}>
                <div className="roomInfo">
                  <div className="reserveRoomTitle">
                    <h4>Room Title: {room.title}</h4>
                  </div>
                  <div className="reserveRoomDesc">Room Desc: {room.desc}</div>
                  <div className="reservePrice">Price: {room.price}</div>
                  <div className="reserveMax">
                    Max people:<b> {room.maxPeople}</b>
                  </div>
                </div>
                <div className="reserveSelectedRooms">
                  <label>Room Numbers:</label>
                  <div className="roomNumbers">
                    {room.roomNumbers.map((roomNumber) => (
                      <div className="room">
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={(e) => handleSelect(e, room._id)}
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handeleReserveClick} className="reserveBtn">
            Reserve
          </button>
        </div>
      ) : (
        <div className="newDate">
          <h3>Please, select duration to reserve</h3>
          <div className="dateRange">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDuration([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateDuration}
              className="date"
              minDate={new Date()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserve;
