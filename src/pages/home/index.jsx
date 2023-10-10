import React from "react";
import {
  Link,
} from "react-router-dom";

import Ripples from "react-ripples";
import {
  AiFillAppstore,
  AiFillCloseCircle,
  AiOutlineShop,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaRegMoneyBill1, FaVideo } from "react-icons/fa6";
import { BsFillFileEarmarkImageFill } from "react-icons/bs";

const Home = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="px-3 py- mt-5 container mx-auto">
        <h1 className="font-bold text-3xl">Pick the App,</h1>
        <div className="mt-5 flex items-center">
          <Link to={"/emi"} className="w-1/4 pr-2">
            <div className="bg-zinc-800 hover:bg-zinc-900 cursor-pointer p-5 py-10 px-8 rounded-md">
              <FaRegMoneyBill1 className="text-5xl" />
              <p className="font-bold mt-5">EMI Calculator</p>
            </div>
          </Link>
          <Link to={"/gallery"} className="w-1/4 pr-2">
            <div className="bg-zinc-800 hover:bg-zinc-900 cursor-pointer p-5 py-10 px-8 rounded-md">
              <FaVideo className="text-5xl" />
              <p className="font-bold mt-5">Video Gallery</p>
            </div>
          </Link>
          <Link to={"/shopping"} className="w-1/4 pr-2">
            <div className="bg-zinc-800 hover:bg-zinc-900 cursor-pointer p-5 py-10 px-8 rounded-md">
              <AiOutlineShop className="text-5xl" />
              <p className="font-bold mt-5">Shopping Cart</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
