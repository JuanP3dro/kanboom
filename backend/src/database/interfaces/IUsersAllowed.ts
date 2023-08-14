interface userBoards { 
  userId: number,
  boardId: number,
}

interface dataValues {
  id: number,
  userBoards: userBoards;
}

interface allowedUsers {
 dataValues: dataValues
}


export interface IUsersAllowed {
  id: number;
  name: string;
  allowedUsers: allowedUsers[];
}
