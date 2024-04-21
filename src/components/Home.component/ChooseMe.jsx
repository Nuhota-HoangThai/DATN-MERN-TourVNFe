import {
  FaRegSmileBeam,
  FaPlaneDeparture,
  FaLock,
  FaHandshake,
} from "react-icons/fa";

const ChooseMe = () => {
  return (
    <div className="bg-sky-100">
      <div className="mx-16 px-4 py-16 sm:px-6 lg:px-8">
        {" "}
        {/* Adjusted padding and max-width */}
        <div className="flex items-center justify-center pb-4">
          <div className="hidden h-0.5 w-full rounded bg-blue-300 sm:mr-4 sm:block"></div>
          <h1
            className="w-full px-4 text-center text-xl font-bold text-blue-800 sm:text-2xl lg:text-3xl"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
          >
            Nên chọn ViVu3Mien
          </h1>
          <div className="hidden h-0.5 w-full rounded bg-blue-300 sm:ml-4 sm:block"></div>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {" "}
          {/* Responsive grid */}
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaRegSmileBeam className="mb-4 text-4xl text-blue-500" />
            <h2 className="mb-2 text-center text-xl font-bold">Đáng Tin Cậy</h2>
            <p className="text-center">
              Ra đời từ 2024, chúng tôi đã khẳng định chất lượng dịch vụ và uy
              tín trên thị trường du lịch.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaPlaneDeparture className="mb-4 text-4xl text-blue-500" />
            <h2 className="mb-2 text-center text-xl font-bold">
              Vô Vàn Lựa Chọn
            </h2>
            <p className="text-center">
              Đa dạng dịch vụ từ tour du lịch, vé máy bay đến khách sạn và nhiều
              trải nghiệm độc đáo khác.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaLock className="mb-4 text-4xl text-blue-500" />
            <h2 className="mb-2 text-center text-xl font-bold">
              Thanh Toán An Toàn
            </h2>
            <p className="text-center">
              Bảo mật thông tin và tuân thủ các tiêu chuẩn bảo mật quốc tế, đảm
              bảo an toàn giao dịch.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaHandshake className="mb-4 text-4xl text-blue-500" />
            <h2 className="mb-2 text-center text-xl font-bold">
              Dễ Dàng & Tiện Lợi
            </h2>
            <p className="text-center">
              Xác nhận tức thời, vé điện tử và đội ngũ hỗ trợ 24/7 để đồng hành
              cùng bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseMe;
