interface HeroDescriptionProps {
  description: string;
}

const HeroDescription = ({ description }: HeroDescriptionProps) => {
  return (
    <p className="text-xs lg:text-sm mt-3 mb-6 text-gray-700 leading-relaxed max-w-lg">
      {description}
    </p>
  );
};

export default HeroDescription;

