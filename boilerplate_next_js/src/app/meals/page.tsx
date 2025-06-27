"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { MealDetailPageComponent } from "../../pageComponents/mealComponents/MealDetailPageComponent";
import { fetchMeals } from "@/provider/action/meals/meals";
import { selectError, selectLoading, selectMeals } from "@/provider/selector/meals/meals";
import { Meal } from "@/provider/type/meals/meals";

export default function MealsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const meals = useSelector(selectMeals);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>Error: {error}</p>;
  // const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
  // const data = await res.json();
  // const meals: Meal[] = data.meals;

  return (
    <div>
      <h1>Meals</h1>
      <ul>
        {meals.map((meal: Meal) => (
          <li key={meal.idMeal}>
            {/* <Link href={`/meals/${meal.idMeal}`}>{meal.strMeal}</Link> */}
            <MealDetailPageComponent id={meal.idMeal} name={meal.strMeal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
