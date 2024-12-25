import { createStore } from "https://cdn.skypack.dev/redux";

// function createStore(reducer) {
//   let state = reducer(undefined, {});
//   const subscribers = [];

//   return {
//     getState() {
//       return state;
//     },
//     dispatch(action) {
//       state = reducer(state, action);
//       subscribers.forEach((subscriber) => subscriber());
//     },
//     subscribe(subscriber) {
//       subscribers.push(subscriber);
//     },
//   };
// }

const $ = document.querySelector.bind(document);

function reducer(state = 0, action) {
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;
    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
}

function actionDeposit(payload) {
  return { type: "DEPOSIT", payload };
}

function actionWithdraw(payload) {
  return { type: "WITHDRAW", payload };
}

$("#deposit").onclick = function () {
  store.dispatch(actionDeposit(10));
};
$("#withdraw").onclick = function () {
  store.dispatch(actionWithdraw(10));
};

const store = createStore(reducer);

console.log({ store });

render();

store.subscribe(() => {
  render();
});

function render() {
  const output = $("#output");
  output.textContent = store.getState();
}

// const app = (() => {
//   const cars = ["BMW"];
//   const root = $("#root");
//   const input = $("#input");
//   const button = $("#button");

//   return {
//     add(car) {
//       return cars.push(car);
//     },
//     delete(index) {
//       cars.splice(index, 1);
//     },
//     render() {
//       const html = cars
//         .map(
//           (car, index) => `
//         <li>
//             ${car}
//             <span class='delete' data-index='${index}'>&times</span>
//         </li>
//         `
//         )
//         .join("");
//       root.innerHTML = html;
//     },
//     // Delegate Pattern
//     handleDelete(event) {
//       const deleteBtn = event.target.closest(".delete");
//       if (!deleteBtn) return;
//       const index = deleteBtn.dataset.index;
//       this.delete(index);
//       this.render();
//     },
//     init() {
//       button.onclick = () => {
//         const car = input.value;
//         if (!car) return;
//         this.add(car);
//         this.render();
//         input.value = null;
//         input.focus();
//       };

//       root.onclick = this.handleDelete.bind(this);
//       this.render();
//     },
//   };
// })();

// app.init();

const app = (() => {
  const cars = ["BMW"];
  const root = $("#root");
  const input = $("#input");
  const button = $("#button");

  let editIndex = null;

  return {
    handleAction(car) {
      cars.push(car);
    },
    handleDelete(index) {
      cars.splice(index, 1);
    },
    handleUpdate(index, value) {
      cars[index] = value;
    },
    resetForm() {
      input.value = "";
      input.focus();
      this.render();
      editIndex = null;
    },
    handleActionDeleteOrUpdate(event) {
      const targetElement = event.target.closest(".delete, .update");

      if (!targetElement) return;

      const indices = targetElement.dataset.index;

      if (targetElement.classList.contains("delete")) {
        this.handleDelete(indices);
        this.render();
      }

      if (targetElement.classList.contains("update")) {
        editIndex = indices;
        input.value = cars[indices].trim();
        input.focus();
        this.updateButtonText();
      }
    },
    render() {
      const html = cars
        .map(
          (car, index) => `
            <li key="${index}">
              ${car}
              <span class="delete" data-index="${index}">&times</span>
              <button class="update" data-index=${index}>update</button>
            </li>`
        )
        .join("");

      root.innerHTML = html;
    },
    updateButtonText() {
      button.innerText = editIndex === null ? "Add New Car" : "Update Car";
    },

    init() {
      button.onclick = () => {
        const value = input.value;

        if (!value) return;

        if (editIndex !== null) {
          this.handleUpdate(editIndex, value);
          editIndex = null;
        } else {
          this.handleAction(input.value);
        }
        this.updateButtonText()
        this.render();
        this.resetForm();
      };

      this.updateButtonText();

      root.onclick = this.handleActionDeleteOrUpdate.bind(this);
      this.render();
    },
  };
})();

app.init();

const teacher = {
  firstName: "Minh",
  lastName: "Thu",
  isOnline: false,
  goOnline() {
    this.isOnline = true;
    console.log(`${this.firstName} ${this.lastName} is now online.`);
  },
  goOffline() {
    this.isOnline = false;
    console.log(`${this.firstName} ${this.lastName} is now offline.`);
  },
};

const me = {
  firstName: "Ta",
  lastName: "Hung",
  isOnline: false,
};

console.log("Teacher: ", teacher.isOnline);
teacher.goOnline();
console.log("Teacher: ", teacher.isOnline);

console.log("--------------------------------");

console.log("Student: ", me.isOnline);
teacher.goOnline.apply(me);
console.log("Student: ", me.isOnline);

// extent

class Animal {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
  }
}

class Parrot extends Animal {
  constructor(name, weight) {
    super(name, weight);
  }
  speak() {
    console.log(this, "this");
    console.log(`Name: ${this.name}, Weight: ${this.weight}kg`);
  }
}

const parrot = new Parrot("Parrot", 1.5);

console.log(parrot);

function changeValue(y) {
  y = { name: "hoa" };
}

let x = { name: "hung" };

changeValue(x);

console.log(x);
