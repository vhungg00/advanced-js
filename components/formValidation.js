import { useValidator } from "./useValidator.js";

const schemes = [
  {
    key: "username",
    value: "",
    required: true,
    message: "Username is required",
    focused: true,
    validator: async (value) =>
      value.length >= 3 ? null : "Username must be at least 3 characters",
  },
  {
    key: "email",
    value: "",
    required: true,
    message: "Email is required",
    focused: false,
    validator: async (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
  },
  {
    key: "password",
    value: "",
    required: true,
    message: "Password is required",
    focused: true,
    validator: async (value) =>
      value.length >= 6 ? null : "Password must be at least 6 characters",
  },
];

const { isValid, getErrors, setError, validate, resetErrors } = useValidator(
  schemes,
  true
);

export async function handleBlur(key, form, schemes) {
  // Find the corresponding scheme
  const scheme = schemes.find((s) => s.key === key);
  if (!scheme) return;

  // Update value and mark as focused
  scheme.value = form[key].value;
  scheme.focused = true;

  // Validate just this field
  const message = await scheme.validator?.(scheme.value);
  const errorElement = document.getElementById(`${key}-error`);

  if (scheme.required && !scheme.value && scheme.value !== 0) {
    errorElement.textContent = scheme.message;
  } else if (message) {
    errorElement.textContent = message;
  } else {
    errorElement.textContent = "";
    resetErrors();
  }
}

// Initialize form and add event listeners
const form = document.getElementById("registration-form");
const submitButton = document.getElementById("submit-button");

schemes.forEach((scheme) => {
  const input = document.getElementById(scheme.key);
  input.addEventListener("blur", () => handleBlur(scheme.key, form, schemes));
});

submitButton.addEventListener("click", async () => {
  // Update schemes' values
  schemes.forEach((scheme) => {
    scheme.value = form[scheme.key].value;
  });

  if (await validate()) {
    alert("Registration successful!");
    form.reset();
    resetErrors();
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  } else {
    const errors = getErrors();
    for (const key in errors) {
      document.getElementById(`${key}-error`).textContent = errors[key];
    }
  }
});
