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

const array = new Array(5, 2, 1, 3, 4, 5, 1, 5, 4, 3, 2, 1);

console.log(array);

const loop = (start, end, callback) => {
  if (start < end) {
    callback(start);
    return loop(start + 1, end, callback);
  }
};

loop(0, 5, (index) => {
  console.log(index);
});

const removeData = (data, index = 0, result = []) => {
  if (index === data.length) {
    return result;
  }
  if (!result.includes(data[index])) {
    result.push(data[index]);
  }

  return removeData(data, index + 1, result);
};

console.log(removeData(array));

function User(firstName, lastName, avatar) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.avatar = avatar;
  this.getName = () => {
    return `${this.firstName} ${this.lastName}`;
  };
}

function Author(firstName, lastName, avatar, age) {
  User.call(this, firstName, lastName, avatar);
  this.age = age;
}

const info = new Author("Ta", "Hung", "ava", "age");

console.log(info.getName());

/* 
  Closure la mot ham co the ghi nho noi no duoc tao
  va co the truy cap duoc bien ben ngoai pham vi cua no
*/
function createCounter() {
  let counter = 0;

  function increase() {
    return ++counter;
  }

  return increase;
}

const counter1 = createCounter();

console.log(counter1());
console.log(counter1());
console.log(counter1());

function createLogger(namespace) {
  return function log(message) {
    console.log(`[${namespace}] ${message}`);
  };
}

const logInfo = createLogger("info");
const logWarn = createLogger("warn");
logInfo("This is a log message");
logWarn("This is a warning message");

function createStorage(key) {
  const store = JSON.parse(localStorage.getItem(key)) ?? {};

  const save = () => {
    localStorage.setItem(key, JSON.stringify(store));
  };
  const storage = {
    get(key) {
      return store[key];
    },
    set(key, value) {
      if (typeof value === "object" && !Array.isArray(value)) {
        Object.assign(store, value);
      } else {
        store[key] = value;
      }
      save();
    },
    remove(key) {
      delete store[key];
      save();
    },
  };

  return storage;
}

const profileSetting = createStorage("profile_setting");

// profileSetting.get("fullname");

// profileSetting.set("fullname", "Ta Hung");
// profileSetting.set("age", "24");
profileSetting.set(null, { name: "Alice", age: 30 });

Array.prototype.map2 = function (callback) {
  const output = [];

  for (var i in this) {
    if (this.hasOwnProperty(i)) {
      const result = callback(this[i], i, this);
      output.push(result);
    }
  }

  return output;
};

const courses = [
  {
    courses: "Javascript",
    coin: 30,
  },
  {
    courses: "PHP",
    coin: 50,
  },
  {
    courses: "Ruby",
    coin: 70,
  },
];

courses.length = 100;

var html = courses.map2(function (v, i, arr) {
  console.log(v, i, arr);

  return `<li>${v}</li>`;
});

var html2 = courses.map((v, i, arr) => {
  console.log(v, i, arr);
});

const map = new Map();

console.log(map);

Array.prototype.forEach2 = function (callback) {
  for (var i in this) {
    if (this.hasOwnProperty(i)) {
      callback(this[i], i, this);
    }
  }
};

courses.forEach2(function (v, i, arr) {
  console.log(v, i, arr);
});

Array.prototype.filter2 = function (callback) {
  const output = [];

  for (var i in this) {
    if (this.hasOwnProperty(i)) {
      const result = callback(this[i], i, this);
      if (result) {
        output.push(this[i]);
      }
    }
  }

  return output;
};

Array.prototype.some2 = function (callback) {
  for (var i in this) {
    if (this.hasOwnProperty(i)) {
      if (callback(this[i], i, this)) return true;
    }
  }
  return false;
};

Array.prototype.every2 = function (callback) {
  for (var i in this) {
    if (this.hasOwnProperty(i)) {
      if (!callback(this[i], i, this)) return false;
    }
  }
  return true;
};

const newCourses = courses.every2((item, i, arr) => item.coin >= 40);

console.log({ newCourses });
