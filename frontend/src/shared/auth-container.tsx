import { useState } from "react";
import { Link } from "react-router-dom";
import LOGO from "../assets/chatmee-logo.png";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const AuthContainer = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="rounded-2xl shadow-2xl w-[85%] max-w-5xl flex overflow-hidden bg-dark-100">
      <div className="w-1/2 hidden md:block relative">
        <img
          src="https://cdn.pixabay.com/photo/2023/01/16/20/50/geometry-7723324_1280.jpg"
          alt="Authentication Banner"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md flex items-start justify-start rounded-l-2xl p-8 w-full h-full border border-white/20 shadow-xl">
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

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
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
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-dark-20 text-sm">Log in to your account to continue.</p>
              </div>
            ) : (
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome To Our Community
                </h1>
                <p className="text-dark-20 text-sm">Create an account to get started.</p>
              </div>
            )}

            <TabsContent value="login" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium text-white">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-11 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password" className="text-sm font-medium text-white">
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
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 text-gray-300"
                />
              </div>
              <Button variant="secondary" className="w-full h-11 mt-6" size="lg">
                Log In
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="signup-username" className="text-sm font-medium text-white">
                  Username
                </Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="johndoe"
                  className="h-11 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-medium text-white">
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-11 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-medium text-white">
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a strong password"
                  className="h-11 text-gray-300"
                />
              </div>
              <div className="space-y-2">
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
              </div>
              <Button variant="secondary" className="w-full h-11 mt-6" size="lg">
                Create Account
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-dark-20">
            By continuing, you agree to our and{" "}
            <Link
              to="/privacy-policy"
              className="text-primary-100 hover:underline hover:cursor-pointer"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
