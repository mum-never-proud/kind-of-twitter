import React, { useEffect, useState } from 'react';
import { RiTwitterLine } from 'react-icons/ri';
import { connect, useDispatch } from 'react-redux';
import { signIn as signInOptions } from '@constants/validator-options';
import { signInUser, clearServerErrors } from '@actions/user';
import PropTypes from 'prop-types';
import FormBuilder from '@components/common/FormBuilder';
import SignInFormData from '@constants/sign-in-form-data.json';
import validator from '@utils/validator';

const SignIn = ({
  isSubmitting, serverErrors,
}) => {
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState();
  const signInRequest = (formState) => {
    const validatorErrors = validator(formState, signInOptions);

    if (!validatorErrors.size) {
      dispatch(signInUser(formState));
    }

    setValidationErrors(validatorErrors);
  };

  useEffect(() => () => dispatch(clearServerErrors()), []);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <FormBuilder
        formData={SignInFormData}
        isSubmitting={isSubmitting}
        FormIcon={RiTwitterLine}
        errors={{ server: serverErrors, validation: validationErrors }}
        onSubmit={signInRequest}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userReducer: { isSubmitting, errors } } = state;

  return {
    isSubmitting,
    serverErrors: errors,
  };
};
SignIn.defaultProps = {
  serverErrors: [],
};
SignIn.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  serverErrors: PropTypes.instanceOf(Array),
};

export default connect(mapStateToProps)(SignIn);
