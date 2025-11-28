"use client";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const CategorySearch = () => {
  return (
    <div className="bg-white text-[#ABA3A3] w-[534px] h-[39px] rounded-[6px] overflow-hidden  items-stretch lg:flex hidden">
      <button
        type="button"
        className="border-r border-[#AEAEAE] px-4 flex items-center cursor-pointer"
      >
        <span className="text-sm text-[#ABA3A3] mr-1.5">All Categories</span>
        <FiChevronDown className="w-4 h-4 text-[#C2C2C2]" />
      </button>

      <div className="flex-1 flex items-stretch">
        <input
          type="text"
          className="flex-1 h-full outline-none placeholder:text-[#ABA3A3] px-3 focus:outline-none border-0 text-sm"
          placeholder="Search for a product"
        />
        <button
          type="button"
          className="px-1.5 bg-[#B6B6B6] flex items-center justify-center"
        >
          <FiSearch className="size-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CategorySearch;
