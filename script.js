const schemes = [
  {
    key: "email",
    value: "",
    required: true,
    message: "Email is required",
    validator: async (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email format",
  },
  {
    key: "password",
    value: "",
    required: true,
    message: "Password is required",
  },
  {
    key: "confirmPassword",
    value: "",
    required: true,
    message: "Confirm Password is required",
    validator: async (value) =>
      value === schemes.find((s) => s.key === "password").value ||
      "Passwords do not match",
  },
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (function () {
  const cars = ["BMW"];
  let editIndex = null;

  const root = $("#root");
  const input = $("#input");
  const button = $("#button");

  return {
    add(car) {
      cars.push(car);
    },
    update(index, newValue) {
      if (index >= 0 && index < cars.length) {
        cars[index] = newValue;
      }
    },
    delete(index) {
      cars.splice(index, 1);
    },
    render() {
      const html = cars
        .map(
          (car, index) => `
          <li>
            ${car}
            <span class="delete" data-action="delete" data-index=${index}>&times</span>
            <div class="edit"  data-action="edit" data-index=${index}>edit</div>
          </li>`
        )
        .join("");
      root.innerHTML = html;
    },
    handleAction(e) {
      const action = e.target.getAttribute("data-action");
      const indices = e.target.getAttribute("data-index");

      if (action === "delete") {
        this.delete(indices);
        this.render();
      } else if (action === "edit") {
        // const newValue = prompt("Enter the new value:", cars[indices]);
        if (cars[indices] !== null && cars[indices].trim() !== "") {
          input.value = cars[indices].trim();
          input.focus();
          editIndex = indices;
        }
      }
    },
    init() {
      const handleAddOrUpdate = () => {
        const value = input.value;
        if (!value) return;
        if (editIndex !== null) {
          this.update(editIndex, value);
          editIndex = null;
        } else {
          this.add(value);
        }
        input.value = "";
        input.focus();
        this.render();
      };

      button.onclick = handleAddOrUpdate;

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          handleAddOrUpdate();
        }
      });
      root.onclick = this.handleAction.bind(this);

      this.render();
    },
  };
})();

app.init();
