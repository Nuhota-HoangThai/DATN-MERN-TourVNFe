import {} from "react";
import { Link } from "react-router-dom";

import { SlArrowRight } from "react-icons/sl";

const Introduce = () => {
  return (
    <div className="bg-sky-100">
      <div className="py-8">
        <div className="mx-52 flex items-center justify-center gap-6 pb-6">
          <div className="w-4/5">
            <h1 className=" text-4xl font-semibold text-blue-500">
              Về chúng tôi
            </h1>
          </div>
          <div>
            {" "}
            <p className="text-lg ">
              <Link to={"/"} className=" font-medium  text-blue-500">
                Công ty Du lịch Vi Vu 3 Miền
              </Link>{" "}
              là công ty du lịch, dịch vụ chuyên nghiệp, uy tín, đáng tin cậy ở
              Cần Thơ. Chúng tôi chuyên về các tour du lịch Cần Thơ, tour chợ
              nổi Cái Răng, tour Cồn Sơn, tour miền Tây, tour miền Bắc, tour
              miền Trung, thuê xe, thuê tàu ghe với sự cam kết chất lượng dịch
              vụ tốt nhất dành cho khách hàng. Nụ cười của quý khách chính là
              niềm hạnh phúc, động lực lớn cho công ty để đem đến trải nghiệm
              tốt nhất cho khách hàng.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          <div className="w-48 rounded bg-gradient-to-r from-blue-800 to-blue-950 py-2 text-center font-bold text-white transition duration-300 hover:from-blue-950 hover:to-blue-800">
            <Link to={"/about"} className="">
              Giới thiệu
            </Link>
          </div>
          <div className="w-48 rounded border-2 border-blue-800 py-2 text-center font-bold text-blue-800 hover:bg-blue-800 hover:text-white">
            <Link to={"/contact"}>Liên hệ ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
