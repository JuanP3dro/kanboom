import {
  LoginData,
  RegisterData,
  UpdatePasswordData,
  UserData,
  iSendEmail,
} from "@/schemas/user.schemas";
import api from "@/services/api";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { parseCookies, setCookie } from "nookies";
import jwt from "jsonwebtoken";

export interface Props {
  children: ReactNode;
}

// interface UserData {
//   name: string;
//   completedStep: boolean;
//   email: string;
//   expiredToken: null | string;
//   id: number;
//   isValid: boolean;
//   password: string;
//   tokenAuth: string;
// }

interface authProviderData {
  modalPassword: boolean;
  setModalPassword: React.Dispatch<React.SetStateAction<boolean>>;
  modalCreateBoard: boolean;
  setModalCreateBoard: React.Dispatch<React.SetStateAction<boolean>>;
  modalEditBoard: boolean;
  setModalEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  modalAddColumn: boolean;
  setModalAddColumn: React.Dispatch<React.SetStateAction<boolean>>;
  modalEditColumn: boolean;
  setModalEditColumn: React.Dispatch<React.SetStateAction<boolean>>;
  modalEditUser: boolean;
  setModalEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  modalDeleteCard: boolean;
  setModalDeleteCard: React.Dispatch<React.SetStateAction<boolean>>;
  modalAddCard: boolean;
  setModalAddCard: React.Dispatch<React.SetStateAction<boolean>>;
  modalEditCard: boolean;
  setModalEditCard: React.Dispatch<React.SetStateAction<boolean>>;
  modalAddUser: boolean;
  setModalAddUser: React.Dispatch<React.SetStateAction<boolean>>;
  modalShareBoard: boolean;
  setModalShareBoard: React.Dispatch<React.SetStateAction<boolean>>;
  firstStep: boolean;
  setFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
  secondStep: boolean;
  setSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
  thirdStep: boolean;
  setThirdStep: React.Dispatch<React.SetStateAction<boolean>>;
  lastStep: boolean;
  setLastStep: React.Dispatch<React.SetStateAction<boolean>>;
  registerUser: (userData: RegisterData) => void;
  loginUser: (loginData: LoginData) => void;
  getUser: (id: number) => void;
  replacePassword: (data: UpdatePasswordData, id: number) => void;
  completeOnboarding: (idUser: number) => void;
  sendEmail: (data: iSendEmail) => void;
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  registerForm: boolean;
  setRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  idUser: number;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  modalLink: boolean;
  setModalLink: React.Dispatch<React.SetStateAction<boolean>>;
  openNotification: boolean;
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>;
  resendLink: (data: iSendEmail) => void;
  nameInitial: string;
  setNameInitial: React.Dispatch<React.SetStateAction<string>>;
  updateUser: (data: FormData) => void
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

function AuthProvider({ children }: Props) {
  const [modalPassword, setModalPassword] = useState(false);
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const [login, setLogin] = useState(true);
  const [registerForm, setRegisterForm] = useState(true);
  const [modalCreateBoard, setModalCreateBoard] = useState(false);
  const [modalEditBoard, setModalEditBoard] = useState(false);
  const [modalAddColumn, setModalAddColumn] = useState(false);
  const [modalEditColumn, setModalEditColumn] = useState(false);
  const [modalDeleteCard, setModalDeleteCard] = useState(false);
  const [modalAddUser, setModalAddUser] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [modalAddCard, setModalAddCard] = useState(false);
  const [modalEditCard, setModalEditCard] = useState(false);
  const [modalLink, setModalLink] = useState(false);
  const [modalShareBoard, setModalShareBoard] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);  
  const [user, setUser] = useState<UserData>({
    name: "",
    completedStep: false,
    email: "",
    expiredToken: null,
    id: 0,
    isValid: true,
    password: "",
    tokenAuth: "",
    profilePhoto: null
  });
  const [nameInitial, setNameInitial] = useState("");
  

  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  let idUser = 0;

  if (typeof decodedToken === "object" && decodedToken !== null) {
    idUser = decodedToken.payload?.user?.id;
  }
  function getNameInitial(name: string) {
    const initial = name.split(" ").map((word) => word.charAt(0));
    const initialString = initial.join("").toUpperCase();
    setNameInitial(initialString);
  }
  

  const registerUser = (userData: RegisterData) => {
    api
      .post("/user/create", userData)

      .then(() => {
        toast.success(
          "Úsuário cadastrado com sucesso! Verifique seu e-mail para validar a conta."
        );
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao criar usuário, tente utilizar outro e-mail!");
      });
  };

  const getUser = async (id: number) => {
    try {
      const loggedClient = await api.get<UserData>(`/user/${id}`);
      setUser(loggedClient.data);
      getNameInitial(loggedClient.data.name)
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (loginData: LoginData) => {
    try {
      const response = await api.post("/auth/login", loginData);
      setCookie(null, "token", response.data.token);
      const decodedToken = jwt.decode(response.data.token);
      let idUser: number;

      if (typeof decodedToken === "object" && decodedToken !== null) {
        idUser = decodedToken.payload?.user?.id;
        getUser(decodedToken.payload?.user?.id);
        if (user.completedStep) {
          router.push("/dashboard");
        } else {
          router.push("/onboarding");
        }
        toast.success("login realizado com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Erro ao logar, verifique se o e-mail e senha estão corretos!"
      );
    }
  };

  const sendEmail = async (data: iSendEmail) => {
    try {
      await api.post("/user/recovery_password", data);
      setModalPassword(false);
      setLogin(true);
      toast.success("Email enviado com sucesso");
    } catch (error) {
      toast.error("Usuário não encontrado");
      console.log(error);
    }
  };

  const completeOnboarding = async (idUser: number) => {
    try {
      await api.patch(`/auth/steps?id=${idUser}`);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const replacePassword = async (data: UpdatePasswordData, id: number) => {
    try {
      await api.patch<UpdatePasswordData>(`/user/replace_password/${id}`, data);
      toast.success("Senha alterada com sucesso!");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const resendLink = async(data: iSendEmail) => {
    try {
      await api.post(`/auth/refresh_token`, data);
      toast.success("Email com o novo link de ativação foi enviado!");
    } catch (error) {
      console.log(error)
      toast.error('E-mail inválido')
    }
  }
  const updateUser = async(data: FormData) => {
    try {
      await api.patch(`/user/update/${idUser}`, data)
      toast.success('Dados atualizados com sucesso!')
      getUser(idUser)
      setModalEditUser(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        modalPassword,
        setModalPassword,
        modalCreateBoard,
        setModalCreateBoard,
        modalEditBoard,
        setModalEditBoard,
        modalAddColumn,
        setModalAddColumn,
        modalEditColumn,
        setModalEditColumn,
        modalDeleteCard,
        setModalDeleteCard,
        modalAddUser,
        setModalAddUser,
        firstStep,
        setFirstStep,
        secondStep,
        setSecondStep,
        thirdStep,
        setThirdStep,
        lastStep,
        setLastStep,
        registerUser,
        loginUser,
        user,
        setUser,
        getUser,
        sendEmail,
        completeOnboarding,
        login,
        setLogin,
        replacePassword,
        idUser,
        openMenu,
        setOpenMenu,
        modalEditUser,
        setModalEditUser,
        modalAddCard,
        setModalAddCard,
        modalEditCard,
        setModalEditCard,
        resendLink,
        modalLink,
        setModalLink,
        registerForm,
        setRegisterForm,
        modalShareBoard,
        setModalShareBoard,
        nameInitial,
        setNameInitial,
        updateUser,
        openNotification,
        setOpenNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
