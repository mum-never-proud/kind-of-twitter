import React, { useState } from 'react';
import { RiTwitterLine } from 'react-icons/ri';
import { BsCheckCircle } from 'react-icons/bs';
import { restorePassword } from '@services/user';
import { forgotPassword as forgotPasswordOptions } from '@constants/validator-options';
import Toast from 'react-bootstrap/Toast';
import FormBuilder from '@components/common/FormBuilder';
import ForgotPasswordFormData from '@constants/forgot-password-form-data.json';
import validator from '@utils/validator';
import './style.css';

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [validationErrors, setValidationErrors] = useState();
  const [serverErrors, setServerErrors] = useState();
  const resetPasswordRequest = (formState) => {
    const validatorErrors = validator(formState, forgotPasswordOptions);

    if (!validatorErrors.size) {
      setIsSubmitting(true);
      restorePassword(formState)
        .then(() => setShowToast(true))
        .catch(({ message }) => setServerErrors([message]))
        .finally(() => setIsSubmitting(false));
    }

    setValidationErrors(validatorErrors);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <FormBuilder
        isSubmitting={isSubmitting}
        formData={ForgotPasswordFormData}
        FormIcon={RiTwitterLine}
        onSubmit={resetPasswordRequest}
        errors={{ server: serverErrors, validation: validationErrors }}
        disabled={showToast}
      />
      {
        showToast && (
          <Toast show={showToast} className="reset-success-toast">
            <Toast.Header closeButton={false}>
              <BsCheckCircle className="text-success m-auto" size={32} />
            </Toast.Header>
            <Toast.Body>Woohoo, we have sent the Instructions to your Email!</Toast.Body>
          </Toast>
        )
      }
    </div>
  );
};

export default ForgotPassword;
