import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "@/store/authSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import authService from "@/appwrite/auth";
import { useForm } from "react-hook-form";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { Field } from "./ui/field";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.loginAccount({
        email: data.email,
        password: data.password,
      });
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      if (error.message.includes("Session is active")) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        } else {
          setError(error.message);
        }
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(login)}>
        <Card className="w-sm shadow-2xl p-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center pb-8">Login</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Field>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value,
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            </Field>
            <Field>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
            </Field>
            <Button className="w-full">Sign In</Button>
            <p className="text-center">
              Don't have an account?
              <Link to={"/signup"}>
                {" "}
                <Button variant="outline">Sign Up</Button>
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default Login;
