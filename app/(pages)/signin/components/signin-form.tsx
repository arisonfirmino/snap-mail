"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { LockKeyholeIcon, LogInIcon, UserIcon } from "lucide-react";

import { comparePasswords, isUserExists } from "@/app/helpers/userHelpers";

const schema = yup.object({
  user: yup.string().required("Por favor, insira o nome de usuário ou email."),
  password: yup.string().required("Por favor, insira a senha."),
});

type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const checkUserExists = await isUserExists({ user: data.user });
    const checkPassword = await comparePasswords({
      user: data.user,
      password: data.password,
    });

    if (!checkUserExists) {
      setError("user", {
        type: "manual",
        message: "Usuário não cadastrado.",
      });

      setIsLoading(false);
      return;
    }

    if (!checkPassword) {
      setError("password", {
        type: "manual",
        message: "A senha está incorreta.",
      });

      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      redirect: false,
      user: data.user,
      password: data.password,
    });

    reset();
    setIsLoading(false);
    router.replace("/");
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

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full justify-between uppercase"
      >
        Entrar
        <LogInIcon />
      </Button>
    </form>
  );
};

export default SignInForm;
