import { useAuth } from "@/context/authContext";
import BoardList from "../components/boardList/index";
import Header from "../components/header/index";
import { HiPlus } from "react-icons/hi";
import ModalCreateBoard from "@/components/modals/modalCreateBoard";import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Dashboard() {
  const { modalCreateBoard, setModalCreateBoard, user, getUser } = useAuth();
  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push('/')
    }
    if (decodedToken) {
      if (typeof decodedToken != "string") {
        getUser(decodedToken.payload.user.id);
        if (user.completedStep == false) {
          router.push('/onboarding')
        }
      }
    }
  }, [user.completedStep]);
  return (
    <main className="flex flex-col items-center bg-gray4 min-h-screen">
      <Header />
      <section className="w-[95%] max-w-[1600px] mt-[16px]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-[36px] font-bold">Meus Quadros</h2>
          <button
            className="px-[16px] py-[8px] bg-blue2 rounded-[8px] text-white text-[18px] font-bold flex items-center gap-[10px]"
            onClick={() => setModalCreateBoard(true)}
          >
            <HiPlus />
            <span>Criar quadro</span>
          </button>
        </div>
        <BoardList />
      </section>
      {modalCreateBoard && <ModalCreateBoard />}
    </main>
  );
}

export default Dashboard;
