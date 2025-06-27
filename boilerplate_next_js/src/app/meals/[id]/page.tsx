'use client';

import { fetchMealDetail } from "@/provider/action/meals/meals";
import { selectError, selectLoading, selectMealDetail } from "@/provider/selector/meals/meals";
import { AppDispatch } from "@/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const meal = useSelector(selectMealDetail);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (id) dispatch(fetchMealDetail(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!meal) return <p>Meal not found.</p>;

  return (
    <div>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width={300} />
      <p>{meal.strInstructions.slice(0, 300)}...</p>
    </div>
  );
}
