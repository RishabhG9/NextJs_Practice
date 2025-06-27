import axios from "axios";
import { AppDispatch } from "@/store";
import { setError, setLoading, setMealDetail, setMeals } from "@/provider/reducer/meals/meals";
import { mealService } from "@/api/services/meals/mealService";

// -------- OLD STYLE------
// export const fetchMeals = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(setLoading(true));
//     const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
//     dispatch(setMeals(res.data.meals));
//   } catch (error: any) {
//     dispatch(setError(error.message || "Failed to fetch meals"));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };


export const fetchMeals = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await mealService.getMealsByLetter("c");
    dispatch(setMeals(res?.data?.meals));
  } catch (error: any) {
    dispatch(setError(error.message || "Failed to fetch meals"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchMealDetail = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await mealService.getMealById(id);
    dispatch(setMealDetail(res?.data?.meals?.[0] || null));
  } catch (error: any) {
    dispatch(setError(error.message || "Failed to fetch meal"));
  } finally {
    dispatch(setLoading(false));
  }
};