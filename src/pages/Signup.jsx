import AuthLayout from "@/components/AuthLayout";
import { Signup as SignupComponent } from "@/components/index";

function Signup() {
  return (
    <AuthLayout>
      <SignupComponent />
    </AuthLayout>
  );
}

export default Signup;
