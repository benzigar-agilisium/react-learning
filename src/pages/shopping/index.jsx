import React from "react";
import useCart from "../../hooks/useCart";

import { AiFillShopping } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";

export default function Shopping() {
  const { carts, addToCart, isInCart, removeFromCart } = useCart();

  const [products, setProducts] = React.useState([
    {
      id: 1,
      name: "The Size of OZ : Escape",
      sub: "Oversized T-Shirts",
      price: 999,
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696593043_2816564.jpg?format=webp&w=240&dpr=1.5",
    },
    {
      id: 2,
      name: "Alien Invasion",
      sub: "Oversized T-Shirts",
      price: 999,
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1695970349_7531677.jpg?format=webp&w=240&dpr=1.5",
    },
    {
      id: 3,
      name: "Loki",
      sub: "Oversized T-Shirts",
      price: 999,
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696666520_4307307.jpg?format=webp&w=240&dpr=1.5"
    },
    {
      id: 4,
      name: "Tom & Jerry",
      sub: "Oversized T-Shirts",
      price: 999,
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1687842433_3385347.jpg?format=webp&w=240&dpr=1.5"
    },
    {
      id: 5,
      name: "Avengers",
      sub: "Oversized T-Shirts",
      price: 999,
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696059413_1526540.jpg?format=webp&w=240&dpr=1.5"
    },
  ]);

  return (
    <div className="mt-5 container mx-auto px-3">
      <div className="flex items-center">
        <AiFillShopping className="text-2xl mr-2" />
        <div className="font-bold text-xl">Shopping</div>
      </div>
      <div className="mt-4 flex flex-wrap">
        {products?.map((e) => (
          <div className="w-full lg:w-1/4 hover:bg-zinc-900 rounded-md pr-3 mb-5">
            <div className="relative">
              <div className="absolute top-0 right-0">
                {isInCart(e.id) ? (
                  <button
                    onClick={() => {
                      removeFromCart(e.id);
                    }}
                    className="m-2 text-lg bg-green-500 font-bold text-white p-2 rounded-full"
                  >
                    <BsFillCartCheckFill />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCart(e);
                    }}
                    className="m-2 text-lg bg-red-500 font-bold text-white p-2 rounded-full"
                  >
                    <BsFillCartPlusFill />
                  </button>
                )}
              </div>
              <img className="rounded-md w-full" src={e.image} alt="" />
              <h1 className="font-bold text-sm mt-2 w-full truncate">
                {e.name}
              </h1>
              <p className="mt-1 text-xs">{e.sub}</p>
              <p className="font-bold">Rs. {e.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
