"use client";

import { AppDispatch } from "@/store";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMeals } from "@/provider/action/meals/meals";
import { selectError, selectLoading, selectMeals } from "@/provider/selector/meals/meals";
import { Meal } from "@/provider/type/meals/meals";

import { MealDetailPageComponent } from "@/PageComponents/MealComponents/MealDetailPageComponent";
import { CustomCard } from "@/common/card/card";
import { ROUTES } from "@/routes/Routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function MealsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const meals = useSelector(selectMeals);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [selected, setSelected] = useState<string[]>([]);
  const [itemsToShow, setItemsToShow] = useState<number>(20);
  const [dropDownM, setDropDownMeals] = useState<any[]>([]);
  const [sortedOrder, setSortedOrder] = useState<String>("asc")
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [finalMeals, setFinalMeals] = useState<any[]>(meals)

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleCheckedChange = (item: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i !== item)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("E.target.value", e.target.value)
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (meals && meals.length > 0) {
      const seen = new Set();
      const dropdownMeals = meals.filter(item => {
        if (seen.has(item.strCategory))
          return false
        seen.add(item.strCategory)
        return true
      })
      setDropDownMeals(dropdownMeals)
    }
  }, [meals])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // load next chunk
          setItemsToShow((prev) => prev + 20);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      let filtered =
        selected.length === 0
          ? meals
          : meals.filter((item) => selected.includes(item.strCategory))

      // apply search
      if (searchTerm.trim() !== "") {
        console.log("INSIDE APPLY SEARCH")
        filtered = filtered.filter(item =>
          item.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      let sorted = [...filtered].sort((a, b): any => {
        return sortedOrder == 'asc'
          ? a.strMeal.localeCompare(b.strMeal)
          : b.strMeal.localeCompare(a.strMeal)
      })

      setFinalMeals(sorted);
    }, 300);

    return () => clearTimeout(debounceTimer)
  }, [meals, searchTerm, selected, sortedOrder])


  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>Error: {error}</p>;

  // const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
  // const data = await res.json();
  // const meals: Meal[] = data.meals;

  return (
    <div className="w-[100%] m-auto text-center text-xl">
      <div className="w-[90%] m-auto flex justify-between">
        <h1>Meals</h1>
        <input
          type="text"
          placeholder="Search meal by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 m-2 rounded"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Select Numbers</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {dropDownM && dropDownM?.map((meal: Meal) => (
            <DropdownMenuCheckboxItem
              key={meal.strCategory}
              checked={selected.includes(meal.strCategory)}
              onCheckedChange={(checked) =>
                handleCheckedChange(meal.strCategory, Boolean(checked))
              }
            >
              {meal.strCategory}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Sort Meals</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={String(sortedOrder)}
            onValueChange={(value) => setSortedOrder(value as "asc" | "desc")}
          >
            <DropdownMenuRadioItem value="asc">A - Z</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">Z - A</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-wrap p-[5rem]">
        {finalMeals.map((meal: Meal) => (
        // {finalMeals.slice(0, itemsToShow).map((meal: Meal) => (
          <CustomCard
            heading={meal?.strMeal}
            image={meal?.strMealThumb}
            description={meal?.strCategory}
            href={ROUTES.getMealDetail(meal?.idMeal)}
          />
        ))}
        <div ref={loaderRef} className="h-10 bg-transparent">
          {/* sentinel for infinite loading */}
        </div>
      </div>
    </div>
  );
}
