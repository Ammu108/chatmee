import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Spinner } from "../../components/ui/spinner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useLogin, useSignUp } from "../../hooks/auth-hook";
import { useCheckUsername } from "../../hooks/user-hook";
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

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
  const isValidUsernameFormat = usernameRegex.test(data.username);

  // Get username validation message
  const getUsernameValidationMessage = () => {
    if (!data.username) {
      return;
    }
    if (data.username.length < 5) {
      return {
        type: "error",
        message: "Username must be at least 5 characters",
      };
    }
    if (data.username.length > 20) {
      return {
        type: "error",
        message: "Username must be 20 characters or less",
      };
    }
    if (!isValidUsernameFormat) {
      return {
        type: "error",
        message: "Only lowercase letters, numbers, and underscores allowed",
      };
    }
    return null; // Valid format, will check availability via API
  };

  const usernameValidationMsg = getUsernameValidationMessage();

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
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
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

        <form onSubmit={handleForm}>
          <TabsContent value="login" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label
                htmlFor="login-email"
                className="text-sm font-medium text-white"
              >
                Email
              </Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                value={data.email}
                onChange={onchangeHandler}
                placeholder="name@example.com"
                className="h-11 text-gray-300"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="login-password"
                  className="text-sm font-medium text-white"
                >
                  Password
                </Label>
              </div>
              <Input
                id="login-password"
                name="password"
                value={data.password}
                type="password"
                onChange={onchangeHandler}
                placeholder="Enter your password"
                className="h-11 text-gray-300"
                required
              />
            </div>
            <div className="space-y-2">
              {loginError && (
                <Alert variant="destructive">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="w-full h-11 mt-6"
              size="lg"
            >
              {loginLoading ? <Spinner /> : "Log In"}
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label
                htmlFor="signup-username"
                className="text-sm font-medium text-white"
              >
                Username
              </Label>
              <Input
                id="signup-username"
                name="username"
                value={data.username}
                onChange={onchangeHandler}
                type="text"
                placeholder="johndoe"
                className="h-11 text-gray-300"
                required
              />
            </div>
            {/* Username validation feedback */}
            <div className="space-y-2">
              {usernameValidationMsg ? (
                <Alert
                  variant={
                    usernameValidationMsg.type === "error"
                      ? "destructive"
                      : "default"
                  }
                >
                  <AlertDescription>
                    {usernameValidationMsg.message}
                  </AlertDescription>
                </Alert>
              ) : isValidUsernameFormat ? (
                usernameLoading ? (
                  <div className="flex items-center gap-2 text-blue-500 text-sm">
                    <Spinner />
                    <span>Checking username availability...</span>
                  </div>
                ) : usernameError ? (
                  <Alert variant="destructive">
                    <AlertDescription>{usernameError}</AlertDescription>
                  </Alert>
                ) : usernameData ? (
                  <p
                    className={`text-sm ${
                      usernameData.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {usernameData.message}
                  </p>
                ) : null
              ) : null}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="signup-email"
                className="text-sm font-medium text-white"
              >
                Email
              </Label>
              <Input
                id="signup-email"
                name="email"
                value={data.email}
                onChange={onchangeHandler}
                type="email"
                placeholder="name@example.com"
                className="h-11 text-gray-300"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="signup-password"
                className="text-sm font-medium text-white"
              >
                Password
              </Label>
              <Input
                id="signup-password"
                name="password"
                value={data.password}
                onChange={onchangeHandler}
                type="password"
                placeholder="Create a strong password"
                className="h-11 text-gray-300"
                required
              />
            </div>
            {/* <div className="space-y-2">
              <Label
                htmlFor="signup-confirm-password"
                className="text-sm font-medium text-white"
              >
                Confirm Password
              </Label>
              <Input
                id="signup-confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="h-11 text-gray-300"
              />
            </div> */}
            <div className="space-y-2">
              {signError && (
                <Alert variant="destructive">
                  <AlertDescription>{signError}</AlertDescription>
                </Alert>
              )}
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="w-full h-11 mt-6"
              size="lg"
            >
              {signupLoading ? <Spinner /> : "Create Account"}
            </Button>
          </TabsContent>
        </form>
      </Tabs>

      <div className="mt-6 text-center text-xs md:text-sm text-dark-20">
        By continuing, you agree to our and{" "}
        <Link
          to="/privacy-policy"
          className="text-primary-100 underline hover:cursor-pointer"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
