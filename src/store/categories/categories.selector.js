import { createSelector } from "reselect";

//memoized selector set up for our categories reducer. To prevent re-rendering of categories selector when userReducer is updated but categoriesReducer is not updated.

// pulling off our categories from state
const selectCategoryReducer = (state) => state.categories;

// creating memoized selector for categories based off categoryReducer
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// creating memoized selector based off of categoriesSlice that maps items from category
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
