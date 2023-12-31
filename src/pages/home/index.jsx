import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineShop, AiOutlineTable } from "react-icons/ai";
import { FaRegMoneyBill1, FaVideo } from "react-icons/fa6";
import { BsFillKanbanFill } from "react-icons/bs";

const Home = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="px-3 py- mt-5 container mx-auto">
        <h1 className="font-bold text-xl lg:text-3xl">Pick the App,</h1>
        <div className="mt-5 flex flex-wrap items-center">
          <Link to={"/kanban"} className="w-1/2 mb-2 lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <BsFillKanbanFill className="shadow-2xl shadow-blue-800 text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">Board</p>
            </div>
          </Link>
          <Link to={"/tasks"} className="w-1/2 mb-2 lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <AiOutlineTable className="shadow-2xl shadow-blue-800 text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">React Table</p>
            </div>
          </Link>
          <Link to={"/emi"} className="w-1/2 mb-2 lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <FaRegMoneyBill1 className="shadow-2xl shadow-blue-800  text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">EMI Calculator</p>
            </div>
          </Link>
          <Link to={"/gallery"} className="w-1/2 mb-2  lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <FaVideo className="shadow-2xl shadow-blue-800  text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">Video Gallery</p>
            </div>
          </Link>
          <Link to={"/shopping"} className="w-1/2 mb-2  lg:w-1/4 pr-2">
            <div className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer p-5 lg:py-10 lg:px-8 rounded-md">
              <AiOutlineShop className="shadow-2xl shadow-blue-800  text-2xl lg:text-5xl" />
              <p className="text-sm font-bold mt-2 lg:mt-5">Shopping Cart</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
