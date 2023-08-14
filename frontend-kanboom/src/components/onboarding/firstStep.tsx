import Onboarding1 from "../../assets/Onboarding1.png";
import { useAuth } from "../../context/authContext";
import Image from "next/image";

function FirstStepOnboarding() {
  const { setFirstStep, setSecondStep, idUser, completeOnboarding } = useAuth();

  return (
    <div className="bg-white rounded-[16px] px-[24px] py-[40px] w-[90%] h-[95%] max-w-[600px] max-h-[600px] flex flex-col justify-between items-center gap-[16px]">
      <Image
        src={Onboarding1}
        alt=""
        className="border-[2px] border-gray1 rounded-[16px] max-w-full"
      />
      <h2 className="text-gray1 text-center text-[24px] font-bold">
        Conheça o Kanboom
      </h2>
      <p className="text-gray1 text-center text-[16px] font-normal">
        Kanboom é uma plataforma de gestão de tarefas 100% voltado para pessoas
        de desenvolvimento!
      </p>
      <p className="text-gray1 text-center text-[16px] font-normal">
        Simples de usar e pronto para começar a melhorar seu fluxo de trabalho.
      </p>
      <span
        className="text-blue-500 text-18 font-bold cursor-pointer"
        onClick={() => {
          setFirstStep(false);
          setSecondStep(true);
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

export default FirstStepOnboarding;
