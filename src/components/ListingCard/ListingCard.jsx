import React from "react";
import { Link } from "react-router"; // Make sure it's from react-router-dom

const ListingCard = ({ item, index }) => {
  return (
    <Link to={`/single-resort/${item.id}`}>
      <div className="border rounded border-gray-200 mb-4 md:mb-4 p-4 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-10">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item.image} alt={`Listing ${index + 1}`} />
            </div>
          </div>
          <div>
            <p className="font-semibold">{item.title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
