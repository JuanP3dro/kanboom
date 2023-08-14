import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "../../assets/logo-kanboom.png";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import api from "@/services/api";

function ValidateAccount() {
  const router = useRouter();
  const { token } = router.query;
  console.log(token);
  
    const validateUser = async () => {
    try {
      if (token) {
        await api.patch(`/auth/email?token=${token!}`);
        toast.success("conta validada com sucesso!");
        console.log("deu certo");
      }
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  validateUser();
  return (
    <main className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <section className="px-[24px] py-[48px] flex flex-col bg-white rounded-xl w-[90%] max-w-[500px] gap-[10px]">
        <Image src={Logo} alt="logo kanboom" className="mx-auto" />
        <div className="w-full h-full flex flex-col  gap-[16px]">
          <h2 className="text-[24px]  font-bold text-center">
            Cadastro realizado com sucesso!
          </h2>
          <p className="text-gray-600 font-normal text-[16px]">
            Em 5 segundos você será redirecionado para a página de login
          </p>
          <p className="text-gray-600 font-normal text-[16px] text-center">
            Ou clique{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => router.push("/")}
            >
              aqui
            </span>{" "}
            se preferir
          </p>
        </div>
      </section>
    </main>
  );
}

export default ValidateAccount;
