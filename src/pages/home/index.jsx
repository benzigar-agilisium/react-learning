import React from "react";
import { Link } from "react-router-dom";

import Ripples from "react-ripples";
import {
  AiFillAppstore,
  AiFillCloseCircle,
  AiOutlineShop,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaRegMoneyBill1, FaVideo } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { BsFillFileEarmarkImageFill } from "react-icons/bs";

const Home = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="px-3 py- mt-5 container mx-auto">
        <h1 className="font-bold text-xl lg:text-3xl">Pick the App,</h1>
        <div className="mt-5 flex flex-wrap items-center">
          <Link to={"/tasks"} className="w-1/2 mb-2 lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <FaTasks className="text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">Task Tracker</p>
            </div>
          </Link>
          <Link to={"/emi"} className="w-1/2 mb-2 lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <FaRegMoneyBill1 className="text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">EMI Calculator</p>
            </div>
          </Link>
          <Link to={"/gallery"} className="w-1/2 mb-2  lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <FaVideo className="text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">Video Gallery</p>
            </div>
          </Link>
          <Link to={"/shopping"} className="w-1/2 mb-2  lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <AiOutlineShop className="text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">Shopping Cart</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
