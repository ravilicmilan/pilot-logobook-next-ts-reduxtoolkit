export type LoginSuccessResponse = {
  success: true;
};

export type LoginErrorResponse = {
  success: false;
  message: string;
};

// A union of all possible return objects
export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
