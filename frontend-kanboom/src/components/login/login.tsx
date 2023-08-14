import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, loginSchema } from "@/schemas/user.schemas";
import Image from 'next/image'
import { TextField } from "@mui/material";
import Logo from '../../assets/logo-kanboom.png'
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

function Login() {
    const router = useRouter()
    const { setModalPassword, loginUser, setLogin } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
      });
    
      const onFormLoginSubmit = (formData: LoginData) => {
        loginUser(formData)
      };
    return (
        <section className="px-[24px] py-[48px] flex flex-col bg-white rounded-xl w-[90%] max-w-[400px] max-h-90 gap-[10px]">
        <Image src={Logo} alt="logo kanboom" className="mx-auto" />
        <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit(onFormLoginSubmit)}>
          <h2 className="text-center text-gray-600 font-bold text-20">Fazer Login no Kanboom</h2>
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
          <button type="submit" className="bg-blue-500 rounded-[8px] text-white py-[8px] text-center font-bold text-18">Entrar</button>
        </form>
        <p className="text-blue1 font-light text-16 text-center cursor-pointer" onClick={() => {
            setModalPassword(true)
            setLogin(false)
        }}>Esqueci minha senha</p>
        <p className="text-blue1 font-light text-16 text-center">Ainda não tem uma conta? Clique <span className="text-blue1 cursor-pointer underline" onClick={() => router.push('/register')}>aqui</span> para criar</p>
      </section>
    );
}

export default Login;