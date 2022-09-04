import { createContext, useEffect, useState } from "react";
// import { useState } from "react";

export const InformationContext = createContext(null);

export const InformationProvider = ({ children }) => {
  const [latestUser, setLatestUser] = useState();

  const [categories, setCategories] = useState([
    "All",
    "Real Estate",
    "Vehicles",
    "Toys",
  ]);

  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    fetch("/api/get-all-products")
      .then(async (res) => res.json())
      .then(async (data) => {
        setAllItems(data.data);
      })
      .catch((error) => {
        console.log("error message", error);
      });
  }, []);

  const createUserinDb = async (user) => {
    const rawRes = await fetch("api/create-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    }).then(function (res) {
      return res.json();
    });
  };

  // console.log("ALL ITEMS", allItems);

  return (
    <InformationContext.Provider
      value={{
        latestUser,
        setLatestUser,
        createUserinDb,
        categories,
        allItems,
      }}
    >
      {children}
    </InformationContext.Provider>
  );
};

export default InformationProvider;
