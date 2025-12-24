import logoImage from "@/assets/logo-pranoova.png";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <img
      src={logoImage}
      alt="Pranoova"
      className={`h-8 w-auto ${className}`}
    />
  );
};

export default Logo;
