export function Button({ children, variant = "default", className = "", ...props }) {
    const baseStyles = "px-4 py-2 rounded-sm transition-colors duration-200 font-medium";
    const variantStyles = {
      default: "bg-sage text-cream hover:bg-cream hover:text-sage",
      outline: "border-2"
    };
  
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }