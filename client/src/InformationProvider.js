import { createContext, useEffect, useState } from "react";
// import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const InformationContext = createContext(null);

export const InformationProvider = ({ children }) => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  console.log("running provider");
  const [latestUser, setLatestUser] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [categories, setCategories] = useState([
    "All",
    "Real Estate",
    "Vehicles",
    "Toys",
  ]);

  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    fetch("/api/get-all")
      .then(async (res) => res.json())
      .then(async (data) => {
        setAllItems(data.data);
      })
      .catch((error) => {
        console.log("error message", error);
      });
  }, []);

  useEffect(() => {
    console.log("User in use effect", user);
    if (user) {
      console.log("inside the if");
      setLatestUser(user);
      createUserinDb(user).then((res) => {});
    }
  }, [user]);

  const createUserinDb = async (user) => {
    try {
      const body = {
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
      };
      const rawRes = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const res = await rawRes.json();
      console.log("resaaa", res.data._id);
      setCurrentUserId(res.data._id);
    } catch (err) {
      console.log(err, "Error");
    }
  };

  // const createUserinDb = async (user) => {
  //   console.log("user in create user", user);
  //   const rawRes = await fetch("api/create-user", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       email: user.email,
  //     },
  //   });
  //   const res = await rawRes.json();
  //   console.log("rea", res);
  // };

  // console.log("ALL ITEMS", allItems);

  return (
    <InformationContext.Provider
      value={{
        latestUser,
        setLatestUser,
        createUserinDb,
        categories,
        allItems,
        user,
        loginWithRedirect,
        isAuthenticated,
        logout,
        currentUserId,
      }}
    >
      {children}
    </InformationContext.Provider>
  );
};

export default InformationProvider;
