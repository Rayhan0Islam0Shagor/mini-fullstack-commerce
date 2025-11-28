import { motion } from 'motion/react';

interface HeroTitleProps {
  title: string;
}

const HeroTitle = ({ title }: HeroTitleProps) => {
  const prefix = title.split("'")[0];
  const quotedText =
    title.match(/'([^']+)'/)?.[1] ||
    title.split("'")[1] ||
    'Computer & experience';

  return (
    <h1 className="text-4xl lg:text-6xl leading-tight">
      <span className="text-black">{prefix}</span>
      <span className="text-[#4A90E2]">{quotedText}</span>
    </h1>
  );
};

export default HeroTitle;

