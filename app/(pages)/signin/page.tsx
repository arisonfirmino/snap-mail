import SignInForm from "@/app/(pages)/signin/components/signin-form";
import SignUpForm from "@/app/(pages)/signin/components/signup-form";

import { ArrowUpDownIcon } from "lucide-react";

const SignInPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-5 p-5 md:p-0">
      <SignInForm />

      <div className="flex w-full items-center text-muted md:max-w-96">
        <span className="w-full text-center">faça login</span>
        <ArrowUpDownIcon size={16} className="flex-shrink-0" />
        <span className="w-full text-center">cadastre-se</span>
      </div>

      <SignUpForm />
    </main>
  );
};

export default SignInPage;
