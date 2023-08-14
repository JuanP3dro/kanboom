import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import { useBoard } from "@/context/boardContext";

function ModalDeleteCard() {
  const { setModalDeleteCard } = useAuth();
  const { deleteCard, cardId, columnId, boardId } = useBoard();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => setModalDeleteCard(false)}
        />
        <form className="flex flex-col gap-[16px] w-full">
          <h2 className="font-bold text-[24px]">Deletar Card</h2>
          <p className="text-gray-600 font-normal text-16">
            Deseja mesmo deletar essa tarefa?
          </p>
          <button
            type="button"
            className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold"
            onClick={() => deleteCard(cardId, boardId)}
          >
            Deletar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalDeleteCard;
