import { AiOutlineClose } from "react-icons/ai";
import { TextField } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useBoard } from "@/context/boardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateBoardData, updateBoardSchema } from "@/schemas/board.schemas";



function ModalEditBoard() {
  const { setModalEditBoard } = useAuth();
  const { updateBoard, deleteBoard, boardId } = useBoard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBoardData>({
    resolver: zodResolver(updateBoardSchema),
  });
  const onFormEditBoardSubmit = (formData: UpdateBoardData) => {
    updateBoard(formData, boardId);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => setModalEditBoard(false)}
        />
        <form
          className="flex flex-col gap-[16px] w-full"
          onSubmit={handleSubmit(onFormEditBoardSubmit)}
        >
          <h2 className="font-bold text-[24px]">Editar Quadro</h2>
          <div className="flex flex-col items-center w-full">
            <TextField
              label="Nome do Quadro"
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
          <button
            type="submit"
            className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold"
          >
            Salvar
          </button>
          <button
            type="button"
            className="bg-red1 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold"
            onClick={()=> {
              deleteBoard(boardId)
            }}
          >
            Deletar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalEditBoard;
