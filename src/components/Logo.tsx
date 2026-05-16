import Image from "next/image";

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}

export function Logo({
  size = 96,
  withWordmark = false,
  className,
}: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label="Lumenari"
    >
      <Image
        src="/logo.png"
        alt="Lumenari"
        width={size}
        height={size}
        priority
        className="rounded-full"
      />
      {withWordmark ? (
        <span className="font-semibold tracking-tight text-2xl">Lumenari</span>
      ) : null}
    </span>
  );
}
