import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { LockKeyholeIcon, LogInIcon, UserIcon } from "lucide-react";

const SignInForm = () => {
  return (
    <form className="w-full space-y-2.5 md:max-w-96">
      <Input icon={UserIcon} placeholder="Email ou nome de usuário" />

      <Input type="password" icon={LockKeyholeIcon} placeholder="Senha" />

      <Button type="submit" className="w-full justify-between uppercase">
        Entrar
        <LogInIcon />
      </Button>
    </form>
  );
};

export default SignInForm;
