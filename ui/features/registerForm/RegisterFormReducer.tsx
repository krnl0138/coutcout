type TRegisterAction = {
  type: "register" | "success" | "failed" | "field";
  field?: keyof typeof initialStateRegister["data"];
  value?: string;
  errors?: string | string[];
};

export const initialStateRegister = {
  errors: [] as string[],
  isRegistered: false,
  isLoading: false,
  data: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

export const registerReducer = (
  state: typeof initialStateRegister,
  action: TRegisterAction
): typeof initialStateRegister => {
  switch (action.type) {
    case "register": {
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    }
    case "success": {
      return {
        ...state,
        isLoading: false,
        isRegistered: true,
        data: { ...initialStateRegister.data },
      };
    }
    case "failed": {
      if (!action.errors) return state;
      return {
        ...state,
        isLoading: false,
        errors:
          typeof action.errors === "string" ? [action.errors] : action.errors,
        data: { ...initialStateRegister.data },
      };
    }
    case "field": {
      if (!action.field) return state;
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };
    }
    default:
      return state;
  }
};
