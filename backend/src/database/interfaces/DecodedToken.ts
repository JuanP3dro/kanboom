export interface DecodedToken {

  payload: {
    boardId: number;
    role: string;
    email: string;
  };
  iat: number,
  exp: number
}
