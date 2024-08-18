type userT = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePic: string;
  balance: number;
  iban: string;
  IdCard: string;
  cardNumber?: string;
  expiration?: string;
  cvc?: string;
};
type appContextT = {
  user: userT | undefined;
  setUser: React.Dispatch<React.SetStateAction<userT | undefined>>;
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
