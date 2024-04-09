const ChooseMe = () => {
  return (
    <div className="bg-sky-100">
      <div className="mx-24 p-8">
        <h1 className="pb-8 text-2xl font-bold text-blue-800">
          Vì sao bạn nên chọn Vi Vu 3 Miền
        </h1>
        <div className=" grid grid-cols-4 gap-7 ">
          <div className="h-64 w-72 rounded-lg border bg-white">1</div>
          <div className="h-64 w-72 rounded-lg border bg-white">2</div>
          <div className="h-64 w-72 rounded-lg border bg-white">3</div>
          <div className="h-64 w-72 rounded-lg border bg-white">2</div>
        </div>
      </div>
    </div>
  );
};

export default ChooseMe;
