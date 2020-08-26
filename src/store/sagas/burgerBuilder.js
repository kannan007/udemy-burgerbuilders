import Axios from "../../axios-orders";
import { put } from "redux-saga/effects";

import * as actions from "../actions";

export function* initIngredientsSaga(action) {
  try {
    const res = yield Axios.get(
      "https://udemy-burger-builder-2d725.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(res.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
