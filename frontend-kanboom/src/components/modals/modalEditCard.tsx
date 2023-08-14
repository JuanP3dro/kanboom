import { AiOutlineClose } from "react-icons/ai";
import { MdAutoFixHigh, MdOutlineBrightnessLow, MdAlarm } from "react-icons/md";
import { useAuth } from "../../context/authContext";
import User from "../../assets/M.png";
import Image from "next/image";
import AddFile from "../../assets/AddFile.png";
import { FaCommentDots } from "react-icons/fa";
import { useBoard } from "@/context/boardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateCardData, updateCardSchema } from "@/schemas/card.schemas";
import { useRouter } from "next/router";
import {
  CreateCommentData,
  createCommentSchema,
} from "@/schemas/comment.schemas";
import { useState } from "react";
import { format } from 'date-fns';
import { saveAs } from 'file-saver';


function ModalEditCard() {
  const {
    card,
    columnId,
    board,
    responsible,
    setResponsible,
    updateCard,
    boardId,
    createComment,
  } = useBoard();
  const { setModalEditCard, user } = useAuth();
  const [fileUpload, setFileUpload] = useState<Blob>(new Blob)
  const users = board.allowedUsers;
  const comments = card.comments;
  let formattedDate = ''
  const router = useRouter();
  const {
    register: registerEditCard,
    handleSubmit: handleSubmitEditCard,
    formState: { errors: errorsEditCard },
  } = useForm<UpdateCardData>({
    resolver: zodResolver(updateCardSchema),
  });
  const onFormEditCardSubmit = (formData: UpdateCardData) => {
    const newFormData = {
      ...formData,
      columnId: columnId,
      id: card.id,
      responsible: responsible,
      allowedUsers: users
    };
    if (typeof boardId == "number") {
      updateCard(newFormData, card.id, boardId);
      console.log(newFormData);
    }
  };
  console.log(card)
  const handleDownload = (url: string, name: string) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta da requisição. Verifique a URL.");
        }
        return response.blob();
      })
      .then((blob) => saveAs(blob, name))
      .catch((error) => {
        console.error("Erro durante o download do arquivo:", error);
      });
  };

  function getNameInitial(name: string) {
    const initial = name.split(" ").map((word) => word.charAt(0));
    const initialString = initial.join("").toUpperCase();
    return initialString
  }

  const {
    register: registerCreateComment,
    handleSubmit: handleSubmitCreateComment,
    formState: { errors: errorsCreateComment },
  } = useForm<CreateCommentData>({
    resolver: zodResolver(createCommentSchema),
  });
  console.log(errorsCreateComment);
  const newArray = JSON.stringify(users)
  const onFormCreateCommentSubmit = (formData: CreateCommentData) => {
    const newFormData = new FormData()
    newFormData.append('cardId', String(card.id))
    newFormData.append('author', user.name)
    newFormData.append('comment', formData.comment)
    newFormData.append('attachment', fileUpload)
    newFormData.append('allowedUsers', newArray)
    console.log(newFormData.get('allowedUsers'))
    createComment(newFormData, card.id)
    
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[1340px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10 max-h-[95%] overflow-y-auto gap-[16px]">
        <span
          className="cursor-pointer"
          onClick={() => setModalEditCard(false)}
        >
          <AiOutlineClose />
        </span>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-[12px] font-bold text-gray3">
              QUADRO 1 / TO DO
            </h2>
            <h3 className="text-[24px] font-bold">Card #0001</h3>
          </div>
          <div className="flex">
            {card.responsibleUser.profilePhoto ? (
                  <Image
                    key={user.id}
                    src={`http://localhost:3001/user/image/${card.responsibleUser.profilePhoto}`}
                    alt="foto usuário"
                    width={30}
                    height={30}
                    className="rounded-[50%] h-[30px] w-[30px]"
                  />
                ): (<div
                key={user.id}
                className="rounded-[50%] h-[30px] w-[30px] flex items-center justify-center bg-purple1"
              >
                <span className="text-white">{getNameInitial(card.responsibleUser.name) }</span>
              </div>
            )}
            <div>
              <p className="text-[10px] text-gray3 font-bold text-center">
                RESPONSÁVEL
              </p>
              <select className="w-full rounded-[8px] border-transparent border-[1px] px-[23px]"  onChange={(event) => {
                        setResponsible(parseInt(event.target.value, 10))
                        console.log(responsible)
                      }}>
                {users.map((user) => {
                  return (
                    <option
                      value={user.id}
                      className="border-none"
                      key={user.id}
                      onClick={() => {
                        
                      }}
                    >
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <form
            className="w-[49%] max-w-[640px] flex flex-col gap-[16px]"
            onSubmit={handleSubmitEditCard(onFormEditCardSubmit)}
          >
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                className="px-[8px] py-[16px] border-[1px] border-gray2 rounded-[8px] w-full"
                defaultValue={card.title}
                {...registerEditCard("title")}
              />
              {errorsEditCard.title && (
                <p className="text-red-500">{errorsEditCard.title?.message}</p>
              )}
            </div>
            <p className="text-blue2 text-[12px] font-bold flex gap-[10px] items-center">
              <MdAutoFixHigh className="w-[24px] h-[24px]" />
              <span>GERAR DESCRIÇÃO</span>
            </p>
            <div className="flex flex-col items-center w-full">
              <textarea
                className="w-full h-[500px] rounded-[8px] px-[8px] py-[16px] border-[1px] border-gray2 resize-none overflow-y-auto"
                defaultValue={card.description}
                {...registerEditCard("description")}
              ></textarea>
              {errorsEditCard.description && (
                <p className="text-red-500">
                  {errorsEditCard.description?.message}
                </p>
              )}
            </div>
            <div>
              <p className="text-[16px] font-bold">
                Estimativas de Tarefa (opcional)
              </p>
              <div className="flex w-full justify-between">
                <div className="flex gap-[8px] items-center ">
                  <MdOutlineBrightnessLow className="w-[20px] h-[20px]" />
                  <div className="flex flex-col items-center w-full">
                    <input
                      type="text"
                      className="px-[8px] py-[16px] border-[1px] border-gray2 rounded-[8px] w-full"
                      defaultValue={card.historyPoints}
                      {...registerEditCard("historyPoints")}
                    />
                    {errorsEditCard.historyPoints && (
                      <p className="text-red-500">
                        {errorsEditCard.historyPoints?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-[8px] items-center">
                  <MdAlarm className="w-[20px] h-[20px]" />
                  <div className="flex flex-col items-center w-full">
                    <input
                      type="text"
                      className="px-[8px] py-[16px] border-[1px] border-gray2 rounded-[8px] w-full"
                      defaultValue={card.hours}
                      {...registerEditCard("hours")}
                    />
                    {errorsEditCard.hours && (
                      <p className="text-red-500">
                        {errorsEditCard.hours?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold"
            >
              Salvar
            </button>
          </form>
          <section className="bg-gray4 rounded-[16px] min-h-full w-[49%] max-w-[640px] p-[16px] flex flex-col justify-between">
            <h3 className="text-[24px] font-bold">Comentários</h3>
            <ul className="h-full mt-[16px]">
              {comments.map((comment) => {
                {const date = new Date(comment.updatedAt)
                  formattedDate = format(date, 'dd/MM/yyyy');
                  console.log(formattedDate)}
                return (
                  <li
                    className="w-full flex justify-between items-center"
                    key={comment.id}
                  >
                    <div className="flex gap-[8px] h-full">
                      <Image
                        src={User}
                        alt="Imagem Usuário"
                        className="h-[30px] w-[30px] rounded-full"
                      />
                      <div className="h-full">
                        <p className="text-[12px] text-gray3">
                          {comment.author} comentou:
                        </p>
                        <p className="text-[16px]">{comment.comment}</p>
                        {comment.attachment != "blob" && <button className="cursor:pointer text-[12px]" onClick={()=> handleDownload(comment.attachment, 'anexo')}>Baixe o anexo aqui</button>}
                      </div>
                    </div>
                    <p className="h-full flex items-center">
                      {formattedDate}
                    </p>
                  </li>
                );
              })}
            </ul>
            <form className="flex justify-between items-center gap-[16px]">
              <div className="flex items-center justify-end w-[80%] relative">
                <div className="flex flex-col items-center w-full">
                  <input
                    type="text"
                    className="px-[8px] py-[16px] border-[1px] border-gray2 rounded-[8px] w-full bg-white"
                    placeholder="Escreva um comentário"
                    {...registerCreateComment("comment")}
                  />
                  {errorsCreateComment.comment && (
                    <p className="text-red-500">
                      {errorsCreateComment.comment?.message}
                    </p>
                  )}
                </div>
                <FaCommentDots
                  className="absolute mr-[8px] w-[20px] h-[20px] cursor-pointer text-blue1"
                  onClick={handleSubmitCreateComment(onFormCreateCommentSubmit)}
                />
              </div>
              <div className="w-[60px] h-[60px] relative cursor-pointer">
                <label className="w-[59px] h-[59px] rounded-full cursor-pointer relative">
                  <Image src={AddFile} alt={''} width={70} height={70} className="absolute"/>
                <input
                  type="file"
                  id="fileInput"
                  className="w-[50px] h-[50px] rounded-[50%]"
                  {...registerCreateComment("attachment")}
                  onChange={(event) => {{event.target.files ? setFileUpload(event.target.files[0]): null}}}
                />
                </label>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ModalEditCard;
