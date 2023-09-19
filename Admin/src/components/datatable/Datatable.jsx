import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { reservationColumns } from "../../datatableSource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import moment from "moment";
import "moment-timezone";
const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);
  const { data, loading, error } = useFetch(`/${path}`);
  console.log(data);
  console.log(error);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(data);
    console.log(list);
    if (path === "reservations") {
      const modifiedData = data.map((attribute) => ({
        ...attribute,
        startDate: moment(attribute.reservationDuration.startDate)
          .add(1, "day")
          .toISOString()
          .split("T")[0],
        endDate: moment(attribute.reservationDuration.endDate)
          .add(1, "day")
          .toISOString()
          .split("T")[0],
      }));
      setList(modifiedData);
    } else setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      if (path == "reservations") {
        const reservation = (await axios.get(`reservations/${id}`)).data;
        console.log(reservation);

        const { hotelId, userId, roomTypeId, roomNumberId } = reservation;
        const { startDate, endDate } = reservation.reservationDuration;

        console.log(
          hotelId,
          userId,
          roomTypeId,
          roomNumberId,
          startDate,
          endDate
        );

        const roomRes = await axios.delete(
          `rooms/${hotelId}/${roomTypeId}/${roomNumberId}/${startDate}/${endDate}`
        );
        console.log(roomRes);
        const reservationRes = await axios.delete(`${path}/${id}`);
        console.log(reservationRes);

        setList(list.filter((item) => item._id !== id));
      }
      await axios.delete(`${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {loading ? (
        <div className="loading">loading...</div>
      ) : (
        <div className="wrapper">
          <div className="datatableTitle">
            {path}
            <Link to={`/${path}/new`} className="link">
              Add New {path}
            </Link>
          </div>
          <DataGrid
            className="dataGrid"
            rows={list}
            columns={columns.concat(actionColumn)}
            pageSize={9}
            getRowId={(row) => row._id}
          />
        </div>
      )}
    </div>
  );
};

export default Datatable;
