type userT = {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  balance: number;
  incomingBalance?: number;
  outgoingBalance?: number;
  isAdmin?: boolean;
  profilePic: string;
  cardNumber?: string;
  cardExpMonthYear?: string;
  cardCVV?: string;
  cardBalance?: number;
  alert: string;
  identification: string;
  accountNumber: number;
  incomingLimit?: number;
  outgoingLimit?: number;
  pseudoEmail: string;
  pseudoPassword?: string;
};
type transactionT = {
  $id: string;
  sender: string;
  reciever: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  purpose: string;
  date: string;
};
type cardTransactionT = {
  $id: string;
  userId: string;
  amount: number;
  company: string;
  date: string;
  successful?:boolean
};
type bankInfoT = {
  phone?: string;
  email: string;
  swiftCode: string;
  whatsapp?: string;
  whatsapp1?: string;
  address?: string;
};
type notificationT = {
  title: string;
  description: string;
  viewed: boolean;
  amount?: number;
};
type appContextT = {
  user: userT | undefined;
  setUser: React.Dispatch<React.SetStateAction<userT | undefined>>;
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bankInfo: bankInfoT;
  setBankInfo: React.Dispatch<React.SetStateAction<bankInfoT>>;
  refereshUserInfo: boolean;
  setRefereshUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
};
