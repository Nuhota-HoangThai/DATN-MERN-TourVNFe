import {} from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="w-96 rounded-2xl border shadow-xl overflow-hidden hover:bg-opacity-20 relative ">
      <Link to={`/tour/${props.id}`}>
        <img
          onClick={window.scrollTo(0, 0)}
          src={props.image}
          alt={props.name}
          className="transition-transform transform-gpu hover:scale-110 w-full"
        />
      </Link>

      <div className=" py-6">
        <p className="py-3 px-3 transition-transform transform-gpu hover:translate-y-2">
          {props.name}
        </p>
        <div className="flex gap-5 px-3">
          <div className="text-gray-600 text-xl font-medium line-through">
            {props.old_price} VND
          </div>
          <div className="text-red-600 text-xl font-semibold ">
            {props.new_price} VND
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
