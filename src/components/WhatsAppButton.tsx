'use client';

interface WhatsAppButtonProps {
  message: string;
  text: string;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'secondary';
  className?: string;
  showIcon?: boolean;
}

export default function WhatsAppButton({ 
  message, 
  text,
  size = 'default',
  variant = 'default',
  className = 'Hamid khan',
  showIcon = true
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+93708927241'; // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Size classes
  const sizeClasses = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8 text-base',
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  };

  return (
    <button
      type="button"
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {showIcon && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )}
      {text}
    </button>
  );
}