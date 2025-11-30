interface RemoveButtonProps {
  onClick: () => void;
  className?: string;
}

const RemoveButton = ({ onClick, className = '' }: RemoveButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-red-600 hover:text-red-700 text-xs font-medium transition-colors ${className}`}
    >
      Remove
    </button>
  );
};

export default RemoveButton;

