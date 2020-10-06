import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RiLoader4Line } from 'react-icons/ri';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

const FormBuilder = ({
  errors, formData, onSubmit, FormIcon, isSubmitting, disabled,
}) => {
  const {
    header, fields, button, showBrandIcon, navigationLinks,
  } = formData;
  const formRefs = {};
  const { validation: validationErrors, server: serverErrors } = errors;
  const [formState, setFormState] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState, e);
  };
  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  useEffect(() => {
    if (validationErrors?.size) {
      const [[firstErrorFieldName]] = validationErrors.entries();

      formRefs[firstErrorFieldName]?.current.focus();
    } else if (!serverErrors?.length) {
      const [firstFormField] = Object.values(formRefs);

      firstFormField?.current.focus();
    }
  }, [validationErrors, serverErrors]);

  return (
    <Form onSubmit={handleSubmit} className="col-11 col-md-6 col-lg-3 border p-4" noValidate>
      {
        showBrandIcon && (
          <Form.Group className="text-center text-primary">
            <FormIcon className="form-icon" />
          </Form.Group>
        )
      }
      {
        header && (
          <Form.Group className="text-center">
            <h3>{header}</h3>
          </Form.Group>
        )
      }
      {
        (!isSubmitting && serverErrors?.length > 0) && (
          <Form.Group>
            <Alert variant="danger">
              <ul className="m-0 p-0 pl-1">
                {
                  serverErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))
                }
              </ul>
            </Alert>
          </Form.Group>
        )
      }
      {
        fields.map((field) => {
          const {
            label, name, type,
          } = field;
          const hasErrors = validationErrors?.get(name)?.length;

          formRefs[name] = useRef();

          return (
            <Form.Group key={field.name}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={type}
                name={name}
                ref={formRefs[name]}
                isInvalid={hasErrors}
                onChange={handleChange}
                disabled={disabled}
              />
              {
                hasErrors && (
                  validationErrors.get(name).map((error) => (
                    <Form.Control.Feedback type="invalid" key={error} className="font-weight-bold">
                      {error}
                    </Form.Control.Feedback>
                  ))
                )
              }
            </Form.Group>
          );
        })
      }
      {
        button && (
          <Form.Group>
            <Button variant={button.variant} type="submit" disabled={isSubmitting || disabled}>
              {isSubmitting && (<RiLoader4Line className="icon-spin mr-2" />)}
              {button.text}
            </Button>
          </Form.Group>
        )
      }
      {
        Array.isArray(navigationLinks) && (
          <Form.Group className="mt-5">
            <ul className="p-0 navigation-links text-center">
              {
                navigationLinks.map((navigationLink) => (
                  <li
                    key={navigationLink.url}
                    className="d-inline-block"
                  >
                    <Link to={navigationLink.url}>
                      {navigationLink.text}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </Form.Group>
        )
      }
    </Form>
  );
};

FormBuilder.defaultProps = {
  onSubmit: () => {},
  FormIcon: null,
  disabled: false,
  errors: {},
};
FormBuilder.propTypes = {
  formData: PropTypes.instanceOf(Object).isRequired,
  onSubmit: PropTypes.func,
  FormIcon: PropTypes.func,
  errors: PropTypes.instanceOf(Object),
  isSubmitting: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default FormBuilder;
