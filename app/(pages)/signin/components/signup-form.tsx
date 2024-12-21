"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

import { LockKeyholeIcon, MoveRightIcon, UserIcon } from "lucide-react";

import { createNewUser } from "@/app/actions/user";
import { isUsernameAvailable } from "@/app/helpers/userHelpers";

const schema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório.")
    .matches(
      /^[a-zA-ZÀ-ÿ]+$/,
      "O nome não pode conter caracteres especiais ou espaços.",
    )
    .min(3, "Este campo precisa ter pelo menos 3 caracteres."),
  lastName: yup
    .string()
    .required("O sobrenome é obrigatório.")
    .matches(
      /^[a-zA-ZÀ-ÿ]+$/,
      "O sobrenome não pode conter caracteres especiais ou espaços.",
    )
    .min(3, "Este campo precisa ter pelo menos 3 caracteres."),
  username: yup
    .string()
    .required("O nome de usuário é obrigatório.")
    .matches(
      /^[a-zA-Z0-9._]+$/,
      "O nome de usuário só pode conter letras, números, '.' ou '_'.",
    )
    .matches(
      /^(?=(?:.*[a-zA-Z]){3})/,
      "O nome de usuário deve conter pelo menos 3 letras.",
    )
    .min(6, "Este campo precisa ter pelo menos 6 caracteres."),
  password: yup
    .string()
    .required("A senha é obrigatório.")
    .min(6, "Este campo precisa ter pelo menos 6 caracteres."),
  passwordConfirmation: yup
    .string()
    .required("Por favor, confirme sua senha.")
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais."),
});

type FormData = yup.InferType<typeof schema>;

const SignUpForm = () => {
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

    const checkIsUsernameAvailable = await isUsernameAvailable({
      username: data.username,
    });

    if (!checkIsUsernameAvailable) {
      setError("username", {
        type: "manual",
        message: "O nome de usuário já está em uso. Tente outro.",
      });

      setIsLoading(false);
      return;
    }

    await createNewUser({
      firstName: data.name,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
    });

    await signIn("credentials", {
      redirect: false,
      user: data.username,
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
      <div className="flex flex-col gap-2.5 md:flex-row">
        <Input
          icon={UserIcon}
          placeholder="Nome"
          {...register("name")}
          error={errors.name}
        />

        <Input
          icon={UserIcon}
          placeholder="Sobrenome"
          {...register("lastName")}
          error={errors.lastName}
        />
      </div>

      <Input
        icon={UserIcon}
        placeholder="Nome de usuário"
        {...register("username")}
        error={errors.username}
      />

      <Input
        icon={LockKeyholeIcon}
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      <Input
        icon={LockKeyholeIcon}
        type="password"
        placeholder="Confirmação de senha"
        {...register("passwordConfirmation")}
        error={errors.passwordConfirmation}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full justify-between uppercase"
      >
        Cadastrar <MoveRightIcon />
      </Button>
    </form>
  );
};

export default SignUpForm;
