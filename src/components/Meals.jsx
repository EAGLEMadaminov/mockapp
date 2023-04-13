import React from "react";
import { useGlobalContext } from "../context";
import GetMeals from "./GetMeals";

const Users = () => {
  const { showSearch } = useGlobalContext();
  return (
    <div>
      <div className="section-center">{showSearch ? "" : <GetMeals />}</div>
    </div>
  );
};

export default Users;
