import AuthLayout from "@/components/AuthLayout";
import { Login as LoginComponent } from "@/components/index";

function Login() {
  return (
    <AuthLayout>
      <LoginComponent />
    </AuthLayout>
  );
}

export default Login;
