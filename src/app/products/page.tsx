"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import CheckoutFlow from "../components/CashoutFlow";
import Reviews from "../components/Reviews";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  tags: string[];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-green-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded-md ${
            currentPage === number
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-green-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8; // Adjust this number as needed

  // Fetch products from Sanity CMS
  const fetchProducts = async () => {
    try {
      const query = `*[_type == "product"] {
        _id,
        title,
        price,
        description,
        discountPercentage,
        "imageUrl": productImage.asset->url,
        tags
      }`;

      const data = await client.fetch(query);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Reset to first page when category changes
    setCurrentPage(1);
  }, [selectedCategory]);

  // Get unique categories from products
  const categories = [
    "All",
    ...Array.from(new Set(products.flatMap((product) => product.tags))),
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.tags.includes(selectedCategory));

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.title} has been added to your cart`);
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Toggle wishlist status
  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item._id === product._id)) {
        return prevWishlist.filter((item) => item._id !== product._id);
      }
      return [...prevWishlist, product];
    });
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Section Title */}
      <h2 className="text-start text-green-700 mt-6 mb-6 text-4xl font-extrabold tracking-wide">
        Our Products
      </h2>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="text-lg font-semibold mr-3">
          Filter by Category:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl relative"
          >
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
            >
              {wishlist.some((item) => item._id === product._id) ? "❤️" : "🤍"}
            </button>

            {/* Product Image */}
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={350}
              height={320}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              {/* Product Title */}
              <h2 className="text-xl font-semibold text-gray-900">
                {product.title}
              </h2>

              {/* Product Description */}
              <p className="text-gray-600 mt-2 text-sm">
                {product.description.length > 75
                  ? product.description.slice(0, 75) + "..."
                  : product.description}
              </p>

              {/* Price and Discount */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-gray-900">
                  ${product.price}
                </p>
                {product.discountPercentage > 0 && (
                  <p className="text-sm font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                    {product.discountPercentage}% OFF
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap mt-3 gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Reviews productId={product._id} />

              {/* Add To Cart Button */}
              <button
                className="mt-5 w-full bg-green-600 text-white py-2 text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-600 text-center mt-6">
          No products found in this category.
        </p>
      )}

      {/* Cart Summary */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Cart Summary</h2>
        {cart.length > 0 ? (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center bg-white shadow-sm p-4 rounded-md"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Total Price Calculation */}
            <div className="mt-6 text-xl font-bold text-gray-800">
              Total Price: $
              {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </div>
          </>
        ) : (
          <p className="text-gray-700 text-center font-medium">
            Your cart is empty. Please add products.
          </p>
        )}
        <CheckoutFlow cart={cart} />
      </div>

      {/* Wishlist Summary */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-600 mb-6">Wishlist</h2>
        {wishlist.length > 0 ? (
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-white shadow-sm p-4 rounded-md"
              >
                <p className="font-medium text-gray-900">{item.title}</p>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 text-center font-medium">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCards;
