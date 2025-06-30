import Link from "next/link";
import { JSX } from "react";

interface CardProps {
  heading?: string;
  image?: string;
  description?: string;
  href?: any
}

export const CustomCard: React.FC<CardProps> = ({
  heading,
  image,
  description,
  href
}) => {
  return (
    <Link href={href}>
      <div className="cursor-pointer rounded-md w-[250px] bg-white m-[5rem] ">
        <div className="py-[5px] text-red-400 text-base text-center font-bold ">
          <h2>{heading}</h2>
        </div>
        <div className="">
          <img className="m-auto px-[5px] w-[100%]" src={image} />
        </div>
        <div className="py-[3px] text-red-400 text-base text-center">
          <p>{description}</p>
        </div>
      </div>
    </Link>
  )
}