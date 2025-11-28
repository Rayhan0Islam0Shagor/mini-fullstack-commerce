import { prefetchData } from '@/lib/swr-utils';
import { SWRProvider } from '@/providers/SWRProvider';
import { CategoriesList } from './components/CategoriesList';

const Categories = async () => {
  // Pre-fetch categories on the server
  const fallback = await prefetchData('/category');

  return (
    <SWRProvider fallback={fallback}>
      <CategoriesList />
    </SWRProvider>
  );
};

export default Categories;
