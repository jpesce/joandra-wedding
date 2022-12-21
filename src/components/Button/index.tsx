interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return (
    <button className="min-h-[2.5rem] text-white px-5 border border-white rounded-full hover:text-joanGreen-500 hover:bg-white transition select-none">
      {label}
    </button>
  );
};

export default Button;
