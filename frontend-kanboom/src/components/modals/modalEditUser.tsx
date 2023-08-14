import { useAuth } from "@/context/authContext";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserData, updateUserSchema } from "@/schemas/user.schemas";
import { TextField } from "@mui/material";
import { useState } from "react";

function ModalEditUser() {
  const { setModalEditUser, updateUser } = useAuth();
  const [imageUpload, setImageUpload] = useState<Blob>(new Blob)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
  });
  console.log(errors)
  const onFormEditUserSubmit = (formData: UpdateUserData) => {
    const newFormData = new FormData()
    newFormData.append('profilePhoto', imageUpload)
    newFormData.append('name', formData.name)
    newFormData.append('email', formData.email)
    newFormData.append('password', formData.password)
    newFormData.append('confirmPassword', formData.confirmPassword)
    console.log(formData)
    updateUser(newFormData)
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => setModalEditUser(false)}
        />
        <form
          className="flex flex-col gap-[16px] w-full"
          onSubmit={handleSubmit(onFormEditUserSubmit)}
        >
          <h2 className="font-bold text-[24px]">Editar Usuário</h2>
          <div className="flex flex-col items-center w-full">
            <input type="file" {...register("profilePhoto")} onChange={(event) => {{event.target.files ? setImageUpload(event.target.files[0]): null}}}/>
            {errors.name && (
              <p className="text-red-500">{errors.profilePhoto?.message}</p>
            )}
          </div>
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
          <div className="flex flex-col items-center w-full">
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
          <div className="flex flex-col items-center w-full">
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
            className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalEditUser;
