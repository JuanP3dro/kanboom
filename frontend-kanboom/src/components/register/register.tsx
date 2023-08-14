import { TextField } from "@mui/material";
import Logo from "../../assets/logo-kanboom.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/authContext";
import { RegisterData, registerSchema } from "@/schemas/user.schemas";
import { useRouter } from "next/router";

function RegisterForm() {
    const { registerUser, setModalLink, modalLink, setRegisterForm } = useAuth();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
      });
    
      const onFormRegisterSubmit = (formData: RegisterData) => {
        registerUser(formData)
      };
    return (
        <section className="px-[24px] py-[40px] flex flex-col bg-white rounded-xl w-[90%] max-w-[400px] max-h-90 gap-[10px]">
        <Image src={Logo} alt="" className="mx-auto" />
        <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit(onFormRegisterSubmit)}>
          <h2
            className="text-center text-gray-600 font-bold text-20"
            
          >
            Crie sua conta!
          </h2>
          <div className="flex flex-col items-center w-full">
            <TextField
              label="Nome"
              variant="outlined"
              type="text"
              {...register("name")}
              color={errors.name ? "error" : "success"}
              className="w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name?.message}</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              {...register("email")}
              color={errors.email ? "error" : "success"}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <TextField
              label="Senha"
              variant="outlined"
              type="password"
              {...register("password")}
              color={errors.password ? "error" : "success"}
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <TextField
              label="Confirme sua senha"
              variant="outlined"
              type="password"
              {...register("confirmPassword")}
              color={errors.confirmPassword ? "error" : "success"}
              className="w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            )}
          </div>
          <button className="bg-blue2 rounded-[8px] text-white py-[8px] text-center font-bold text-18" type="submit">
            Cadastrar
          </button>
        </form>
        <p className="text-blue1 font-light text-16 text-center">
          Já tem uma conta? Clique{" "}
          <span
            className="text-blue1 cursor-pointer underline"
            onClick={() => router.push("/")}
          >
            aqui
          </span>
        </p>
        <p className="text-blue1 font-light text-16 text-center">Precisa de um novo link de ativação? Clique <span className="text-blue1 cursor-pointer underline" onClick={() => {
            setModalLink(true)
            setRegisterForm(false)
        }}>aqui</span></p>
      </section>
    );
}

export default RegisterForm;