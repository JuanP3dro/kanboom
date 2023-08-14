import { AiOutlineClose } from "react-icons/ai";
import { TextField } from "@mui/material";
import { MdAutoFixHigh } from "react-icons/md";
import {
  MdOutlinePersonOutline,
  MdOutlineBrightnessLow,
  MdAlarm,
} from "react-icons/md";
import { useAuth } from "@/context/authContext";
import { useBoard } from "@/context/boardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCardData, createCardSchema } from "@/schemas/card.schemas";



function ModalAddCard() {
    const {  columnId, board, createCard} = useBoard()
    const {setModalAddCard} = useAuth()
    const users = board.allowedUsers
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateCardData>({
      resolver: zodResolver(createCardSchema),
    });
    const onFormCreateCardSubmit = (formData: CreateCardData) => {  
      const newFormData = { ...formData, columnId: columnId, allowedUsers: users };
      createCard(newFormData, board.id);
    };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10 max-h-[90%] overflow-y-auto">
        <span className="cursor-pointer" onClick={() => setModalAddCard(false)} >
            <AiOutlineClose />
        </span>
        <form className="flex flex-col gap-[16px] w-full" onSubmit={handleSubmit(onFormCreateCardSubmit)}>
          <h2 className="font-bold text-[24px]">Adicionar Card</h2>
          <div className="flex flex-col items-center w-full">
            <TextField
              label="Funcionalidade esperada"
              variant="outlined"
              type="text"
              {...register("title")}
              color={errors.title ? "error" : "success"}
              className="w-full"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title?.message}</p>
            )}
          </div>
          <p className="text-blue2 text-[12px] font-bold flex gap-[10px] items-center">
            <MdAutoFixHigh className="w-[24px] h-[24px]" />
            <span>GERAR DESCRIÇÃO</span>
          </p>
          <div className="flex flex-col items-center w-full">
            <textarea
              className="px-[8px] py-[16px] border-gray2 border-[1px] border-solid rounded-[8px] w-full h-[215px] resize-none overflow-y-auto"
              placeholder="Descrição do card"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description?.message}</p>
            )}
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="border-gray2 border-[1px] border-dashed w-[40px] h-[40px] flex justify-center items-center rounded-full">
              <MdOutlinePersonOutline className="text-gray2 w-[24px] h-[24px]" />
            </div>
            <div className="flex flex-col items-center w-full">
              <select className="w-full" {...register("responsible")}>
                {users.map((user)=> {
                  return <option className="w-full text-center" key={user.id} value={user.id}>{user.name}</option>
                })}
              </select>
              {errors.responsible && (
                <p className="text-red-500">{errors.responsible?.message}</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-[16px] font-bold">
              Estimativas de Tarefa (opcional)
            </h3>
            <div className="flex items-center gap-[16px]">
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center gap-[8px]">
                  <MdOutlineBrightnessLow className="min-w-[20px] min-h-[20px]"/>
                  
                  <TextField
                    label="Complexidade"
                    variant="outlined"
                    type="text"
                    {...register("historyPoints")}
                  />
                </div>
                {errors.historyPoints && (
                <p className="text-red-500">{errors.historyPoints?.message}</p>
              )}
              </div>
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center gap-[8px]">
                  <MdAlarm className="min-w-[20px] min-h-[20px]"/>
                  <TextField
                    label="Tempo"
                    variant="outlined"
                    type="text"
                    {...register("hours")}
                  />
                </div>
                {errors.hours && (
                <p className="text-red-500">{errors.hours?.message}</p>
              )}
              </div>
            </div>
          </div>
          <button className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold">
            Criar card
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalAddCard;
