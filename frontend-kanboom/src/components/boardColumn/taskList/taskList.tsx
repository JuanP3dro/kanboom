import { GetCardData } from "@/schemas/card.schemas";
import TaskCard from "./taskCard/taskCard";
import { Droppable } from "react-beautiful-dnd";

interface TaskListProps {
  column: {
    id: number;
    name: string;
    color: string;
    boardId: number;
  };
  cardList: GetCardData[];
}

function TaskList({ column, cardList }: TaskListProps) {
  const id = String(column.id)
  return (
    <Droppable droppableId={id} type="lista">
       { (provided) => {
            return (
              <ul className="w-full max-w-[325px] flex flex-col gap-[16px] mt-[16px] h-[325px] overflow-y-auto rounded-[8px] hover:border-white border-[1px]" ref={ provided.innerRef }
              { ...provided.droppableProps } >
                {provided.placeholder}
              {cardList.map((card, index) => {
                return <TaskCard key={index} card={card} column={column} index={index} />;
              })}
            </ul>
            );
        } }
    </Droppable>
  );
}

export default TaskList;