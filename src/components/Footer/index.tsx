import Copyright from "../../../public/copyright.react.svg";

function Footer(): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-16 border-t border-joanGreen-600 px-8 py-10 text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white lg:p-20">
      <Copyright className="w-[17rem]" />
    </div>
  );
}

export default Footer;
