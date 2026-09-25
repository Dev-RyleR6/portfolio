import Image from "next/image";

type AvatarLabelGroupProps = {
  size?: "sm" | "md" | "lg";
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  titleAs?: "h1" | "p";
  priority?: boolean;
  className?: string;
};

const avatarSizes = {
  sm: 72,
  md: 120,
  lg: 144,
} as const;

export function AvatarLabelGroup({
  size = "md",
  src,
  alt,
  title,
  subtitle,
  titleAs: Title = "p",
  priority = false,
  className,
}: AvatarLabelGroupProps) {
  const classes = ["avatar-label-group", `avatar-label-group--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="avatar-label-group__avatar">
        <Image
          src={src}
          width={avatarSizes[size]}
          height={avatarSizes[size]}
          alt={alt}
          className="avatar-label-group__image"
          priority={priority}
        />
      </div>
      <div className="avatar-label-group__content">
        <Title className="avatar-label-group__title">{title}</Title>
        {subtitle ? <p className="avatar-label-group__subtitle">{subtitle}</p> : null}
      </div>
    </div>
  );
}
