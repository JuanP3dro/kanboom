import Image from "next/image";
import Logo from "../../assets/logo-kanboom.png";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useBoard } from "@/context/boardContext";
import { useAuth } from "@/context/authContext";
import { parseCookies } from "nookies";
import { useEffect } from "react";

interface DecodedToken {
  id: number;
  role: string;
  email: string;
}

function ConfirmInvite() {
  const router = useRouter();
  const { getUser, user } = useAuth();
  const { acceptInvite } = useBoard();
  const cookies = parseCookies();
  const tokenUser = cookies.token;
  const decodedTokenUser = jwt.decode(tokenUser);
  let idUser= 0;
  let body = {
    email: "",
    token: "",
  };
  const { token } = router.query;

  if (typeof decodedTokenUser === "object" && decodedTokenUser !== null) {
    idUser = decodedTokenUser.payload?.user?.id;
    
  }

  useEffect(() => {
    if (!tokenUser) {
      router.push('/')
    }
    if (typeof token == "string") {
      body.email = user.email;
      body.token = token;
      
      getUser(idUser);
    }
  }, [idUser, token]);
  return (
    <main className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <section className="px-[24px] py-[48px] flex flex-col bg-white rounded-xl w-[90%] max-w-[500px] gap-[10px]">
        <Image src={Logo} alt="logo kanboom" className="mx-auto" />
        <div className="w-full h-full flex flex-col  gap-[16px]">
          <button
            className="bg-blue2 rounded-lg text-white text-[16px] py-[8px] px-[16px] font-bold"
            onClick={() => {
              if (typeof token == "string") {
                body.email = user.email;
                body.token = token;
                acceptInvite(body);
              }
              
            }}
          >
            Aceitar convite
          </button>
        </div>
      </section>
    </main>
  );
}

export default ConfirmInvite;
