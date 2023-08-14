import { TextField } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/authContext";

function ModalForgotPassword() {
  const { setModalAddUser  } = useAuth();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-[400px] px-[24px] pt-[24px] pb-[48px] bg-white rounded-16px absolute max-h-350px rounded-xl flex flex-col items-end z-10">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => setModalAddUser (false)}
        />
        <form className="flex flex-col gap-[16px]">
          <h2 className="font-bold text-[24px]">Adicionar Usuário</h2>
          <p className="text-gray-600 font-normal text-[16px]">
            Informe o e-mail do usuário que irá ser adicionado ao quadro
          </p>
          <TextField
            label="Email"
            variant="outlined"
            type="text"
            className="w-full"
          />
          <button className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold">
            Enviar convite
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalForgotPassword;
