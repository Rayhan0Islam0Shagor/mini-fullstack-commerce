interface EmptyCartMessageProps {
  children: React.ReactNode;
  className?: string;
}

const EmptyCartMessage = ({ children, className = '' }: EmptyCartMessageProps) => {
  return (
    <p className={`text-gray-600 ${className}`}>
      {children}
    </p>
  );
};

export default EmptyCartMessage;

