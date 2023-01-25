export type CheckoutFormType = {
  firstName: string;
  lastName: string;
  address: string;
  cityId: number;
  phone: string;
  description: string;
  code: string;
  verificationId: string;
};

export type ApiError = {
  data: {
    error: string;
    statusCode: number;
  };
  status: number;
};
