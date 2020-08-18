import * as actionTypes from "./actionTypes";
import Axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    Axios.get(
      "https://udemy-burger-builder-2d725.firebaseio.com/ingredients.json"
    )
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed);
      });
  };
};
