import { useBoard } from "@/context/boardContext";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";

function NotificationSection() {
  const { getNotifications, notificationList, updateNotification } = useBoard();
  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  let idUser: 0;

  if (typeof decodedToken === "object" && decodedToken !== null) {
    idUser = decodedToken.payload?.user?.id;
  }
  useEffect(() => {
    getNotifications(idUser);
  }, []);
  return (
    <section className="w-[95%] max-w-[500px] min-h-[500px] max-h-[90%] bg-gray3 absolute top-0 left-0 rounded-[16px] text-white font-semibold overflow-y-auto">
      <h2 className="text-center py-[8px] border-bottom-white">Notificações</h2>
      <ul className="w-full flex flex-col max-h-full overflow-y-auto">
        {notificationList.map((notification) => {
          return (
            <li
              key={notification.id}
              className="w-full px-[16px] py-[8px] hover:bg-gray2 flex justify-between gap-[16px]"
            >
              <p className="">{notification.text}</p>
              <div className="min-w-[150px] flex items-center gap-[5px]" >
                <label htmlFor="">Marcar como lida</label>
                {notification.read ? (
                  <input
                    type="radio"
                    onClick={() => updateNotification(notification.id, idUser)}
                    checked
                  />
                ) : (
                  <input
                    type="radio"
                    onClick={() => updateNotification(notification.id, idUser)}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default NotificationSection;
