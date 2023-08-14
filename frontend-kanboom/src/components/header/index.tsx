import { useAuth } from "@/context/authContext";
import Logo from "../../assets/logo-kanboom.png";
import Image from "next/image";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import DropdownMenu from "../dropdownMenu/dropdownMenu";
import ModalEditUser from "../modals/modalEditUser";
import { BsBell, BsBellFill } from "react-icons/bs";
import NotificationSection from "../notificationSection/notificationSection";
import { useBoard } from "@/context/boardContext";

function Header() {
  const {
    getUser,
    user,
    openMenu,
    setOpenMenu,
    nameInitial,
    modalEditUser,
    openNotification,
    setOpenNotification,
  } = useAuth();
  const { getNotifications, notificationList } = useBoard()
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  let idUser: number;

  if (typeof decodedToken === "object" && decodedToken !== null) {
    idUser = decodedToken.payload?.user?.id;
  }

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
    getUser(idUser);
    getNotifications(idUser)
  }, []);

  const unreadNotification =notificationList.filter((elem) => elem.read === false)

  return (
    <header className="w-full h-[80px] border-b-[2px] border-gra2 bg-white flex justify-center">
      <div className="h-full w-[95%] max-w-[1600px] flex items-center justify-between">
        <Image
          className="cursor-pointer"
          src={Logo}
          alt="Logo kanboom"
          onClick={() => router.push("/dashboard")}
        />
        <div className="flex items-center gap-[32px]">
          <div className="min-w-[500px] relative flex justify-end">
            {openNotification && <NotificationSection />}
            {openNotification ? (
              <BsBellFill
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => setOpenNotification(!openNotification)}
              />
            ) : !openNotification && unreadNotification.length == 0 ? (
              <BsBell
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => setOpenNotification(!openNotification)}
              />
            ) : <div className="w-[25px] h-[25px] relative flex justify-start items-start">
            <BsBell
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => setOpenNotification(!openNotification)}
              />
              <div className="w-[12px] h-[12px] bg-red-400 rounded-[50%] absolute text-black font-bold text-[10px] flex justify-center items-center">
                {unreadNotification.length}
              </div>
            </div>}
          </div>
            
          <div className="border-[1px] border-gray2 rounded-[16px] flex flex-col gap-[8px] p-[16px] items-center h-[65px] ">
            <div
              className="flex w-full items-center justify-between relative cursor-pointer gap-[8px]"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              {user.profilePhoto ? (
                <Image
                  src={`http://localhost:3001/user/image/${user.profilePhoto}`}
                  alt="foto usuário"
                  width={30}
                  height={30}
                  className="rounded-[50%] h-[30px] w-[30px]"
                />
              ) : (
                <div className="rounded-[50%] h-[30px] w-[30px] flex items-center justify-center bg-purple1">
                  <span className="text-white">{nameInitial}</span>
                </div>
              )}
              <p className="text-gray3 text-[16px]">{user.name}</p>
            </div>
            {openMenu && <DropdownMenu />}
          </div>
        </div>
      </div>
      {modalEditUser && <ModalEditUser />}
    </header>
  );
}

export default Header;
