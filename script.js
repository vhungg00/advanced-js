import { useValidator } from "./components/useValidator.js";

const schemes = [
  {
    key: 'email',
    value: '',
    required: true,
    message: 'Email is required',
    validator: async (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
  },
  {
    key: 'password',
    value: '',
    required: true,
    message: 'Password is required',
  },
  {
    key: 'confirmPassword',
    value: '',
    required: true,
    message: 'Confirm Password is required',
    validator: async (value) => 
      value === schemes.find((s) => s.key === 'password').value || 
      'Passwords do not match',
  },
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (function () {
  const schema = useValidator();

  console.log(schema);

  const cars = ["BMW"];

  const root = $("#root");
  const input = $("#input");
  const button = $("#button");

  return {
    add(car) {
      cars.push(car);
    },
    edit(index) {},
    delete(index) {
      cars.splice(index, 1);
    },
    render() {
      const html = cars.map((car) => `<li>${car}</li>`).join("");
      root.innerHTML = html;
    },
    init() {
      button.onclick = () => {
        const value = input.value;
        if (!value) return;
        this.add(value);
        this.render();
      };

      this.render();
    },
  };
})();

app.init();
