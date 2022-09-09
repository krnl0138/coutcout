type TLoginAction = {
  type: "field" | "login" | "success" | "failed";
  inputField?: keyof typeof initialStateLogin["data"];
  value?: string;
  errors?: string | string[];
};

export const initialStateLogin = {
  errors: [] as string[],
  isLoggedIn: false,
  isLoading: false,
  data: {
    email: "",
    password: "",
  },
};

export const loginReducer = (
  state: typeof initialStateLogin,
  action: TLoginAction
): typeof initialStateLogin => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    }
    case "success": {
      return {
        ...initialStateLogin,
        isLoggedIn: true,
      };
    }
    case "failed": {
      if (!action.errors) return state;
      return {
        ...state,
        isLoading: false,
        errors:
          typeof action.errors === "string" ? [action.errors] : action.errors,
        data: { ...initialStateLogin.data },
      };
    }
    case "field": {
      if (!action.inputField) return state;
      return {
        ...state,
        data: { ...state.data, [action.inputField]: action.value },
      };
    }
    default:
      return state;
  }
};
