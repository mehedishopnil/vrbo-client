import { Link } from "react-router";

const InfoCard = ({ data, showLocation = true, showDate = true, showPrice = true }) => {
  const { id, price, date, location, image, title, description, category } = data;

  const truncateDescription = (text, maxWords = 100) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <div className="w-[360px] space-y-10 md:w-[500px] lg:w-[500px] p-4 md:gap-5">
      <Link to={`/single-resort/${id}`}>
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <img
            src={Array.isArray(image) ? image[0] : image}
            alt={`Image for ${id}`}
            className="mt-2 w-[350px] h-[200px] md:w-[450px] md:h-[300px] lg:w-[450px] lg:h-[300px] xl:w-[450px] xl:h-[300px] rounded-md object-cover"
          />

          <p className={`mt-2 text-lg font-semibold text-gray-600 ${!showLocation && 'hidden'}`}>
            Location: {location}
          </p>
          <p className={`mt-2 text-gray-600 ${!showDate && 'hidden'}`}>
            Date: {date}
          </p>
          <p className={`mt-2 text-gray-600 ${!showPrice && 'hidden'}`}>
            Price: <span className="text-black text-lg">{price}</span>
          </p>

          {title && <p className="mt-2 text-lg font-semibold text-gray-700">{title}</p>}
          {description && <p className="mt-2 text-gray-600">{truncateDescription(description)}</p>}
          {category && <p className="mt-2 text-gray-500 italic">{category}</p>}
        </div>
      </Link>
    </div>
  );
};

export default InfoCard;
