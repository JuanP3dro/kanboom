import { createContext, useContext, useState } from "react";
import { Props, useAuth } from "./authContext";
import {
  AcceptInviteData,
  CreateBoardData,
  DeleteBoardMemberData,
  GetBoardData,
  ShareInviteData,
  UpdateBoardData,
  UpdateRoleData,
} from "@/schemas/board.schemas";
import api from "@/services/api";
import { toast } from "react-toastify";
import {
  CreateColumnData,
  GetColumnData,
  UpdateColumnData,
} from "@/schemas/column.schemas";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import {
  CreateCardData,
  GetCardData,
  MoveCardData,
  UpdateCardData,
} from "@/schemas/card.schemas";
import { useRouter } from "next/router";
import { CreateCommentData } from "@/schemas/comment.schemas";
import { GetNotificationData } from "@/schemas/notification.schemas";

interface boardProviderData {
  createBoard: (data: CreateBoardData) => void;
  createColumn: (data: CreateColumnData, boardId: number) => void;
  createCard: (data: CreateCardData, id: number) => void;
  getBoardList: () => void;
  boardList: GetBoardData[];
  board: GetBoardData;
  setBoard: React.Dispatch<React.SetStateAction<GetBoardData>>;
  getBoardById: (id: number) => void;
  getCardById: (id: number) => void;
  getCardList: (id: number) => void;
  getColumnList: (id: number) => void;
  updateBoard: (data: UpdateBoardData, id: number) => void;
  deleteCard: (cardId: number, boardId: number) => void;
  updateCard: (data: UpdateCardData, cardId: number, boardId: number) => void;
  updateColumn: (
    data: UpdateColumnData,
    columnId: number,
    boardId: number
  ) => void;
  columnList: GetColumnData[];
  columnId: number;
  cardId: number;
  setColumnId: React.Dispatch<React.SetStateAction<number>>;
  setCardId: React.Dispatch<React.SetStateAction<number>>;
  card: GetCardData;
  responsible: number;
  setResponsible: React.Dispatch<React.SetStateAction<number>>;
  boardId: number;
  setBoardId: React.Dispatch<React.SetStateAction<number>>;
  deleteBoard: (id: number) => void;
  deleteColumn: (columnId: number, boardId: number) => void;
  createComment: (data: FormData, id: number) => void;
  moveCard: (data: MoveCardData, boardId: number) => void;
  acceptInvite: (data: AcceptInviteData) => void;
  getColumnById: (id: number) => void;
  column: GetColumnData;
  setColumn: React.Dispatch<React.SetStateAction<GetColumnData>>;
  shareInvite: (data: ShareInviteData, id: number) => void;
  getNotifications: (id: number) => void;
  notificationList: GetNotificationData[]
  setNotificationList: React.Dispatch<React.SetStateAction<GetNotificationData[]>>;
  updateNotification: (id: number, userId: number) => void
  updateRole: (id: number, data: UpdateRoleData) => void
  deleteBoardMember: (boardId: number, userId: number) => void
}

const BoardContext = createContext<boardProviderData>({} as boardProviderData);

