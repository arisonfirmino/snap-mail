"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { LockKeyholeIcon, LogInIcon, UserIcon } from "lucide-react";

const schema = yup.object({
  user: yup.string().required("Por favor, insira o nome de usuário ou email."),
  password: yup.string().required("Por favor, insira a senha."),
});

type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-2.5 md:max-w-96"
    >
      <Input
        icon={UserIcon}
        placeholder="Email ou nome de usuário"
        {...register("user")}
        error={errors.user}
      />

      <Input
        type="password"
        icon={LockKeyholeIcon}
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      <Button type="submit" className="w-full justify-between uppercase">
        Entrar
        <LogInIcon />
      </Button>
    </form>
  );
};

export default SignInForm;
