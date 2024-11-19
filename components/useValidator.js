export function useValidator(schemes, checkIsFocus) {
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
      )
        return;

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

    await Promise.all(promises);
    Object.assign(errors, errs); // Update the global errors object

    return !Object.keys(errors).length;
  };

  const getTouched = () =>
    schemesRef.length > 0 && schemesRef.some((scheme) => scheme.focused);

  return {
    validate,
    isValid,
    getErrors: () => errors,
    getTouched,
    resetErrors: () => {
      for (const key in errors) {
        delete errors[key];
      }
    },
  };
}
