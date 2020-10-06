const validator = (formData, validatorOptions) => {
  const map = new Map();

  Object.keys(validatorOptions).forEach((option) => {
    for (let i = 0; i < validatorOptions[option].length; i += 1) {
      const [fx, msg] = validatorOptions[option][i];

      if (typeof fx === 'function' && !fx(formData[option])) {
        const errors = map.get(option) || [];

        errors.push(msg);
        map.set(option, errors);

        break;
      }
    }
  });

  return map;
};

export default validator;
