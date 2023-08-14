import { TextField } from "@mui/material";
import Logo from "../assets/logo-kanboom.png";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "@/schemas/user.schemas";
import { useAuth } from "@/context/authContext";
import { parseCookies } from "nookies";
import RegisterForm from "@/components/register/register";

function Register() {
  const { registerForm, modalLink } = useAuth();
  const cookies = parseCookies();
  const token = cookies.token;
  const router = useRouter();
  
  if (token) {
    router.push('/dashboard')
  }

  return (
    <main className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      {registerForm && <RegisterForm/>}
    </main>
  );
}

export default Register;
