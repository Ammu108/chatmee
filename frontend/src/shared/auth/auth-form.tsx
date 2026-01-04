import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { signup, loading: signupLoading, error: signError } = useSignUp();

  const navigate = useNavigate();

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (activeTab === "login") {
        await login({ email: data.email, password: data.password });
      } else {
        await signup({
          username: data.username,
          email: data.email,
          password: data.password,
        });
      }

      // navigate only success
      navigate("/");
    } catch (error) {
      console.log("Authentication failed!", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={setActiveTab}
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
                {/* <button
                    type="submit"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button> */}
              </div>
              <Input
                id="login-password"
                name="password"
                value={data.password}
                type="password"
                onChange={onchangeHandler}
                placeholder="Enter your password"
                className="h-11 text-gray-300"
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
              />
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
