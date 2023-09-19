import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useState } from "react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="home">
      {sidebar && <Sidebar />}
      <div className="homeContainer">
        <div className="sidebarWrapper">
          <div className="sidebarBtn">
            <button onClick={() => setSidebar(!sidebar)}>
              <ListOutlinedIcon className="icon" />
            </button>
          </div>
          <Navbar className="navbar" />
        </div>
        <div className="widgetContainer">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
