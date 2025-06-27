'use client'
import { ROUTES } from "@/routes/Routes";
import Link from "next/link";

export const MealDetailPageComponent = ({ id, name }: { id: string; name: string }) => {
  return (
    <Link href={ROUTES.getMealDetail(id)}>
      {name}
    </Link>
  )

}
