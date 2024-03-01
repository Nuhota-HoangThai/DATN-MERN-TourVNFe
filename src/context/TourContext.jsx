import { createContext, useEffect, useState } from "react";

import { BASE_URL } from "../utils/config";

// phan loai dia diem 3 mien
export const TourContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const TourContextProvider = (props) => {
  const [allTour, setAllTour] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [user, setUser] = useState(null);

  useEffect(() => {
    //
    const authToken = localStorage.getItem("auth-token");

    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    //
    fetch(`${BASE_URL}/tour/getAllTours`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched data:", data);
        setAllTour(data);
      });

    if (authToken) {
      fetch(`${BASE_URL}/cart/getCart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("auth-token");

    setIsLoggedIn(false);

    setCartItems(getDefaultCart());
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    if (localStorage.getItem("auth-token")) {
      fetch(`${BASE_URL}/cart/addToCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${BASE_URL}/cart/removeFromCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  // so luong hang trong gio hien tren thanh navbar
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    logout,
    isLoggedIn,
    getTotalCartItems,
    allTour,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <TourContext.Provider value={contextValue}>
      {props.children}
    </TourContext.Provider>
  );
};

export default TourContextProvider;
