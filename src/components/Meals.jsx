import React from "react";
import { useGlobalContext } from "../context";
import GetMeals from "./GetMeals";

const Users = () => {
  const { showSearch, loading } = useGlobalContext();
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <div>
      <div className="section-center">{showSearch ? "" : <GetMeals />}</div>
    </div>
  );
};

export default Users;
