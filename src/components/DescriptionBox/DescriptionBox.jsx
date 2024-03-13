import {} from "react";

const DescriptionBox = () => {
  return (
    <div className="my-2 bg-blue-200 px-4 py-2 sm:px-12 md:px-24">
      <div className="flex flex-col justify-between text-center sm:flex-row sm:text-left">
        <div className="mb-2 sm:mb-0">Description</div>
        <div>Reviews</div>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
          excepturi totam necessitatibus rem voluptatibus recusandae accusamus
          natus blanditiis, reiciendis officia neque perferendis voluptatem
          placeat nam at, assumenda animi tempora? Expedita.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
