import type React from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

interface SignupFormProps {
  username: string;
  email: string;
  password: string;
  onchangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleForm: (e: React.FormEvent<HTMLFormElement>) => void;
  signupLoading: boolean;
  signError: string | null;
  usernameValidationMsg: { type: string; message: string } | null | undefined;
  isValidUsernameFormat: boolean;
  usernameLoading: boolean;
  usernameError: string | null;
  usernameData: { available: boolean; message: string } | null;
}

const SignupForm = ({
  username,
  email,
  password,
  onchangeHandler,
  handleForm,
  signupLoading,
  signError,
  usernameValidationMsg,
  isValidUsernameFormat,
  usernameLoading,
  usernameError,
  usernameData,
}: SignupFormProps) => {
  return (
    <form onSubmit={handleForm} className="space-y-4 mt-0">
      <div className="space-y-2">
        <Label htmlFor="signup-username" className="text-sm font-medium text-white">
          Username
        </Label>
        <Input
          id="signup-username"
          name="username"
          value={username}
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
          <Alert variant={usernameValidationMsg.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{usernameValidationMsg.message}</AlertDescription>
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
        <Label htmlFor="signup-email" className="text-sm font-medium text-white">
          Email
        </Label>
        <Input
          id="signup-email"
          name="email"
          value={email}
          onChange={onchangeHandler}
          type="email"
          placeholder="name@example.com"
          className="h-11 text-gray-300"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-sm font-medium text-white">
          Password
        </Label>
        <Input
          id="signup-password"
          name="password"
          value={password}
          onChange={onchangeHandler}
          type="password"
          placeholder="Create a strong password"
          className="h-11 text-gray-300"
          required
        />
      </div>
      <div className="space-y-2">
        {signError && (
          <Alert variant="destructive">
            <AlertDescription>{signError}</AlertDescription>
          </Alert>
        )}
      </div>
      <Button type="submit" variant="secondary" className="w-full h-11 mt-6" size="lg">
        {signupLoading ? <Spinner /> : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
