import { axiosInstance } from "@/api/apiInstance";


export const mealService = {

  // Fetch meals by first letter
  getMealsByLetter: (letter: string = "c") =>
    axiosInstance.get(`/search.php?f=${letter}`),

  // Fetch single meal by ID
  getMealById: (id: string) =>
    axiosInstance.get(`/lookup.php?i=${id}`),

  // Fetch meals by category
  getMealsByCategory: (category: string) =>
    axiosInstance.get(`/filter.php?c=${category}`),

  // Search meals by name
  searchMealsByName: (name: string) =>
    axiosInstance.get(`/search.php?s=${name}`)

}
