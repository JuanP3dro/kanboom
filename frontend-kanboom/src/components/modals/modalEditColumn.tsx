import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import { useBoard } from "@/context/boardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateColumnData, updateColumnSchema } from "@/schemas/column.schemas";



function ModalEditColumn() {
  const { setModalEditColumn } = useAuth();
  const { columnId, updateColumn, boardId, deleteColumn, column} = useBoard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateColumnData>({
    resolver: zodResolver(updateColumnSchema),
  });
  const onFormEditColumnSubmit = (formData: UpdateColumnData) => {
    if (typeof boardId == "number") {
      updateColumn(formData, columnId, boardId);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => setModalEditColumn(false)}
        />
        <form className="flex flex-col gap-[16px] w-full" onSubmit={handleSubmit(onFormEditColumnSubmit)}>
          <h2 className="font-bold text-[24px]">Editar coluna</h2>
          <div className="flex flex-col items-center w-full">
            <input
              type="text"
              placeholder="Nome da coluna"
              className="w-full py-[16px] px-[8px] rounded-[8px] border-gray2 border-[1px]"
              {...register("name")}
              defaultValue={column.name}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name?.message}</p>
            )}
          </div>
          <div className="flex flex-col items-center w-full">
            <select
              className="w-full rounded-[8px] border-gray2 border-[1px] sorder-solid py-[16px] px-[8px]"
              {...register("color")}
            >
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
            Salvar
          </button>
          <button type="button"
           className="bg-red1 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold"
           onClick={() => deleteColumn(columnId, boardId)}
           >
            Deletar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalEditColumn;
