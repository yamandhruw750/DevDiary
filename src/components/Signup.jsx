import authService from "@/appwrite/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/store/authSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Field } from "./ui/field";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ArrowRight, Github, Lock, Mail, User } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setLoading(true);
    setError("");
    try {
      const account = await authService.createAccount({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (account) {
        dispatch(login(account));
        navigate("/");
      }
    } catch (error) {
      if (error.message.includes("already exists")) {
        setError("Email already registered. Please login instead.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Get started</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground">Create your DevDiary account</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Start documenting your learning, projects, and public progress in one place.
        </p>
      </div>

      <form onSubmit={handleSubmit(create)} className="space-y-4">
        <Field>
          <label className="mb-2 block text-sm text-foreground">Full Name</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Your name"
              className="h-12 rounded-2xl border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
              {...register("name", { required: true })}
            />
          </div>
        </Field>

        <Field>
          <label className="mb-2 block text-sm text-foreground">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="you@company.com"
              className="h-12 rounded-2xl border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>
        </Field>

        <Field>
          <label className="mb-2 block text-sm text-foreground">Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Create a password"
              className="h-12 rounded-2xl border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
              {...register("password", { required: true })}
            />
          </div>
        </Field>

        <Button
          type="submit"
          className="h-12 w-full rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)] hover:opacity-95"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Get Started"}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <Button variant="outline" className="h-12 w-full rounded-full border-border bg-background text-foreground hover:bg-muted" type="button">
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>

        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>Already have an account?</span>
          <Button asChild variant="ghost" className="rounded-full text-foreground hover:bg-muted">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
