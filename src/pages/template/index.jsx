import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import {
  AiFillAppstore,
  AiFillCloseCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCart, BiMenu } from "react-icons/bi";

import useCart from "../../hooks/useCart";

export default function Template() {
  const { carts, removeFromCart } = useCart();

  const [showMenu, setShowMenu] = React.useState(false);
  const [showCart, setShowCart] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {showMenu ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50">
          <div className="bg-zinc-800 h-full p-4 px-8 w-full lg:w-1/3 flex flex-col">
            <div className="flex justify-between items-center text-lg lg:text-3xl  pb-3  border-b-2 border-zinc-700">
              <div className="flex items-center">
                <AiFillAppstore className="mr-2" />
                <p className="flex-1 font-bold">Apps List</p>
              </div>
              <button
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                <AiFillCloseCircle />
              </button>
            </div>
            <div
              onClick={() => {
                setShowMenu(false);
                navigate("/emi");
              }}
              className="py-3 px-5 hover:bg-zinc-700"
            >
              Emi Calculator
            </div>
            <div
              onClick={() => {
                setShowMenu(false);
                navigate("/gallery");
              }}
              className="py-3 px-5 hover:bg-zinc-700"
            >
              Video Gallery
            </div>
            <div
              onClick={() => {
                setShowMenu(false);
                navigate("/shopping");
              }}
              className="py-3 px-5 hover:bg-zinc-700"
            >
              Shopping Cart
            </div>
          </div>
          <div
            onClick={() => {
              setShowMenu(false);
            }}
            className="flex flex-1 h-full"
          ></div>
        </div>
      ) : null}
      {showCart ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50">
          <div
            onClick={() => {
              setShowCart(false);
            }}
            className="flex flex-1 h-full"
          ></div>
          <div className="bg-zinc-800 h-full p-4 px-8 w-full lg:w-1/3 flex flex-col">
            <div className="flex justify-between items-center text-xl  pb-3  border-b-2 border-zinc-700">
              <div className="flex items-center">
                <BiCart className="mr-2" />
                <p className="flex-1 font-bold">Cart List</p>
              </div>
              <button
                onClick={() => {
                  setShowCart(false);
                }}
              >
                <AiFillCloseCircle />
              </button>
            </div>
            <div className="flex flex-col flex-1 overflow-y-scroll">
              {carts?.length === 0 ? (
                <p className="text-center mt-5">Cart is empty</p>
              ) : null}
              {carts?.map((e) => (
                <div className="flex my-2 p-2">
                  <img className="w-1/4 rounded-l-md" src={e.image} alt="" />
                  <div className="bg-black rounded-r-md p-3 flex-1 flex flex-col justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold">{e.name}</p>
                      <p className="text-xs opacity-75">{e.sub}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-lg">Rs.{e.price}</p>
                      <button
                        onClick={() => {
                          removeFromCart(e.id);
                        }}
                        className="bg-red-500 px-2 py-1 text-xs rounded-full ml-3 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {carts && carts?.length > 0 ? (
              <p className="text-right p-3 font-bold text-xl">
                Total :{" "}
                {parseInt(
                  carts.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.price;
                  }, 0)
                ).toLocaleString()}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-40 bg-zinc-900">
          <div className="py-3 border-b-2 border-zinc-800 px-3 flex items-center justify-between container mx-auto">
            <div className="flex items-center">
              <button
                className="hover:bg-zinc-800 p-2 rounded-full mr-2"
                onClick={() => {
                  setShowMenu(true);
                }}
              >
                <BiMenu className="text-2xl" />
              </button>

              <Link to={"/"} className="font-bold text-lg lg:text-xl">
                Home
              </Link>
              {location.pathname.includes("emi") ||
              location.pathname.includes("gallery") ||
              location.pathname.includes("shopping") ? (
                <p className="text-blue-300 font-bold text-sm lg:text-xl ml-2">
                  {" "}
                  {location.pathname?.includes("emi") ? "/ Emi" : ""}
                  {location.pathname?.includes("gallery") ? "/ Gallery" : ""}
                  {location.pathname?.includes("shopping")
                    ? "/ Shopping Cart"
                    : ""}
                </p>
              ) : null}
            </div>
            <button
              onClick={() => {
                setShowCart(true);
              }}
              className="text-xs flex items-center"
            >
              <div className="relative p-3">
                {carts && carts?.length > 0 ? (
                  <div className="h-6 w-6 bg-red-500 flex justify-center items-center font-bold text-xs rounded-full absolute top-0 right-0">
                    <p>{carts?.length}</p>
                  </div>
                ) : null}
                <AiOutlineShoppingCart className="text-2xl" />
              </div>
            </button>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="w-1/3"></div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
