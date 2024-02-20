import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import { BASE_URL } from "../../utils/config";

const NewCollections = () => {
  const initialItems = 3;

  const [visibleItems, setVisibleItems] = useState(initialItems); // Change this number based on how many items you want initially visible

  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3); // Show 4 more items each time the button is clicked
  };

  const showLessItems = () => {
    setVisibleItems((prevVisibleItems) => {
      // Ensure that the count does not go below the initial count
      return Math.max(initialItems, prevVisibleItems - 3);
    });
  };

  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/tour/getNewCollection`)
      .then((response) => response.json())
      .then((data) => {
        setNewCollection(data);
      });
  }, []);
  return (
    <div className="mb-8 ">
      <h1 className="text-gray-800 text-center text-2xl font-semibold mb-5">
        BỘ SƯU TẬP MỚI
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg">
          {newCollection.slice(0, visibleItems).map((item, i) => (
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
            className="px-4 py-1 w-28 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Ẩn bớt
          </button>
        )}
        {visibleItems < newCollection.length && (
          <button
            onClick={showMoreItems}
            className="px-4 py-1 w-28 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Xem thêm
          </button>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
