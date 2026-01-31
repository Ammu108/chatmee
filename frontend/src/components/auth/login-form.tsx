import type React from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

interface LoginFormProps {
  email: string;
  password: string;
  onchangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleForm: (e: React.FormEvent<HTMLFormElement>) => void;
  loginLoading: boolean;
  loginError: string | null;
}

const LoginForm = ({
  email,
  password,
  onchangeHandler,
  handleForm,
  loginLoading,
  loginError,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleForm} className="space-y-4 mt-0">
      <div className="space-y-2">
        <Label htmlFor="login-email" className="text-sm font-medium text-white">
          Email
        </Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          value={email}
          onChange={onchangeHandler}
          placeholder="name@example.com"
          className="h-11 text-gray-300"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password" className="text-sm font-medium text-white">
            Password
          </Label>
        </div>
        <Input
          id="login-password"
          name="password"
          value={password}
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
      <Button type="submit" variant="secondary" className="w-full h-11 mt-6" size="lg">
        {loginLoading ? <Spinner /> : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
