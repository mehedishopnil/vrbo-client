import { Link } from "react-router";

const InfoCard = ({ data, showLocation = true, showDate = true, showPrice = true, isCached }) => {
  const { id, price, date, location, image, title, description, category, beds, nights } = data;

  const truncateDescription = (text, maxWords = 100) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Extract numeric value from price string (e.g., "$1200/night" -> 1200)
  const getNumericPrice = (priceStr) => {
    if (!priceStr) return 0;
    const numericValue = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue) || 0;
  };

  const pricePerNight = getNumericPrice(price);
  const pricePerWeek = pricePerNight * (nights || 7); // Default to 7 nights if not specified

  return (
    <div className="w-[360px] space-y-10 md:w-[500px] lg:w-[500px] p-4 md:gap-5">
      <Link to={`/single-resort/${id}`}>
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <img
            src={Array.isArray(image) ? image[0] : image}
            alt={`Image for ${title || id}`}
            className="mt-2 w-[350px] h-[200px] md:w-[450px] md:h-[300px] lg:w-[450px] lg:h-[300px] xl:w-[450px] xl:h-[300px] rounded-md object-cover"
          />

          <h2 className="mt-2 text-lg font-semibold text-gray-800">{title}</h2>

          <p className={`mt-2 text-base font-semibold text-gray-600 ${!showLocation && 'hidden'}`}>
            Location: {location}
          </p>

          {/* Show beds and nights for special resorts (IDs 3 and 8) */}
          <div className="text-sm">
          {(!isCached && (id === 3 || id === 8)) && (
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">Beds: {beds || 2}</p>
              <p className="text-gray-600">Stays: {nights || 7} nights</p>
            </div>
          )}
          

          {/* Price display */}
          {showPrice && (
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">
                Price: <span className="text-gray-700 font-semibold">${pricePerNight.toFixed(2)}/night</span>
              </p>
              <p className="text-gray-600">
                Weekly Total: <span className="text-gray-700 font-semibold">${pricePerWeek.toFixed(2)}</span>
              </p>
            </div>
          )}

</div>

          
          <div className="text-sm mt-2 space-y-1">
          {description && <p className="mt-2 text-gray-600">{truncateDescription(description)}</p>}
          {category && <p className="mt-2 text-gray-500 italic">{category}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InfoCard;