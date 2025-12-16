import { FiChevronDown } from 'react-icons/fi';
import ProductSearch from './product-search';

const CategorySearch = () => {
  return (
    <div className="bg-white text-[#ABA3A3] w-[534px] h-[39px] rounded-[6px] overflow-visible items-stretch lg:flex hidden">
      <button
        type="button"
        className="border-r border-[#AEAEAE] px-4 flex items-center cursor-pointer"
      >
        <span className="text-sm text-[#ABA3A3] mr-1.5">All Categories</span>
        <FiChevronDown className="w-4 h-4 text-[#C2C2C2]" />
      </button>

      <ProductSearch />
    </div>
  );
};

export default CategorySearch;
