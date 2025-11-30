interface SubtotalLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SubtotalLabel = ({ children, className = '' }: SubtotalLabelProps) => {
  return (
    <span className={`text-gray-600 ${className}`}>
      {children}
    </span>
  );
};

export default SubtotalLabel;

