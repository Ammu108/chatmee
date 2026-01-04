import LOGO from "../../assets/chatmee-logo.png";

const AuthNavbar = () => {
  return (
    <nav className="bg-dark-100 py-2 flex items-center justify-center w-full">
      <div className="flex justify-start items-center gap-1 w-[90%] md:w-[95%]">
        <img src={LOGO} alt="chatmee logo" className="h-6 w-6 md:h-12 md:w-12" />
        <h1 className="font-bold text-lg md:text-3xl text-white">ChatMee</h1>
      </div>
    </nav>
  );
};

export default AuthNavbar;
