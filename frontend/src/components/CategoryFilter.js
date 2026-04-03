/**
 * CategoryFilter Component
 * ========================
 * Renders a row of filter buttons for product categories.
 * Includes \"All Products\" plus dynamic categories from the Fake Store API.
 * Active category is visually highlighted with an orange background.
 * Dispatches setCategory action to update the global filter state.
 */

import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/slices/filtersSlice";

const CategoryFilter = ({ categories }) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector(state => state.filters);

  const handleClick = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      <button
      onClick={() => handleClick("all")}
       className={`px-4 py-2 border ${
       selectedCategory === "all" ? "bg-orange-500 text-white" : "text-white"
         }`}
     >
    All
    </button>
   {categories && categories.length > 0 && categories.map((cat, index) => (
  <button
    key={index}
    onClick={() => handleClick(cat)}
    className={`px-4 py-2 border ${
      selectedCategory === cat ? 'bg-orange-500 text-white' : 'text-white'
    }`}
  >
    {cat}
  </button>
))}
     
    </div>
  );
};

export default CategoryFilter; 