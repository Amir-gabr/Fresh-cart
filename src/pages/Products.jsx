//
//
//

import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import {
  cartContext,
  wishlistContext,
} from "../context/createContext/CreateContext";
import { userContext } from "../context/createContext/CreateContext";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";

export default function Products() {
  //
  const [products, setProducts] = useState(null);
  //
  const { token } = useContext(userContext);
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishlist } = useContext(wishlistContext);
  //
  async function getProductsData() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    // console.log(data.data);
    setProducts(data.data);
  }
  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <>
      <PageTransition>
        <section className="pb-8">
          <div className="flex flex-col justify-center items-center space-y-2 py-10">
            <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-white bg-purple-600 py-2 px-4 rounded-ss-3xl rounded-br-3xl">
              All Products
            </h1>
          </div>
          {products ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group relative overflow-hidden  rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                >
                  <div className="flex flex-col justify-between">
                    <div className="h-[290px]">
                      <img
                        className="rounded-t-lg w-full h-full object-cover"
                        src={product.imageCover}
                        alt={product.title}
                      />
                    </div>
                    <div className="py-4 px-2 h-[140px] flex flex-col justify-between ">
                      <div className="">
                        <p className="mb-1 text-base text-neutral-600 dark:text-neutral-200">
                          {product.category.name}
                        </p>
                        <h5 className="text-xl font-bold ] leading-tight text-neutral-800 dark:text-neutral-50">
                          {`${product.title.slice(-23)} ....`}
                        </h5>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-neutral-600 dark:text-neutral-200">
                          {`${product.price} Egy`}
                        </p>
                        <p className="text-lg leading-tight text-amber-500 flex items-center gap-1">
                          <FaStar />
                          <span className="text-base text-neutral-800  font-bold">
                            {product.ratingsAverage}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute w-full h-full group-hover:translate-y-[-100%] translate-y-[0]  left-0 right-0 transition duration-500 flex items-center justify-center gap-5 text-xl text-purple-500 bg-gradient-to-t from-purple-500 to-transparent">
                    {token ? (
                      <span
                        onClick={() => {
                          addProductToWishlist({ id: product._id });
                        }}
                        className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <FaHeart className="" />
                      </span>
                    ) : (
                      <Link to="/signIn">
                        <span className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                          <FaHeart className="" />
                        </span>
                      </Link>
                    )}
                    {token ? (
                      <span
                        onClick={() => {
                          addProductToCart({ id: product._id });
                        }}
                        className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <FaCartPlus className="" />
                      </span>
                    ) : (
                      <Link to="/signIn">
                        <span className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                          <FaCartPlus className="" />
                        </span>
                      </Link>
                    )}
                    <span className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                      <Link to={`/product/${product._id}`}>
                        <FaEye className="" />
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </section>
      </PageTransition>
    </>
  );
}
