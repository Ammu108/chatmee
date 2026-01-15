import AuthContainer from "../shared/auth/auth-container";
import AuthNavbar from "../shared/auth/auth-navbar";

const Auth = () => {
  return (
    <div className="relative bg-[#1c1f27] min-h-screen">
      {/* Atmospheric gradient background - centered radial with #00CECE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00CECE]/80 via-[#00CECE]/15 via-10% to-transparent to-100% pointer-events-none" />

      {/* Content */}
      <div className="relative flex items-center justify-center flex-col w-full min-h-screen">
        <div className="top-0 left-0 w-full absolute">
          <AuthNavbar />
        </div>
        <AuthContainer />
      </div>
    </div>
  );
};

export default Auth;
