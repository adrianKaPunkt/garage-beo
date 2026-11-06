import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "outline" | "light";
type Size = "default" | "large";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  showArrow?: boolean;
  className?: string;
};

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type Props = LinkProps | NativeButtonProps;

const baseStyles = [
  "group inline-flex items-center justify-center gap-3",
  "whitespace-nowrap rounded-xl border-0",
  "font-extrabold",
  "transition-[transform,box-shadow,background-color]",
  "duration-200 ease-out",
  "hover:-translate-y-0.5",
  "hover:shadow-[0_10px_20px_#143f112b]",
  "active:translate-y-0 active:scale-[0.98]",
  "focus-visible:outline-2 focus-visible:outline-offset-3",
  "focus-visible:outline-green",
  "motion-reduce:transform-none",
  "motion-reduce:transition-none",
].join(" ");

const variants: Record<Variant, string> = {
  primary: "bg-[linear-gradient(120deg,#53b914,#288f06)] text-white",

  outline: "border-[1.5px] border-green bg-white text-darkgreen",

  light: "bg-white text-darkgreen",
};

const sizes: Record<Size, string> = {
  default: "min-h-[46px] px-[21px] py-3 text-sm",
  large: "min-h-[57px] px-[27px] py-[14px] text-base",
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="
        h-4 w-4 shrink-0
        transition-transform duration-200
        group-hover:translate-x-1
        motion-reduce:transition-none
        motion-reduce:transform-none
      "
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function Button(props: Props) {
  const {
    children,
    variant = "primary",
    size = "default",
    showArrow = false,
    className = "",
  } = props;

  const classes = [baseStyles, variants[variant], sizes[size], className].join(
    " ",
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <Arrow />}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const {
      href,
      children: _children,
      variant: _variant,
      size: _size,
      showArrow: _showArrow,
      className: _className,
      ...rest
    } = props;

    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  const {
    children: _children,
    variant: _variant,
    size: _size,
    showArrow: _showArrow,
    className: _className,
    type = "button",
    ...rest
  } = props as NativeButtonProps;

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
