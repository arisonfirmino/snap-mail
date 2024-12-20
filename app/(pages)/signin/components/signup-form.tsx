import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { LockKeyholeIcon, MoveRightIcon, UserIcon } from "lucide-react";

const SignUpForm = () => {
  return (
    <form className="w-full space-y-2.5 md:max-w-96">
      <div className="flex flex-col gap-2.5 md:flex-row">
        <Input icon={UserIcon} placeholder="Nome" />

        <Input icon={UserIcon} placeholder="Sobrenome" />
      </div>

      <Input icon={UserIcon} placeholder="Nome de usuário" />

      <Input icon={LockKeyholeIcon} type="password" placeholder="Senha" />

      <Input
        icon={LockKeyholeIcon}
        type="password"
        placeholder="Confirmação de email"
      />

      <Button className="w-full justify-between uppercase">
        Cadastrar <MoveRightIcon />
      </Button>
    </form>
  );
};

export default SignUpForm;
