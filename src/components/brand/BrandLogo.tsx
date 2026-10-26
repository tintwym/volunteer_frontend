import Image from "next/image";

type BrandLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** CommonGround mark — gold hands + heart family icon. */
export function BrandLogo({ size = 40, className = "", priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/logo.png"
      alt="CommonGround"
      width={size}
      height={size}
      priority={priority}
      className={`rounded-xl object-cover shadow-sm ring-1 ring-black/5 ${className}`.trim()}
    />
  );
}
