import React, { useEffect, useState } from 'react';
import { RiTwitterLine } from 'react-icons/ri';
import { connect, useDispatch } from 'react-redux';
import { signUpUser, clearServerErrors } from '@actions/user';
import { signUp as signUpOptions } from '@constants/validator-options';
import PropTypes from 'prop-types';
import FormBuilder from '@components/common/FormBuilder';
import SignUpFormData from '@constants/sign-up-form-data.json';
import validator from '@utils/validator';

const SignUp = ({
  isSubmitting, serverErrors,
}) => {
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState();
  const signUpRequest = (formState) => {
    const validatorErrors = validator(formState, signUpOptions);

    if (!validatorErrors.size) {
      dispatch(signUpUser(formState));
    }

    setValidationErrors(validatorErrors);
  };

  useEffect(() => () => dispatch(clearServerErrors()), []);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <FormBuilder
        formData={SignUpFormData}
        isSubmitting={isSubmitting}
        errors={{ server: serverErrors, validation: validationErrors }}
        FormIcon={RiTwitterLine}
        onSubmit={signUpRequest}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userReducer: { isSubmitting, isAuthenticated, errors } } = state;

  return {
    isSubmitting,
    isAuthenticated,
    serverErrors: errors,
  };
};
SignUp.defaultProps = {
  serverErrors: [],
};
SignUp.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  serverErrors: PropTypes.instanceOf(Array),
};

export default connect(mapStateToProps)(SignUp);
