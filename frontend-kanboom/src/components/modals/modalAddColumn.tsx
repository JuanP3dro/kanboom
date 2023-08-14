import { AiOutlineClose } from "react-icons/ai";
import { TextField } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useBoard } from "@/context/boardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateColumnData, createColumnSchema } from "@/schemas/column.schemas";
import { useRouter } from "next/router";

function ModalAddColumn() {
  const { setModalAddColumn } = useAuth();
  const { createColumn } = useBoard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateColumnData>({
    resolver: zodResolver(createColumnSchema),
  });
  const router = useRouter();
  const { id } = router.query;
  const boardId = typeof id === "string" ? parseInt(id, 10) : undefined;
  const onFormCreateColumnSubmit = (formData: CreateColumnData) => {
    const newFormData = { ...formData, boardId: boardId };
    if (typeof boardId === 'number') {
      createColumn(newFormData, boardId);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => setModalAddColumn(false)}
        />
        <form className="flex flex-col gap-[16px] w-full" onSubmit={handleSubmit(onFormCreateColumnSubmit)} >
          <h2 className="font-bold text-[24px]">Adicionar coluna</h2>
          <div className="flex flex-col items-center w-full">
            <TextField
              label="Nome da Coluna"
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
            <select className="w-full rounded-[8px] border-gray2 border-[1px] sorder-solid py-[16px] px-[8px]"  {...register("color")}>
              <option value="border-red1">Vermelho</option>
              <option value="border-yellow1">Amarelo</option>
              <option value="border-green1">Verde</option>
              <option value="border-blue1">Azul</option>
            </select>
            {errors.name && (
              <p className="text-red-500">{errors.color?.message}</p>
            )}
          </div>
          <button type="submit" className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold">
            Criar coluna
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalAddColumn;
