import LOGO from "../assets/chatmee-logo.png";

const AuthNavbar = () => {
  return (
    <nav className="bg-dark-100 px-12 py-1 flex items-center justify-between w-full">
      <div className="flex justify-center items-center gap-1">
        <img src={LOGO} alt="chatmee logo" className="h-12 w-12" />
        <h1 className="font-bold text-3xl text-white">ChatMee</h1>
      </div>
    </nav>
  );
};

export default AuthNavbar;
