interface CloseButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

const CloseButton = ({
  onClick,
  ariaLabel = 'Close cart',
}: CloseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      aria-label={ariaLabel}
    >
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
};

export default CloseButton;
