import Onboarding2 from "../../assets/Onboarding2.png";
import { useAuth } from "../../context/authContext";
import Image from "next/image";

function SecondStepOnboarding() {
  const { setSecondStep, setThirdStep, idUser, completeOnboarding } = useAuth();

  return (
    <div className="bg-white rounded-[16px] px-[24px] py-[40px] w-[90%] h-[95%] max-w-[600px] max-h-[600px] flex flex-col justify-between items-center gap-[16px]">
      <Image
        src={Onboarding2}
        alt=""
        className="border-[2px] border-gray1 rounded-[16px] max-w-full"
      />
      <h2 className="text-gray1 text-center text-[24px] font-bold">
        Criando Quadros
      </h2>
      <p className="text-gray1 text-center text-[16px] font-normal">
        Quadros são como seus projetos serão organizados. Você pode criar mais
        de um quadro, basta clicar no botão ”criar quadro” no canto superior
        direito na tela de ”meus quadros”
      </p>
      <span
        className="text-blue-500 text-18 font-bold cursor-pointer"
        onClick={() => {
          setSecondStep(false);
          setThirdStep(true);
        }}
      >
        PRÓXIMO
      </span>
      <span  className="text-blue-500 text-16 font-semibold cursor-pointer" onClick={() => {
          
          completeOnboarding(idUser)
        }}>Pular</span>
    </div>
  );
}

export default SecondStepOnboarding;
