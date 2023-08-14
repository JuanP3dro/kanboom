import { AiOutlineClose } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import Clipboard from "clipboard";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  AllowedUsers,
  ShareInviteData,
  shareInviteSchema,
} from "@/schemas/board.schemas";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useBoard } from "@/context/boardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalShareBoardProps {
  tokenJWT: string;
  board: {
    id: number;
    name: string;
    allowedUsers: AllowedUsers[];
  };
}

function ModalShareBoard({ tokenJWT, board }: ModalShareBoardProps) {
  const users = board.allowedUsers;
  const { setModalShareBoard, nameInitial, user } = useAuth();
  const { shareInvite, updateRole, deleteBoardMember } = useBoard();
  const link = `localhost:3000/confirmInvite/${tokenJWT}`;
  const buttonRef = useRef(null);
  const currentUser = users.filter((elem) => (elem.name === user.name));
  const boardId = board.id;
  const userRole = currentUser[0].userBoardRole.role;
  useEffect(() => {
    if (buttonRef.current) {
      const clipboard = new Clipboard(buttonRef.current);

      clipboard.on("success", () => {
        toast.success("Link copiado para a área de transferência!");
      });

      return () => {
        clipboard.destroy();
      };
    }
  }, []);

  function getNameInitial(name: string) {
    const initial = name.split(" ").map((word) => word.charAt(0));
    const initialString = initial.join("").toUpperCase();
    return initialString
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShareInviteData>({
    resolver: zodResolver(shareInviteSchema),
  });
  const onFormShareInviteSubmit = (formData: ShareInviteData) => {
    shareInvite(formData, boardId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[500px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10 gap-[16px]">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => setModalShareBoard(false)}
        />
        <form
          className="flex gap-[10px] items-center justify-between w-full"
          onSubmit={handleSubmit(onFormShareInviteSubmit)}
        >
          <div className="flex flex-col items-center w-full">
            <input
              type="text"
              className="h-[30px] rounded-[8px] w-full border-[1px] border-gray3"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <select {...register("role")} defaultValue={"member"}>
            <option value="member">Membro</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Compartilhar</button>
        </form>
        <div className="flex items-center justify-between w-full">
          <div className="border-[1px] bg-gray3 w-[30px] h-[30px] flex items-center justify-center rounded-[8px]">
            <FiShare2 />
          </div>
          <p>Qualquer pessoa com o link</p>
          <button
            type="button"
            className="text-blue1 cursor-pointer"
            ref={buttonRef}
            data-clipboard-text={link}
            value={link}
          >
            Copiar Link
          </button>
        </div>
        <ul className="flex flex-col gap-[16px] w-full max-h-[80px] overflow-y-auto">
          {users.map((user) => {
            
            return (
              <li
                key={user.id}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-[8px]">
                  {user.profilePhoto ? (
                    <Image src={`https://kaanboom-production.up.railway.app/user/image/${user.profilePhoto}`} alt="foto usuário" width={30} height={30} className="rounded-[50%] h-[30px] w-[30px]" />

                  ) : (
                    <div className="rounded-[50%] h-[30px] w-[30px] flex items-center justify-center bg-purple1">
                      <span className="text-white">{getNameInitial(user.name)}</span>
                    </div>
                  )}
                  <p>{user.name}</p>
                </div>
                <div className="flex gap-[8px]">
                  {userRole === "admin" &&
                  user.userBoardRole.role === "member" ? (
                    <select
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        const body = {
                          role: selectedValue,
                          userId: user.id,
                        };
                        updateRole(boardId, body);
                      }}
                    >
                      <option value="member">Membro</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : userRole === "admin" &&
                    user.userBoardRole.role === "admin" ? (
                    <select
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        const body = {
                          role: selectedValue,
                          userId: user.id,
                        };
                        updateRole(boardId, body);
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="member">Membro</option>
                    </select>
                  ) : userRole === "member" && user.userBoardRole.role === "member" ? (
                    <span>Membro</span>
                  ): (
                    <span>Admin</span>
                  )}
                  {userRole == "admin" && currentUser[0].id != user.id && (
                    <BsTrash3
                      className="cursor-pointer"
                      onClick={() => deleteBoardMember(board.id, user.id)}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ModalShareBoard;
