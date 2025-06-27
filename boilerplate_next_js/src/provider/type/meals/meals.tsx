export interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

export interface MealsState {
  loading: boolean;
  meals: Meal[];
  mealDetail: Meal | null;
  error: string | null;
}
