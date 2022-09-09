type TUpdateUserAction = {
  type: "submit" | "success" | "failed" | "field";
  field?: keyof typeof initialStateUpdateUser["data"];
  value?: string;
  errors?: string | string[];
};

export const initialStateUpdateUser = {
  errors: [] as string[],
  isUpdated: false,
  isLoading: false,
  data: {
    username: "",
    email: "",
    newPassword: "",
    password: "",
  },
};

export const UpdateUserReducer = (
  state: typeof initialStateUpdateUser,
  action: TUpdateUserAction
): typeof initialStateUpdateUser => {
  switch (action.type) {
    case "submit": {
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
        isUpdated: true,
        data: { ...initialStateUpdateUser.data },
      };
    }
    case "failed": {
      if (!action.errors) return state;
      return {
        ...state,
        isLoading: false,
        errors:
          typeof action.errors === "string" ? [action.errors] : action.errors,
        data: { ...initialStateUpdateUser.data },
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
