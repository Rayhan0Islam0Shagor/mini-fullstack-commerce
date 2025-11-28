interface HeroBackgroundProps {
  banner: string;
}

const HeroBackground = ({ banner }: HeroBackgroundProps) => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-right bg-no-repeat"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-[#F7F1CD]/80 to-[#F8F4DE]/60 lg:to-transparent" />
    </div>
  );
};

export default HeroBackground;
