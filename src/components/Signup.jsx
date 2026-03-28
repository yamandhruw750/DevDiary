import authService from "@/appwrite/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/store/authSlice";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Field } from "./ui/field";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const account = await authService.createAccount({
        email: data.email,
        password: data.password,
      });
      if (account) {
        dispatch(login(account));
        navigate("/");
      }
    } catch (error) {
      if (error.message.includes("already exists")) {
        setError("Email already registered. Please login instead. ");
        navigate("/login");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(create)}>
        <Card className="w-sm shadow-2xl p-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center pb-8">SignUp</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Field>
              <Input
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
            </Field>
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
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <p className="text-center">
              Already have an account?
              <Link to={"/login"}>
                {" "}
                <Button variant="outline">Sign In</Button>
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default Signup;
