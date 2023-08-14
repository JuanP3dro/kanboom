import { useAuth } from "../context/authContext";
import FirstStepOnboarding from "../components/onboarding/firstStep";
import SecondStepOnboarding from "../components/onboarding/secondStep";
import ThirdStepOnboarding from "../components/onboarding/thirdStep";
import LastStepOnboarding from "../components/onboarding/lastStep";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Onboarding() {
  const { firstStep, secondStep, thirdStep, lastStep, getUser, user } = useAuth();
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
        if (user.completedStep == true) {
          router.push('/dashboard')
        }
      }
    }
  }, [user.completedStep, token]);

  return (
    <main className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      {firstStep && <FirstStepOnboarding />}
      {secondStep && <SecondStepOnboarding />}
      {thirdStep && <ThirdStepOnboarding />}
      {lastStep && <LastStepOnboarding />}
    </main>
  );
}

export default Onboarding;
