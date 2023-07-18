import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";

const Reserve = ({ setOpenBook, hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserveClose"
          onClick={() => setOpenBook(false)}
        />
        <span>Select rooms:</span>
        {data.map((room) => (
          <div className="reserveRoom" key={room._id}>
            <div className="reserveRoomTitle">{room.title}</div>
            <div className="reserveRoomDesc">{room.desc}</div>
            <div className="reserveMax">
              Max people:<b>{room.maxPeople}</b>
            </div>
            <div className="reservePrice">{room.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserve;
