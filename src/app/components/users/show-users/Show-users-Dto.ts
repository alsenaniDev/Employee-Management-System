export interface PeriodicElement {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userId: string;
  role: string,
  groups: string;
}


export class getUserModel {
  CreatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: number;
  userId: string;
}


export class getRoleModel {
  id: string;
  name: string;
}

export class getGroupModel {
  id: string;
  name: string
}