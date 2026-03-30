import AuthLayout from "@/components/AuthLayout";
import { Login as LoginComponent } from "@/components/index";

function Login() {

  console.log("AuthLayout working");
  return (
    <AuthLayout>
      <LoginComponent />
    </AuthLayout>
  );
}

export default Login;
