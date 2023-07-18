import "./list.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../config.js";
const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(9999);
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`
  );
  console.log(data);
  const handleSearch = () => {
    reFetch();
  };

  console.log(date);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listSearchTitle">Search</h1>
            <div className="listSearchItem">
              <label>Destination</label>
              <input
                type="text"
                placeholder={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>
            <div className="listSearchItem">
              <label>Check in Date</label>
              <span
                onClick={() => {
                  setOpenDate(!openDate);
                }}
              >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => {
                    setDate([item.selection]);
                  }}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="listSearchItem">
              <div className="optionItems">
                <label>Options</label>
                <div className="optionItem">
                  <span className="optionItemLabel">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="text"
                    placeholder={min}
                    onChange={(event) => setMin(event.target.value)}
                  />
                </div>
                <div className="optionItem">
                  <span className="optionItemLabel">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="text"
                    placeholder={max}
                    onChange={(event) => setMax(event.target.value)}
                  />
                </div>
                <div className="optionItem">
                  <span className="optionItemLabel">Adult</span>
                  <input type="number" min={1} placeholder={options.adult} />
                </div>
                <div className="optionItem">
                  <span className="optionItemLabel">Children</span>
                  <input type="number" min={0} placeholder={options.children} />
                </div>
                <div className="optionItem">
                  <span className="optionItemLabel">Rooms</span>
                  <input type="number" min={1} placeholder={options.room} />
                </div>
              </div>
            </div>
            <button className="searchBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
