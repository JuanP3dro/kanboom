import ModalEditBoard from "../../components/modals/modalEditBoard";
import BoardColumn from "../../components/boardColumn/boardColumn";
import Header from "../../components/header/index";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useAuth } from "../../context/authContext";
import ModalAddColumn from "@/components/modals/modalAddColumn";
import ModalEditColumn from "@/components/modals/modalEditColumn";
import ModalEditCard from "@/components/modals/modalEditCard";
import Image from "next/image";
import User from "../../assets/M.png";
import ModalAddUser from "@/components/modals/modalAddUser";
import { useBoard } from "@/context/boardContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ModalEditUser from "@/components/modals/modalEditUser";
import ModalAddCard from "@/components/modals/modalAddCard";
import ModalDeleteCard from "@/components/modals/modalDeleteCard";
import { GetColumnData } from "@/schemas/column.schemas";
import ModalShareBoard from "@/components/modals/modalShareBoard";
import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

interface BoardProps {
  tokenJWT: string;
}

function Board({ tokenJWT }: BoardProps) {
  const {
    modalEditBoard,
    setModalEditBoard,
    modalAddColumn,
    setModalAddColumn,
    modalEditColumn,
    modalAddUser,
    setModalAddUser,
    modalEditUser,
    modalAddCard,
    modalDeleteCard,
    modalEditCard,
    modalShareBoard,
    setModalShareBoard,
    nameInitial,
  } = useAuth();

  const {
    getBoardById,
    board,
    getColumnList,
    columnList,
    setBoardId,
    setCardId,
    moveCard,
  } = useBoard();
  const [columns, setColumns] = useState<GetColumnData[]>(columnList);
  const router = useRouter();
  const { id } = router.query;
  const boardId = typeof id === "string" ? parseInt(id, 10) : undefined;
  useEffect(() => {
    if (typeof boardId === "number") {
      getBoardById(boardId);
      getColumnList(boardId);
      setColumns(columnList);
    }
  }, [boardId]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    setColumns(columnList);
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (source.droppableId != destination.droppableId && boardId) {
      const body = {
        id: parseInt(result.draggableId, 10),
        columnId: parseInt(destination.droppableId, 10),
      };
      moveCard(body, boardId);
    }
  };

  function getNameInitial(name: string) {
    const initial = name.split(" ").map((word) => word.charAt(0));
    const initialString = initial.join("").toUpperCase();
    return initialString
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex flex-col items-center bg-blue-100 min-h-screen">
        <Header />
        <section className="w-[95%] max-w-[1600px] mt-[16px]">
          <div className="w-full flex justify-between items-center">
            <h2 className="flex items-center justify-start gap-[10px] h-[24px] text-[36px] font-bold">
              <span>{board.name}</span>
              <MdOutlineEdit
                onClick={() => {
                  setModalEditBoard(true);
                  setBoardId(board.id);
                }}
                className="cursor-pointer w-6 h-6"
              />
            </h2>
            <div className="border-[1px] border-gray2 rounded-[16px] flex gap-[8px] p-[16px] items-center h-[65px] ">
              {board.allowedUsers.map((user) =>
              
                user.profilePhoto ? (
                  <Image
                    key={user.id}
                    src={`http://localhost:3001/user/image/${user.profilePhoto}`}
                    alt="foto usuário"
                    width={30}
                    height={30}
                    className="rounded-[50%] h-[30px] w-[30px]"
                  />
                ) : (
                  
                  <div
                    key={user.id}
                    className="rounded-[50%] h-[30px] w-[30px] flex items-center justify-center bg-purple1"
                  >
                    <span className="text-white">{getNameInitial(user.name) }</span>
                  </div>
                )
              )}
              
              <IoMdAdd
                className="h-[24px] w-[24px] text-gray3 cursor-pointer"
                onClick={() => {
                  setBoardId(board.id);
                  setModalShareBoard(true);
                }}
              />
            </div>
          </div>
          <div className="flex items-start gap-[24px]">
            <div className="flex gap-[24px] max-w-full overflow-x-auto">
              {columnList.map((column) => {
                return <BoardColumn key={column.id} column={column} />;
              })}
            </div>
            <button
              className="mt-[24px] text-[16px] text-gray3 border-t-gray3 p-[16px] "
              onClick={() => setModalAddColumn(true)}
            >
              + ADICIONAR COLUNA
            </button>
          </div>
        </section>
        {modalEditBoard && <ModalEditBoard />}
        {modalAddColumn && <ModalAddColumn />}
        {modalEditColumn && <ModalEditColumn />}

        {modalAddUser && <ModalAddUser />}
        {modalAddCard && <ModalAddCard />}
        {modalDeleteCard && <ModalDeleteCard />}
        {modalEditCard && <ModalEditCard />}
        {modalShareBoard && (
          <ModalShareBoard tokenJWT={tokenJWT} board={board} />
        )}
      </main>
    </DragDropContext>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const id = query.id as string | undefined;

  if (!id) {
    return {
      notFound: true, // Isso retornará uma página 404
    };
  }

  const boardId = typeof id === "string" ? parseInt(id, 10) : undefined;

  const crypto = require("crypto");
  const chaveSecreta = crypto.randomBytes(32).toString("base64");

  const tokenJWT = jwt.sign(
    { payload: { boardId: boardId, role: "member" } },
    chaveSecreta,
    { expiresIn: "24h" }
  );

  return {
    props: {
      tokenJWT,
    },
  };
}

export default Board;
