import { TextField } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { iSendEmail, sendEmailSchema } from "@/schemas/user.schemas";

function ModalForgotPassword() {
  const { setModalPassword, sendEmail, setLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iSendEmail>({
    resolver: zodResolver(sendEmailSchema),
  });

  const onFormEmailSubmit = (formData: iSendEmail) => {
    sendEmail(formData)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => {
            setModalPassword(false)
            setLogin(true)
          }}
        />
        <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit(onFormEmailSubmit)}>
          <h2 className="font-bold text-[24px]">Esqueci minha senha</h2>
          <p className="text-gray-600 font-normal text-[16px]">
            Informe seu e-mail para enviarmos o link de recuperação
          </p>
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
          <button className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold">
            Enviar link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalForgotPassword;
