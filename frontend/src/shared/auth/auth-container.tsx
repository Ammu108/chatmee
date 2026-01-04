import AUTH_BANNER from "../../assets/auth-banner.png";
import LOGO from "../../assets/chatmee-logo.png";
import AuthForm from "./auth-form";

const AuthContainer = () => {
  return (
    <div className="rounded-2xl shadow-2xl w-[85%] max-w-5xl flex overflow-hidden bg-dark-100 my-16 md:my-0">
      {/* ================== AUTH BANNER SECTION ================= */}

      <div className="w-1/2 hidden md:block relative">
        <img
          src={AUTH_BANNER}
          alt="Authentication Banner"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-800/30 backdrop-blur-sm flex items-start justify-start rounded-l-2xl p-8 w-full h-full border border-white/20 shadow-xl">
            <div className="gap-4 flex w-4/5 flex-col mt-12">
              <div className="h-16 w-16 items-center justify-center p-2 bg-dark-100 rounded-2xl">
                <img src={LOGO} alt="ChatMee Logo" className="h-14 w-14 object-contain pb-2" />
              </div>
              <p className="text-4xl font-bold text-white">
                Connect with your team seamlessly.
              </p>
              <p className="text-white text-lg font-medium">
                Secure, fast and reliable messaging for professionals. Join thousands of team
                communicating better today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================== AUTH LOGIN AND SIGNUP SECTION ================= */}

      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthContainer;
