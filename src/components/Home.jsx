import React, { useState } from "react";
import "./styles.css";
import Search from "./Search";
import { useGlobalContext } from "../context";

function Home() {
  const { meals, showSearch, setShowLimit } = useGlobalContext();
  if (!meals) {
    return <h1 className="text-dark">This meal dosn't exist</h1>;
  }
  const changeValue = (e) => {
    setShowLimit(e.target.value);
  };
  return (
    <div>
      <header className="header">
        <div className="nav">
          <Search />
          <select name="" id="" onChange={changeValue}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/meals">Meals</a>
            </li>
          </ul>
        </div>
      </header>

      {showSearch ? (
        <div className="section-center">
          {meals.map((meal) => {
            const { idMeal, strMeal: title, strMealThumb: image } = meal;
            return (
              <article id={idMeal} className="item">
                <h1>{title}</h1>
                <img src={image} alt={title} />
              </article>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
