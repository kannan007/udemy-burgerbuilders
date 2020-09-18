import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import styles from "./Auth.module.css";
import * as actions from "../../store/actions";

import { updateObject } from "../../shared/utility";

const Auth = (props) => {
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
  // componentDidMount() {
  //   if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
  //     this.props.onSetAuthRedirectPath();
  //   }
  // }

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const [isSignUp, setIsSignup] = useState(true);

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your PWD",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) return true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  };

  const swithAuthModeHandler = () => {
    // this.setState({ isSignUp: !this.state.isSignUp });
    // this.setState((prevState) => {
    //   return { isSignUp: !prevState.isSignUp };
    // });
    setIsSignup(!isSignUp);
  };

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });

    setAuthForm(updatedControls);
  };

  const formElementsArray = [];

  for (let key in authForm) {
    formElementsArray.push({ id: key, config: authForm[key] });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      tocuhed={formElement.config.touched}
      shouldValidate={formElement.config.validation}
      changed={(event) => inputChangeHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authReidrect = null;
  if (props.isAuthenticated) {
    authReidrect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={styles.Auth}>
      {authReidrect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success"> Submit</Button>
      </form>
      <Button clicked={swithAuthModeHandler} btnType="Danger">
        Switch to {isSignUp ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, mode) =>
      dispatch(actions.auth(email, password, mode)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
