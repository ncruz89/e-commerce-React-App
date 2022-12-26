// added reselect library for memoization
import { createSelector } from "reselect";
/*
  createSelectors needs two parameters - first: array of input selectors - second: function to return new output selectors
*/

// create category reducer by pulling off our categories from state
const selectCategoryReducer = (state) => state.categories;

// memoized selector set up for our categories reducer. To prevent re-rendering of categories selector when userReducer/cartReducer is updated but categoriesReducer is not updated.
// creating memoized selector for categories based off categoryReducer to prevent needless re-renders
// now selectCategories will only run output selector if categories has changed in selectCategoryReducer
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// business logic previously found in firebase.utils
// generating categoriesMap to be used based off of categoriesArray
// creating memoized selector based off of categoriesSlice that maps items from category to prevent needless re-renders
// now selectCategoriesMap will only run if selectCategories has changed
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
