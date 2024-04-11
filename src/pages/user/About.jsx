import {} from "react";

const AboutPage = () => {
  return (
    <div className=" bg-sky-50 px-10 py-8">
      <section className="mb-8">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            Giới thiệu về Công Ty Du Lịch Việt Nam Vi Vu 3 Miền (ViVu3Mien)
          </h1>
          <p className="text-gray-600">
            Công ty Du Lịch Việt Nam được thành lập với mục tiêu mang lại những
            trải nghiệm du lịch đặc sắc và đáng nhớ cho khách hàng thông qua
            việc khám phá vẻ đẹp tự nhiên, văn hóa phong phú và ẩm thực độc đáo
            của Việt Nam.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Sứ Mệnh
            </h2>
            <p className="text-gray-600">
              Mang đến những chuyến đi chất lượng cao, an toàn và tràn đầy cảm
              hứng, giúp mỗi khách hàng tìm thấy niềm vui và hạnh phúc trên mỗi
              hành trình.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Tầm Nhìn
            </h2>
            <p className="text-gray-600">
              Trở thành công ty du lịch hàng đầu tại Việt Nam trong việc cung
              cấp các gói du lịch đa dạng và phục vụ tận tâm, đóng góp vào sự
              phát triển của ngành du lịch Việt Nam.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Giá Trị Cốt Lõi
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Chất lượng dịch vụ hàng đầu</li>
            <li>Trải nghiệm khách hàng tuyệt vời</li>
            <li>Cam kết về sự an toàn và bảo vệ môi trường</li>
            <li>Sự đổi mới không ngừng và phát triển bền vững</li>
          </ul>
        </div>
      </section>

      <section>
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Hình Ảnh Điểm Đến
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Hình ảnh có thể được thêm vào đây */}
            <img
              className="rounded-lg shadow-lg"
              src="url_to_image_1"
              alt="Mô tả hình ảnh"
            />
            <img
              className="rounded-lg shadow-lg"
              src="url_to_image_2"
              alt="Mô tả hình ảnh"
            />
            {/* Thêm nhiều hình ảnh hơn nếu muốn */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
