"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { createClient } from "@sanity/client";

// ✅ Initialize Sanity Client
const sanityClient = createClient({
  projectId: "heprv8oo", // Replace with your actual Project ID
  dataset: "production",        // Change if using a different dataset
  useCdn: true,                 // Enables caching for faster reads
  apiVersion: "2025-01-13",      // Use a recent API version
});

// ✅ Define Product Type
type Product = {
  _id: string;
  name?: string; // Optional to avoid undefined errors
  tags?: string[];
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // ✅ Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => { 
      try {
        const data: Product[] = await sanityClient.fetch(
          `*[_type == "product"]{ _id, name, tags }`
        );
        console.log("Fetched products:", data); // Debugging
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Search Logic
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    setFilteredProducts(
      products.filter((product) => {
        if (!product.name) return false; // Skip products without a name
        const productName = product.name.toLowerCase();
        const productTags = product.tags?.map(tag => tag.toLowerCase()) || [];

        return (
          productName.includes(query.toLowerCase()) ||
          productTags.some(tag => tag.includes(query.toLowerCase()))
        );
      })
    );
  }, [query, products]);

  return (
    <div className="w-full max-w-lg mx-auto mt-5">
      {/* ✅ Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* ✅ Search Results */}
      {query && (
        <ul className="mt-3 bg-white shadow-lg rounded-lg overflow-hidden">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product._id} className="p-3 border-b last:border-none hover:bg-gray-100">
                {product.name || "Unnamed Product"}
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-500">No products found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
