import { useLocation } from "react-router-dom";
import Item from "../../components/Item/Item";
import SearchForm from "../../components/Search/Search";
import "../styles/searchResult.css";

import bannerRuongBacThang from "../../assets/img/bannerRuongBacThang.jpg";

const SearchResultList = () => {
  const location = useLocation();
  const data = location.state?.searchResults;

  return (
    <div className="mx-24 mt-28">
      <div className="relative flex items-end justify-center text-white ">
        <img
          src={bannerRuongBacThang}
          alt=""
          className="  h-[600px] w-full rounded-3xl  bg-cover bg-center"
        />

        <div className="absolute mb-[-100px] rounded-3xl bg-black bg-opacity-0 ">
          {/* <div className="vivu3mien-search mb-32  text-5xl ">
            <p className="text-white">Hành trình mới, kỷ niệm mới</p>
            <p className="vivu3mien-search mt-10  text-7xl text-white">
              ViVu3Mien và bạn
            </p>
          </div> */}
          <SearchForm />
        </div>
      </div>
      <div className="mt-24">
        {Array.isArray(data) && data.length > 0 ? (
          <div>
            <h2 className="my-1 text-center text-3xl font-bold ">
              Kết quả tìm kiếm
            </h2>{" "}
            <div className="mx-auto mb-8 h-1 w-1/6 rounded bg-blue-500"></div>
            <div className="my-4 flex justify-center">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {data.map((item, i) => (
                  <Item
                    key={i}
                    _id={item._id}
                    image={item.image}
                    nameTour={item.nameTour}
                    price={item.price}
                    regions={item.regions}
                    maxParticipants={item.maxParticipants}
                    startDate={item.startDate}
                    endDate={item.endDate}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Không tìm thấy kết quả nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultList;
