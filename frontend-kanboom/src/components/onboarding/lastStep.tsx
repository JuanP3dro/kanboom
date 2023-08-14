import { useRouter } from "next/router";
import Onboarding4 from "../../assets/Onboarding4.png";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";

function LastStepOnboarding() {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  let idUser: number;

if (typeof decodedToken === 'object' && decodedToken !== null) {
  idUser = decodedToken.payload?.user?.id;
}
  
  const { completeOnboarding } = useAuth();

  return (
    <div className="bg-white rounded-[16px] px-[24px] py-[40px] w-[90%] h-[95%] max-w-[600px] max-h-[600px] flex flex-col justify-between items-center gap-[16px]">
      <Image
        src={Onboarding4}
        alt=""
        className="border-[2px] border-gray1 rounded-[16px] max-w-full"
      />
      <h2 className="text-gray1 text-center text-[24px] font-bold">
        Criando Cards
      </h2>
      <p className="text-gray1 text-center text-[16px] font-normal">
        Cards representam as tarefas ou funcionalidades que você irá monitorar.
        Basta clicar no botão ”Adicionar Card” na parte inferior de uma coluna
        para adicionar seu novo card.
      </p>
      <p className="text-gray1 text-center text-[16px] font-normal">
        Você pode preencher também as estimativas de complexidade e tempo para
        te ajudar a se planejar no seu dia-a-dia!
      </p>
      <span
        className="text-blue-500 text-18 font-bold cursor-pointer"
        onClick={() => {
          
          completeOnboarding(idUser)
        }}
      >
        PRÓXIMO
      </span>
    </div>
  );
}

export default LastStepOnboarding;
