import { useState } from "react";
import { formatPrice } from "../../../utils/formatPrice";

const Chatbot = ({ toursToCompare }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Xin chào quý khách, quý khách muốn đi du lịch ở đâu? Lựa chọn: Miền Bắc, Miền Trung, Miền Nam",
      sender: "bot",
    },
  ]);
  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.stopPropagation();
    const newUserMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    generateResponse(userInput);
    setUserInput("");
  };

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let responseText = "";

    switch (step) {
      case 1:
        const regionMatch = ["miền bắc", "miền trung", "miền nam"].find(
          (region) => lowerInput.includes(region),
        );
        if (regionMatch) {
          setSelectedRegion(regionMatch);
          responseText = `Bạn đã chọn ${regionMatch}. Quý khách muốn biết thông tin về giá, ngày đi, hay số lượng chỗ?`;
          setStep(2);
        } else {
          responseText =
            "Vui lòng chọn một trong các khu vực sau: Miền Bắc, Miền Trung, Miền Nam, hoặc hỏi về giá, ngày đi, số chỗ.";
        }
        break;
      case 2:
        const priceMatch = lowerInput.match(/\d+/);
        if (priceMatch) {
          const inputPrice = parseInt(priceMatch[0], 10);
          // Filter tours by region and price
          const matchingTours = toursToCompare.filter(
            (tour) =>
              tour.region.toLowerCase() === selectedRegion &&
              tour.price <= inputPrice,
          );
          if (matchingTours.length > 0) {
            responseText = matchingTours
              .map(
                (tour) => `${tour.nameTour} với giá ${formatPrice(tour.price)}`,
              )
              .join(", ");
          } else {
            const closestTours = toursToCompare
              .filter(
                (tour) =>
                  tour.region.toLowerCase() === selectedRegion &&
                  tour.price > inputPrice,
              )
              .sort((a, b) => a.price - b.price)
              .slice(0, 3);
            if (closestTours.length > 0) {
              responseText =
                "Không có tour với giá thấp hơn số bạn đã nhập. Gần nhất là: " +
                closestTours
                  .map(
                    (tour) =>
                      `${tour.nameTour} với giá ${formatPrice(tour.price)}`,
                  )
                  .join(", ");
            } else {
              responseText = "Không có tour nào phù hợp với yêu cầu của bạn.";
            }
          }
        } else {
          responseText = "Vui lòng nhập một mức giá cụ thể.";
        }
        break;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: responseText, sender: "bot" },
    ]);
  };

  return (
    <div
      className="relative h-full w-full max-w-md rounded-md border bg-sky-300 p-4 md:h-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative   text-black ">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message flex items-end ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`mx-1 my-4 rounded-lg px-2 py-2 ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-black"}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between p-4">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 rounded-full border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          className="ml-4 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