function BoardProvider({ children }: Props) {
  const {
    setModalCreateBoard,
    setModalAddColumn,
    setModalEditBoard,
    setModalEditColumn,
    setModalAddCard,
    setModalDeleteCard,
    setModalEditCard,
  } = useAuth();
  const [boardList, setBoardList] = useState<GetBoardData[]>([]);
  const [board, setBoard] = useState<GetBoardData>({
    id: 0,
    name: "",
    allowedUsers: [],
  });
  const [columnList, setColumnList] = useState<GetColumnData[]>([]);
  const [responsible, setResponsible] = useState(0);
  const [columnId, setColumnId] = useState(0);
  const [cardId, setCardId] = useState(0);
  const [boardId, setBoardId] = useState(0);
  const [card, setCard] = useState<GetCardData>({
    id: 0,
    title: "",
    description: "",
    responsible: 0,
    historyPoints: "",
    hours: "",
    columnId: 0,
    comments: [],
    responsibleUser: {
      id: 0,
      profilePhoto: null,
      name: "",
    },
  });
  const [column, setColumn] = useState<GetColumnData>({
    id: 0,
    name: "",
    color: "",
    boardId: 0,
    card: [],
  });
  const [notificationList, setNotificationList] = useState<GetNotificationData[]>([])
  const router = useRouter();

  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  let idUser: number;

  if (typeof decodedToken === "object" && decodedToken !== null) {
    idUser = decodedToken.payload?.user?.id;
  }

  const getBoardList = async () => {
    try {
      const boards = await api.get(`/board?userId=${idUser}`);
      setBoardList(boards.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createBoard = async (data: CreateBoardData) => {
    try {
      await api.post<CreateBoardData>("/board/create", data);
      toast.success("Quadro criado com sucesso!");
      setModalCreateBoard(false);
      getBoardList();
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  };

  const getBoardById = async (id: number) => {
    try {
      const board = await api.get(`/board/${id}`);
      setBoard(board.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getColumnList = async (id: number) => {
    try {
      const columns = await api.get<GetColumnData[]>(`columns?boardId=${id}`);
      setColumnList(columns.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createColumn = async (data: CreateColumnData, boardId: number) => {
    try {
      await api.post<CreateColumnData>("/columns/create", data);
      toast.success("Quadro criado com sucesso!");
      setModalAddColumn(false);
      getColumnList(boardId);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  };

  const getCardList = async (id: number) => {
    try {
      const cards = await api.get<GetCardData[]>(`/cards?columnId=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const createCard = async (data: CreateCardData, id: number) => {
    try {
      await api.post<CreateCardData>("/cards/create", data);
      toast.success("Card criado com sucesso!");
      getColumnList(id);
      setModalAddCard(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCard = async (cardId: number, boardId: number) => {
    try {
      await api.delete(`/cards/delete/${cardId}`);
      toast.success("Card deletado com sucesso!");
      getColumnList(boardId);
      console.log(boardId);
      setModalDeleteCard(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async (
    data: UpdateCardData,
    cardId: number,
    boardId: number
  ) => {
    try {
      await api.patch(`/cards/edit/${cardId}`, data);
      getColumnList(boardId);
      setModalEditCard(false);
      toast.success("Card atualizado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBoard = async (id: number) => {
    try {
      await api.delete(`/board/delete/${id}`);
      toast.success("Quadro deletado com sucesso!");
      setModalEditBoard(false);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const updateBoard = async (data: UpdateBoardData, id: number) => {
    try {
      await api.patch(`/board/edit/${id}`, data);
      toast.success("Quadro atualizado com sucesso!");
      setModalEditBoard(false);
      getBoardById(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getColumnById = async (id: number) => {
    try {
      const resp = await api.get<GetColumnData>(`columns/${id}`);
      setColumn(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateColumn = async (
    data: UpdateColumnData,
    columnId: number,
    boardId: number
  ) => {
    try {
      await api.patch(`/columns/edit/${columnId}`, data);
      toast.success("Coluna atualizada com sucesso!");
      setModalEditColumn(false);
      getColumnList(boardId);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteColumn = async (columnId: number, boardId: number) => {
    try {
      await api.delete(`/columns/delete/${columnId}`);
      toast.success("Coluna deletada com sucesso!");
      getColumnList(boardId);
      setModalEditColumn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCardById = async (id: number) => {
    try {
      const card = await api.get<GetCardData>(`/cards/${id}`);
      setCard(card.data);
    } catch (error) {
      console.log(error);
    }
  };

  const moveCard = async (data: MoveCardData, boardId: number) => {
    try {
      await api.patch("/cards/move", data);
      getColumnList(boardId);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (data: FormData, id: number) => {
    try {
      const comment = await api.post(`/comments/upload`, data);
      toast.success("Comentário criado com sucesso!");
      getCardById(id);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptInvite = async (data: AcceptInviteData) => {
    try {
      console.log(data)
      await api.post("/board/accept", data);
      toast.success("Convite aceito com sucesso");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const shareInvite = async (data: ShareInviteData, id: number) => {
    try {
      await api.post(`/board/${id}/invite`, data);
      toast.success("Convite enviado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async (id: number) => {
    try {
      const resp = await api.get<GetNotificationData[]>(
        `/notifications?userId=${id}`
      );
      setNotificationList(resp.data)
    } catch (error) {
      console.log(error);
    }
  };

  const updateNotification = async (id: number, userId: number) => {
    try {
      await api.patch( `/notifications/${id}`)
      getNotifications(userId)
    } catch (error) {
      console.log(error)
    }
  }

  const updateRole = async (id: number, data: UpdateRoleData) => {
    try {
      await api.patch(`/board/${id}/edit/role`, data)
      toast.success("cargo alterado com sucesso!")
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBoardMember = async (boardId: number, userId: number) => {
    try {
      await api.delete(`/deletedUser?boardId=${boardId}&userId=${userId}`)
      getBoardById(boardId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BoardContext.Provider
      value={{
        createBoard,
        getBoardList,
        boardList,
        board,
        setBoard,
        getBoardById,
        createColumn,
        getColumnList,
        columnList,
        createCard,
        columnId,
        setColumnId,
        cardId,
        setCardId,
        updateBoard,
        updateColumn,
        getCardById,
        card,
        responsible,
        setResponsible,
        getCardList,
        deleteCard,
        updateCard,
        boardId,
        setBoardId,
        deleteBoard,
        deleteColumn,
        createComment,
        moveCard,
        acceptInvite,
        getColumnById,
        column,
        setColumn,
        shareInvite,
        getNotifications,
        notificationList,
        setNotificationList,
        updateNotification,
        updateRole,
        deleteBoardMember
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export default BoardProvider;

export const useBoard = () => useContext(BoardContext);
