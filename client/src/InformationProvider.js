import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const InformationContext = createContext(null);

export const InformationProvider = ({ children }) => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  console.log("running provider");
  const [latestUser, setLatestUser] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const [profileInfo, setProfileInfo] = useState([]);
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
  console.log("this is the USER", user);

  useEffect(() => {
    console.log("Hello im on");
    console.log("current id in get profile info", currentUserId);

    const getProfileInfo = async () => {
      const response = await fetch(`/api/get-user-info/${currentUserId}`);
      const result = await response.json();
      console.log("Product Response", result);
      console.log("Product Response DATA USer Info", result.data.userInfo);
      setProfileInfo(result.data.userInfo);
      setLoaded(true);
    };
    if (user) {
      getProfileInfo();
    }
    console.log("Profile Info", profileInfo);
  }, [currentUserId]);

  return (
    <InformationContext.Provider
      value={{
        profileInfo,
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
