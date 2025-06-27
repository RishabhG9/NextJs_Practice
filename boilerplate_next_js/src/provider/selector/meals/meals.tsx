import { RootState } from "@/store";

export const selectMeals = (state: RootState) => state?.meals?.meals;
export const selectLoading = (state: RootState) => state?.meals?.loading;
export const selectError = (state: RootState) => state?.meals?.error;
export const selectMealDetail = (state: RootState) => state?.meals?.mealDetail;