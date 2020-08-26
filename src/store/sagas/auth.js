import axios from "axios";
import { put, delay } from "redux-saga/effects";

import * as actions from "../actions";

export function* logoutSaga(action) {
  yield localStorage.clear();
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  console.log("Inside");
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpHRBmwOlznCMtlHJFIzgGr7QlyOpG5ow";

  if (!action.isSignup)
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpHRBmwOlznCMtlHJFIzgGr7QlyOpG5ow";

  try {
    const res = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    localStorage.setItem("token", res.data.idToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeOut(res.data.expiresIn));
  } catch (err) {
    console.error(err);
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");

  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationTime = yield new Date(
      localStorage.getItem("expirationDate")
    );

    if (expirationTime <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeOut(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
