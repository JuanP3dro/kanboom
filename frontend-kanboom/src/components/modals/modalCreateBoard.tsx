import { AiOutlineClose } from "react-icons/ai";
import { TextField } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useBoard } from "@/context/boardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBoardData, createBoardSchema } from "@/schemas/board.schemas";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";

function ModalCreateBoard() {
  const { setModalCreateBoard } = useAuth();
  const { createBoard } = useBoard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBoardData>({
    resolver: zodResolver(createBoardSchema),
  });
  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  let idUser: number;

  if (typeof decodedToken === "object" && decodedToken !== null) {
    idUser = decodedToken.payload?.user?.id;
  }
  const onFormCreateBoardSubmit = (formData: CreateBoardData) => {
    const newFormData = { ...formData, userId: idUser };
    createBoard(newFormData);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => setModalCreateBoard(false)}
        />
        <form
          className="flex flex-col gap-[16px] w-full"
          onSubmit={handleSubmit(onFormCreateBoardSubmit)}
        >
          <h2 className="font-bold text-[24px]">Criar novo quadro</h2>
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
          <button className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold">
            Criar quadro
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalCreateBoard;
