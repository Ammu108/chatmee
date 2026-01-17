import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/login-form";
import SignupForm from "../../components/auth/signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useLogin, useSignUp } from "../../hooks/use-auth";
import { useCheckUsername } from "../../hooks/use-user";
import { USERNAME_REGEX, validateUsername } from "../../lib/validation";
import { useAuthFormStore } from "../../store/auth-store";

const AuthForm = () => {
  const activeTab = useAuthFormStore((state) => state.AuthFormActiveTab);
  const setActiveTab = useAuthFormStore((state) => state.setAuthFormActiveTab);
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { signup, loading: signupLoading, error: signError } = useSignUp();
  const {
    checkUsername,
    loading: usernameLoading,
    error: usernameError,
    data: usernameData,
  } = useCheckUsername();

  const isValidUsernameFormat = USERNAME_REGEX.test(data.username);
  const usernameValidationMsg = validateUsername({ username: data.username });

  useEffect(() => {
    if (!isValidUsernameFormat) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        await checkUsername(data.username);
      } catch (error) {
        console.error(error);
        console.log("failed to get username!", error);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [data.username, checkUsername, isValidUsernameFormat]);

  // Sync URL with activeTab on mount
  useEffect(() => {
    const path = location.pathname.slice(1); // Remove leading slash
    if (path === "login" || path === "signup") {
      setActiveTab(path);
    }
  }, [location.pathname, setActiveTab]);

  // Handle tab change and update URL
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (activeTab === "login") {
        const success = await login({
          email: data.email,
          password: data.password,
        });
        if (success) {
          navigate("/");
        }
      } else {
        const success = await signup({
          username: data.username,
          email: data.email,
          password: data.password,
        });

        if (success) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Authentication failed!", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-dark-70">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-dark-40 data-[state=active]:text-white"
          >
            Log In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-dark-40 data-[state=active]:text-white"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {activeTab === "login" ? (
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-dark-20 text-xs md:text-sm">
              Log in to your account to continue.
            </p>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome To Our Community
            </h1>
            <p className="text-dark-20 text-xs md:text-sm">
              Create an account to get started.
            </p>
          </div>
        )}

        {/* <form onSubmit={handleForm}> */}
        <TabsContent value="login" className="space-y-4 mt-0">
          <LoginForm
            email={data.email}
            password={data.password}
            onchangeHandler={onchangeHandler}
            handleForm={handleForm}
            loginLoading={loginLoading}
            loginError={loginError}
          />
        </TabsContent>

        <TabsContent value="signup" className="space-y-4 mt-0">
          <SignupForm
            username={data.username}
            email={data.email}
            password={data.password}
            onchangeHandler={onchangeHandler}
            handleForm={handleForm}
            signupLoading={signupLoading}
            signError={signError}
            usernameLoading={usernameLoading}
            usernameError={usernameError}
            usernameData={usernameData}
            usernameValidationMsg={usernameValidationMsg}
            isValidUsernameFormat={isValidUsernameFormat}
          />
        </TabsContent>
        {/* </form> */}
      </Tabs>

      <div className="mt-6 text-center text-xs md:text-sm text-dark-20">
        By continuing, you agree to our and{" "}
        <Link to="/privacy-policy" className="text-primary-100 underline hover:cursor-pointer">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
