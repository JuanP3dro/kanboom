import { MdOutlineBrightnessLow, MdAlarm } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { BsTrash3 } from "react-icons/bs";
import { useAuth } from "@/context/authContext";
import { Draggable } from "react-beautiful-dnd";
import { useBoard } from "@/context/boardContext";
import { useEffect, useState } from "react";
import { ResponsibleUser } from "@/schemas/card.schemas";
import Image from "next/image";

interface TaskCardProps {
  card: {
    id: number;
    title: string;
    description: string;
    responsible: number;
    historyPoints: string;
    hours: string;
    columnId: number;
    responsibleUser: ResponsibleUser
  };
  column: {
    id: number;
    name: string;
    color: string;
    boardId: number;
  };
  index: number;
}

function TaskCard({ card, column, index }: TaskCardProps) {
  const { setModalDeleteCard, setModalEditCard, nameInitial } = useAuth();
  const { setCardId, getCardById, setColumnId, setResponsible, setBoardId, } =
    useBoard();
  const id = String(card.id);
  const [responsibleInitial, setResponsibleInitial] = useState("");
  function getResponsibleInitial(name: string) {
    const initial = name.split(" ").map((word) => word.charAt(0));
    const initialString = initial.join("").toUpperCase();
    return initialString
  }
  useEffect(() => {
    getResponsibleInitial(card.responsibleUser.name)
  }, []);
  return (
    <Draggable draggableId={id} index={index} key={card.id} >
      {(provided) => {
        return (
          <li
            className="bg-white rounded-[16px] w-full flex flex-col gap-[8px] p-[16px]"
            onDragStart={()=> {
              setCardId(card.id)
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="w-full flex justify-between">
              <h3 className="text-[12px] font-bold text-gray3 ">
                {column.name}
              </h3>
              <div className="flex gap-[10px]">
                <LuEye
                  className="cursor-pointer text-gray3"
                  onClick={() => {
                    setModalEditCard(true);
                    getCardById(card.id);
                    setColumnId(column.id);
                    setResponsible(card.responsible);
                    setBoardId(column.boardId);
                    setCardId(card.id);
                  }}
                />
                <BsTrash3
                  className="cursor-pointer text-gray3"
                  onClick={() => {
                    setModalDeleteCard(true);
                    setCardId(card.id);
                    setColumnId(column.id);
                    setBoardId(column.boardId);
                  }}
                />
              </div>
            </div>
            <p className="text-[16px]">{card.title}</p>
            <div className="flex items-center gap-[8px]">
              <div className="border rounded-lg border-gray3 px-[16px] py-[8px] flex items-center gap-[10px]">
                <MdOutlineBrightnessLow className="text-gray3 " />
                <span className="text-gray3">
                  {card.historyPoints == "" ? 0 : card.historyPoints}
                </span>
              </div>
              <div className="border rounded-lg border-gray3 px-[16px] py-[8px] flex items-center gap-[10px]">
                <MdAlarm className="text-gray3" />
                <span className="text-gray3">
                  {card.hours == "" ? 0 : card.hours}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-[8px]">
              {card.responsibleUser.profilePhoto ? <Image src={`https://kaanboom-production.up.railway.app/user/image/${card.responsibleUser.profilePhoto}`} alt="foto usuário" width={30} height={30} className="rounded-[50%] h-[30px] w-[30px]" /> : <div className="rounded-[50%] h-[30px] w-[30px] flex items-center justify-center bg-purple1">
                <span className="text-white">{getResponsibleInitial(card.responsibleUser.name)}</span>
              </div>}
              <p className="text-gray3 text-[16px]">{card.responsibleUser.name}</p>
            </div>
          </li>
        );
      }}
    </Draggable>
  );
}

export default TaskCard;
