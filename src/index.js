// import App from "./App.ts";
// new App(document.querySelector("#app"));

// const input = document.querySelector("input");
// const log = document.getElementById("inputValue");

// input.addEventListener("input", updateValue);

// function updateValue(e) {
//   log.textContent = e.target.value;
// }

// 1. input 입력값에 슬래시 포함되면 => popper 나타나게 / 슬래시 미포함 시 => popper 안보이게
const input = document.querySelector('input[class="input-various"]');
// const checkValue = document.getElementById("check");

input.addEventListener("input", checkSlash);

function checkSlash(e) {
  // checkValue.textContent = e.target.value;
  if (e.target.value.includes("/") === true) {
    alert("slash");
  } else {
    alert("no slash");
  }
}

// 2. popper에서 선택한 항목에 따라 => input의 placeholder와 style 변화
