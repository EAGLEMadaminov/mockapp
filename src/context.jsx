import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext(null);
const allUrl = "https://themealdb.com/api/json/v1/1/search.php?s=";

const Approvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("a");
  const [showSearch, setShowSearch] = useState(false);
  const [showLimit, setShowLimit] = useState(null);
  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url);
      setMeals(data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchTerm) return;
    fetchData(`${allUrl}${searchTerm}`);
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{
        meals,
        setSearchTerm,
        setShowSearch,
        showSearch,
        searchTerm,
        setShowLimit,
        showLimit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, Approvider };
