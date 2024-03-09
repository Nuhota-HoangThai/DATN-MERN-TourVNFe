import { useContext, useState } from "react";
import { TourContext } from "../../context/TourContext";
import Item from "../../components/Item/Item";
import { RiArrowDropDownLine } from "react-icons/ri";
import Search from "../../components/Search/Search";

const TourCategory = (props) => {
  const { allTour } = useContext(TourContext);
  const [visibleProducts, setVisibleProducts] = useState(8);

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  const filteredProducts = allTour
    ? allTour.filter((item) => {
        return item.regions === props.regions;
      })
    : [];

  const displayRange = `Hiển thị ${Math.min(
    1,
    filteredProducts.length
  )}-${Math.min(visibleProducts, filteredProducts.length)} sản phẩm`;

  return (
    <div className="mx-20 mb-8 px-4 sm:px-6 lg:px-8 mt-24">
      <img
        className="w-full my-8 rounded-lg shadow-md"
        src={props.banner}
        alt="banner"
      />
      <div className="p-5 shadow-md rounded-lg bg-blue-400">
        <Search />
      </div>
      <div className="flex justify-between items-center py-5">
        <p className="text-lg font-semibold">{displayRange}</p>
        <div className="flex items-center border border-gray-300 rounded-full py-2 px-3 text-sm">
          Sắp xếp theo <RiArrowDropDownLine className="text-2xl ml-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-lg justify-items-center">
        {filteredProducts.slice(0, visibleProducts).map((item, i) => (
          <Item
            key={i}
            _id={item._id}
            image={item.image}
            nameTour={item.nameTour}
            regions={item.regions}
            price={item.price}
            startDate={item.startDate}
            endDate={item.endDate}
            maxParticipants={item.maxParticipants}
          />
        ))}
      </div>
      {visibleProducts < filteredProducts.length && (
        <div className="text-center mb-8 mt-6">
          <button
            onClick={showMoreProducts}
            className="border border-gray-400 text-gray-800 py-2 px-4 rounded-full hover:border-gray-500 hover:text-gray-900 transition-colors"
          >
            Khám phá thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default TourCategory;
