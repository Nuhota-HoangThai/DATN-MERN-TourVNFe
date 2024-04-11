const Contact = () => {
  return (
    <div className="bg-sky-100 px-14 py-12 sm:px-6 lg:px-14">
      <h1 className="mb-12 text-center text-3xl font-bold text-blue-800">
        Thông Tin Liên Hệ Vi Vu 3 Miền
      </h1>

      <div className="rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-4 text-2xl font-semibold">Thông Tin Công Ty</h2>
        <p className="mb-2">CÔNG TY CỔ PHẦN DU LỊCH VI VU 3 MIỀN</p>
        <p className="mb-2">Mã số thuế: 24022002</p>
        <p className="mb-2">
          Địa chỉ: 359, Đường 30/04, Phường Hưng Lợi, Quận Ninh Kiều, TP. Cần
          Thơ
        </p>
        <p className="mb-2">SĐT văn phòng: 02812345678</p>
        <p className="mb-2">Email: lienhe@vivu3mien.com</p>
        <p>Hotline: 19001234</p>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Liên Hệ Các Phòng Ban</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p>
                <strong>Phòng Kinh Doanh</strong>
              </p>
              <p className="mb-1">Mr. Hoàng Thái – Trưởng Phòng</p>
              <p className="mb-1">SĐT: 0912123123</p>
              <p>Email: phuphuong@vivu3mien.com</p>
            </div>
            <div className="rounded-lg border p-4">
              <p>
                <strong>Chăm Sóc Khách Hàng</strong>
              </p>
              <p className="mb-1">SĐT: 19001234</p>
              <p>Email: chamsockhachhang@vivu3mien.com</p>
            </div>
            {/* Thêm các phòng ban khác theo mẫu trên */}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p>
          Website:{" "}
          <a href="https://vivu3mien.com" className="text-blue-600">
            vivu3mien.com
          </a>
        </p>
        <p>
          Fanpage:{" "}
          <a href="https://facebook.com/vivu3mien" className="text-blue-600">
            facebook.com/vivu3mien
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
