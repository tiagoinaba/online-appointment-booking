declare global {
  var id: string;
}

export type DateType = {
  justDate: Date | null;
  dateTime: Date | null;
};

export type Inputs = {
  name: string;
  email: string;
};

export type AdminInfo = {
  id: string;
  requirePayment: boolean;
  name: string;
  route: string;
};
