import Notifications from "../models/notifications";
import Users from "../models/users";

export default class NotificationsService {

  static getAllNotifications = async (userId: number) => {

    const getNotifications = await Notifications.findAll({
      include: [{
        model: Users,
        as: "users",
        where: { id: userId },
        attributes: {
          exclude: ['password', "email", "tokenAuth", "expiredToken", "completedStep", "isValid", "email", "profilePhoto"]
        }
      }]
    });

    return getNotifications;
  }

  static markAsRead = async (id: number, read: boolean) => {
    const isExist = await Notifications.findByPk(id);

    
    if (isExist) {
      const [affectedCount] = await Notifications.update({ read }, { where: { id } })

      return affectedCount;
    }

    throw new Error;
  }


}