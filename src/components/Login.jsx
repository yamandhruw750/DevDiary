import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { OAuthProvider } from "appwrite";
import authService from "@/appwrite/auth";
import { login as authLogin } from "@/store/authSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Field } from "./ui/field";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const isSignup = mode === "signup";

  useEffect(() => {
    setError("");
    reset();
  }, [mode, reset]);

  const setMode = (nextMode) => {
    if (nextMode === "signup") {
      setSearchParams({ mode: "signup" });
    } else {
      setSearchParams({});
    }
  };

  const establishSession = async (userData) => {
    if (userData) {
      dispatch(authLogin(userData));
      navigate("/");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      if (isSignup) {
        const account = await authService.createAccount({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        if (account) {
          await establishSession(account);
        }
        return;
      }

      const session = await authService.loginAccount({
        email: data.email,
        password: data.password,
      });
      if (session) {
        const userData = await authService.getCurrentUser();
        await establishSession(userData);
      }
    } catch (err) {
      if (err.message?.includes("Session is active")) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          await establishSession(userData);
          return;
        }
      }
      if (err.message?.includes("already exists")) {
        setError("Email already registered. Please sign in instead.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = () => {
    authService.createOAuth2Session({
      provider: OAuthProvider.Github,
      successUrl: window.location.origin,
      failureUrl: window.location.origin,
    });
  };

  const handleGoogleLogin = () => {
    authService.createOAuth2Session({
      provider: OAuthProvider.Google,
      successUrl: window.location.origin,
      failureUrl: window.location.origin,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
          {isSignup ? "Create account" : "Welcome back"}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground">
          {isSignup ? "Join DevDiary" : "Sign in to DevDiary"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {isSignup
            ? "Start documenting your learning, projects, and public progress in one place."
            : "Continue writing, tracking, and sharing your developer journey."}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-border bg-muted/40 p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
            !isSignup
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
            isSignup
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isSignup && (
          <Field>
            <label className="mb-2 block text-sm text-foreground">Full Name</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Your name"
                className="h-12 rounded-2xl border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                {...register("name", { required: isSignup })}
              />
            </div>
          </Field>
        )}

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
              placeholder={isSignup ? "Create a password" : "Your password"}
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
          {loading
            ? isSignup
              ? "Creating account..."
              : "Signing in..."
            : isSignup
              ? "Create Account"
              : "Sign In"}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <Button
          onClick={handleGithubLogin}
          variant="outline"
          className="h-12 w-full rounded-full border-border bg-background text-foreground hover:bg-muted"
          type="button"
        >
          <SiGithub className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="h-12 w-full rounded-full border-border bg-background text-foreground hover:bg-muted"
          type="button"
        >
          <SiGoogle className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>

        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            {isSignup ? "Already have an account?" : "New to DevDiary?"}
          </span>
          <Button
            type="button"
            variant="ghost"
            className="rounded-full text-foreground hover:bg-muted"
            onClick={() => setMode(isSignup ? "signin" : "signup")}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </Button>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
