import React, { useContext } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";

const ListingCard = ({ item, index }) => {
  const navigate = useNavigate();
  const { earningList } = useContext(AuthContext);

  const findEarningListById = (id) => {
    return earningList.find((earningItem) => earningItem.id === id);
  };

  const handleClick = () => {
    const selectedEarning = findEarningListById(item.id);

    if (selectedEarning) {
      navigate(`/individual-earnings/${item.id}`);
    } else {
      console.error("Matching data not found");
    }
  };

  return (
    <Link to={`/individual-earnings/${item.id}`}>
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