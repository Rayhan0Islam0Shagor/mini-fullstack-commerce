import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes));
};

export const extractProductIdAndTitle = (id: string) => {
  const lastDashIndex = id.lastIndexOf('-');
  const title = id.substring(0, lastDashIndex);
  const productId = id.substring(lastDashIndex + 1);
  return { title: decodeURIComponent(title), productId };
};
