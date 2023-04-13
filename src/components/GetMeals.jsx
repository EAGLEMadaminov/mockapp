import React from "react";
import { useGlobalContext } from "../context";

function GetMeals() {
  let { meals, showLimit} = useGlobalContext();
  if (showLimit) meals = meals.slice(0, showLimit);
  return (
    <div className="section-center">
      {meals.map((meal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;
        return (
          <article id="idMeal" className="item">
            <h1>{title}</h1>
            <img src={image} alt={title} />
          </article>
        );
      })}
    </div>
  );
}

export default GetMeals;
