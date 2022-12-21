interface ButtonProps {
  label: string;
  href?: string;
}

const BUTTON_STYLE = "min-h-[2.5rem] text-white px-5 border border-white rounded-full hover:text-joanGreen-500 hover:bg-white transition select-none"

const Button = ({ label, href }: ButtonProps) => {
  const type = href ? "a" : "button";

  if(type === "a") {
    return (
      <a href={href} className={`${BUTTON_STYLE} inline-flex items-center`}>
        {label}
      </a>
    );
  }

  if(type === "button") {
    return (
      <button className={BUTTON_STYLE}>
        {label}
      </button>
    );
  }

  return <></>
};

export default Button;
