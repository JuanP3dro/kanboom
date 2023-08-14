export interface allowedUsers { 
  id: number,
  profilePhoto: string,
  name: string
}


export interface ICards {
  id: number,
  title: string,
  description: string,
  responsible: number,
  historyPoints: number,
  hours: number,
  columnId: number,
  allowedUsers: allowedUsers[]
}