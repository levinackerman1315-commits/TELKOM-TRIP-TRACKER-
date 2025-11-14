interface TelkomLogoProps {
  variant?: 'color' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
};

export const TelkomLogo = ({ 
  variant = 'color', 
  size = 'md',
  className = '' 
}: TelkomLogoProps) => {
  const logoSrc = variant === 'white' 
    ? '/logo-telkom-akses-white.png' 
    : '/logo-telkom-akses.png';
  
  return (
    <img 
      src={logoSrc}
      alt="Telkom Akses" 
      className={`w-auto ${sizeClasses[size]} ${className}`}
      onError={(e) => {
        // Fallback jika logo belum ada
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};
