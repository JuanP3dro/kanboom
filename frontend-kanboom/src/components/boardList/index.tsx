import { useBoard } from "@/context/boardContext";
import BoardCard from "./boardCard";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";

function BoardList() {
  const { getBoardList, boardList } = useBoard();
  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  let idUser: number;

  if (typeof decodedToken === "object" && decodedToken !== null) {
    idUser = decodedToken.payload?.user?.id;
  }
  useEffect(() => {
    getBoardList();
  }, []);
  return (
    <ul className="w-full mt-[16px] flex flex-wrap gap-[16px]">
      {boardList.map((board) => {
        return <BoardCard key={board.id} board={board} />;
      })}
    </ul>
  );
}

export default BoardList;
