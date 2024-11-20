export function useValidator(schemes = [], checkIsFocus) {
  const schemesRef = [...schemes]; // Make a copy to track changes
  const errors = {};

  const validate = async () => {
    const errs = { ...errors };
    const promises = schemes.map(async (scheme, index) => {
      const currentScheme = schemesRef[index];

      scheme.focused = currentScheme.focused;

      if (
        scheme.value === currentScheme.value &&
        (!checkIsFocus || !scheme.focused)
      ) {
        return;
      }

      scheme.focused = true;

      if (scheme.required && !scheme.value && scheme.value !== 0) {
        errs[scheme.key] = scheme.message;
        return;
      }

      const message = await scheme.validator?.(scheme.value);
      if (!message) {
        delete errs[scheme.key];
      } else {
        errs[scheme.key] = message;
      }
    });
    setError(errs);
    await Promise.all(promises);
    Object.assign(errors, errs); // Update the global errors object
    Object.assign(schemesRef, schemes); // Update the schemesRef

    return !Object.keys(errors).length;
  };

  const isValid = async () => {
    const errs = {};
    const promises = schemes.map(async (scheme, index) => {
      scheme.focused = true;
      schemesRef[index].focused = true;

      if (scheme.required && !scheme.value && scheme.value !== 0) {
        errs[scheme.key] = scheme.message;
        return;
      }

      const message = await scheme.validator?.(scheme.value);
      if (message) {
        errs[scheme.key] = message;
      }
    });

    setError(errs);
    await Promise.all(promises);
    Object.assign(errors, errs); // Update the global errors object
    console.log(errors);
    return !Object.keys(errors).length;
  };

  const getTouched = () =>
    schemesRef.length > 0 && schemesRef.some((scheme) => scheme.focused);

  const setError = (errs) => {
    for (const key in errors) {
      if (!(key in errs)) {
        delete errors[key];
      }
    }
    for (const key in errs) {
      errors[key] = errs[key];
    }
    return { ...errors };
  };


  return {
    validate,
    isValid,
    getErrors: () => errors,
    setError,
    getTouched,
    resetErrors: () => {
      for (const key in errors) {
        delete errors[key];
      }
    },
  };
}
