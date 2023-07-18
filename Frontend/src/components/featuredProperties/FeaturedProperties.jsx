import { API_URL } from "../../config.js";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading } = useFetch(`/hotels?featured=true`);
  return (
    <div className="fb">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fbItem" key={item._id}>
              <img src={item.photos[0]} alt={item.title} className="fbImg" />
              <span className="fbName">{item.name}</span>
              <span className="fbCity">{item.city}</span>
              <span className="fbPrice">starts from {item.cheapestPrice}$</span>
              {item.rating && (
                <div className="fbRating">
                  <button className="fbRatingBtn">{item.rating}</button>
                  <span>good</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
