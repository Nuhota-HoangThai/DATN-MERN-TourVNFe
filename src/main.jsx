import {} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//import TourContextProvider from "./context/TourContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <TourContextProvider>
  // <React.StrictMode>
  <App />,
  //</React.StrictMode>
  // </TourContextProvider>
);
