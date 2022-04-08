import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../assets/css/custom-styles.css";

export const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <FaStar
              className="starratingS"
              size={30}
              onClick={() => {
                setRating(ratingValue);
                console.log(ratingValue);
              }}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              
            />
          </label>
        );
      })}
      <br />
    </div>
  );
};
