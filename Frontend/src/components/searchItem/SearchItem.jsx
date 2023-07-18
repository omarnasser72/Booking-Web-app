import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="searchItemImg" />
      <div className="searchItemDesc">
        <h1 className="searchItemTitle">{item.name}</h1>
        <span className="searchItemDistance">
          {item.distance} km from centre
        </span>
        <span className="searchItemTaxiOption">free airport taxi</span>
        <span className="searchItemSubtitle">Studio apartment</span>
        <span className="searchItemFeatures">{item.desc}</span>
        <span className="searchItemCancelOption">not free</span>
        <span className="searchItemCancelOptionSubtitle">
          You will be fined 5$
        </span>
      </div>
      <div className="searchItemDetails">
        {item.rating && (
          <div className="searchItemRating">
            <span>Very Good</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="searchItemDetailsText">
          <span className="searchItemPrice">${item.cheapestPrice}</span>
          <span className="searchItemDetailsTaxiOption">
            doesn't includes taxes and fees
          </span>
          <Link to={`/hotels/${item._id}`}>
            <button className="searchItemCheckBtn">See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
