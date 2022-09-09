import { userReducer, initialState, removeUserSubcategory } from "../userSlice";

describe("test userSlice slice", () => {
  test("should return the initial state", () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });
  test("should remove subcategory from an existing list", () => {
    const subcategories = {
      byId: { "0": { spendings: 300 }, "1": { spendings: 100 } },
      allIds: [0, 1],
    };
    const result = {
      byId: { "1": { spendings: 100 } },
      allIds: [1],
    };
    const previousState = { ...initialState, subcategories: subcategories };
    const resultState = { ...initialState, subcategories: result };
    expect(
      userReducer(previousState, removeUserSubcategory({ id: "0" }))
    ).toEqual(resultState);
  });
  test("should remove last subcategory", () => {
    const subcategories = {
      byId: { "0": { spendings: 300 } },
      allIds: [0],
    };
    const result = {
      byId: {},
      allIds: [],
    };
    const previousState = { ...initialState, subcategories: subcategories };
    const resultState = { ...initialState, subcategories: result };
    expect(
      userReducer(previousState, removeUserSubcategory({ id: "0" }))
    ).toEqual(resultState);
  });
});
