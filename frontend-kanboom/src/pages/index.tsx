import { useAuth } from "../context/authContext";
import ModalForgotPassword from "../components/modals/modalForgotPassword";
import Login from "@/components/login/login";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export default function Home() {
  const { modalPassword, login } = useAuth();
  const cookies = parseCookies();
  const token = cookies.token;
  const router = useRouter()
  
  if (token) {
    router.push('/dashboard')
  }

  return (
    <main className="w-screen h-screen bg-gray-900 flex justify-center items-center relative z-0">
      {login && <Login />}
      {modalPassword && <ModalForgotPassword />}
    </main>
  );
}
