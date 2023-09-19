import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useState } from "react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const List = ({ columns }) => {
  const [sidebar, setSidebar] = useState(false);
  if (!columns || columns.length === 0) {
    return null;
  }
  return (
    <div className="list">
      {sidebar && <Sidebar />}
      <div className="listContainer">
        <div className="sidebarWrapper">
          <div className="sidebarBtn">
            <button onClick={() => setSidebar(!sidebar)}>
              <ListOutlinedIcon className="icon" />
            </button>
          </div>
          <Navbar className="navbar" />
        </div>
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;
