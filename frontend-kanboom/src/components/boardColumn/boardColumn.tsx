import { useAuth } from "@/context/authContext";
import TaskList from "./taskList/taskList";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { useBoard } from "@/context/boardContext";
import { useEffect } from "react";
import { GetCardData } from "@/schemas/card.schemas";

interface ColumnProps {
  column: {
    id: number;
    name: string;
    color: string;
    boardId: number;
    card: GetCardData[]
  };
}

function BoardColumn({ column }: ColumnProps) {
  const {
    setModalEditColumn,
    setModalAddCard
  } = useAuth();
  const { setColumnId, cardId, getCardList, setBoardId, getColumnById, setColumn } = useBoard();


  useEffect(() => {
    
    setColumn(column)
  }, [column]);
  return (
    <div
      className={`rounded-[8px] max-w-[325px] min-w-[200px]  border-t-[2px] ${column.color} mt-[24px] `}
    >
      <div className="flex items-center justify-between bg-white rounded-[8px] p-[16px]">
        <h3 className="text-[16px] font-medium">{column.name}</h3>
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-gray3 px-[16px] py-[8px] text-gray3">
            {column.card.length}
          </div>
          <MdOutlineEdit
            className="text-gray3 h-[24px] w-[24px] cursor-pointer"
            onClick={() => {
              setModalEditColumn(true)
              setColumnId(column.id)
              setBoardId(column.boardId)
              getColumnById(column.id)
            }}
          />
        </div>
      </div>
      <TaskList column={column} cardList={column.card} />
      <button className="flex items-center gap-[10px] text-blue2 font-bold px-[16px] py-[8px] mt-[12px]">
        <IoMdAdd className="h-[24px] w-[24px]" />
        <span
          onClick={() => {
            setModalAddCard(true);
            setColumnId(column.id);
          }}
        >
          ADICIONAR CARD
        </span>
      </button>
    </div>
  );
}

export default BoardColumn;
