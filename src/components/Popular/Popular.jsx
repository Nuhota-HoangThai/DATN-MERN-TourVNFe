import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import { BASE_URL } from "../../utils/config";

const Popular = () => {
  const initialItems = 3;
  const [visibleItems, setVisibleItems] = useState(initialItems);

  const [popularTours, setPopularTours] = useState([]);

  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
  };

  const showLessItems = () => {
    setVisibleItems((prevVisibleItems) => {
      return Math.max(initialItems, prevVisibleItems - 3);
    });
  };

  useEffect(() => {
    fetch(`${BASE_URL}/tour/getPopularInCentral`)
      .then((response) => response.json())
      .then((data) => setPopularTours(data));
  }, []);

  return (
    <div className="mb-8">
      <h1 className="text-center mb-5 text-gray-800 md:text-2xl font-semibold">
        PHỔ BIẾN Ở MIỀN TRUNG
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-lg ">
          {popularTours.slice(0, visibleItems).map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-6 mx-40">
        {visibleItems > initialItems && (
          <button
            onClick={showLessItems}
            className="px-4 py-1 w-28 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Ẩn bớt
          </button>
        )}
        {visibleItems <= popularTours.length && (
          <button
            onClick={showMoreItems}
            className="px-4 py-1 w-28  bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Xem thêm
          </button>
        )}
      </div>
    </div>
  );
};

export default Popular;
