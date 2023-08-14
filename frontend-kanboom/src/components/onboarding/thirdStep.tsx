import Onboarding3 from "../../assets/Onboarding3.png";
import { useAuth } from "../../context/authContext";
import Image from "next/image";

function ThirdStepOnboarding() {
  const { setThirdStep, setLastStep, idUser, completeOnboarding } = useAuth();

  return (
    <div className="bg-white rounded-[16px] px-[24px] py-[40px] w-[90%] h-[95%] max-w-[600px] max-h-[600px] flex flex-col justify-between items-center gap-[16px]">
      <Image
        src={Onboarding3}
        alt=""
        className="border-[2px] border-gray1 rounded-[16px] max-w-full"
      />
      <h2 className="text-gray1 text-center text-[24px] font-bold">
        {" "}
        Criando Colunas
      </h2>
      <p className="text-gray1 text-center text-[16px] font-normal">
        Colunas representam os estágios do seu processo de trabalho. Você pode
        adicionar quantas colunas quiser, basta clicar no botão ”Adicionar
        Coluna” na última coluna do seu quadro.
      </p>
      <span
        className="text-blue-500 text-18 font-bold cursor-pointer"
        onClick={() => {
          setThirdStep(false);
          setLastStep(true);
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

export default ThirdStepOnboarding;
