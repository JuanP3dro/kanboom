import Logo from "../../assets/logo-kanboom.png";
import { TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePasswordData,
  updatePasswordSchema,
} from "@/schemas/user.schemas";
import { useAuth } from "@/context/authContext";

function RecoverPassword() {
  const router = useRouter();
  const { id } = router.query;
  
  const { replacePassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const onFormCreateBoardSubmit = (formData: UpdatePasswordData) => {
    if (typeof id == 'string') {
        const userId = parseInt(id)
        replacePassword(formData, userId);
      }    
  };
  return (
    <main className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <section className="px-[24px] py-[48px] flex flex-col bg-white rounded-xl w-[90%] max-w-[400px] max-h-90 gap-[10px]">
        <Image src={Logo} alt="" className="mx-auto" />
        <h2 className="text-center text-gray-600 font-bold text-16">
          Altere sua senha
        </h2>
        <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit(onFormCreateBoardSubmit)}>
          <div className="flex flex-col items-center w-full">
            <TextField
              label="Nova Senha"
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
          <div className="flex flex-col items-center w-full">
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
          <button
            type="submit"
            className="bg-blue-500 rounded-[8px] text-white py-2 text-center font-bold text-18"
          >
            Alterar senha
          </button>
        </form>
      </section>
    </main>
  );
}

export default RecoverPassword;
