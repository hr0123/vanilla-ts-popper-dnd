// 1. Drag할 요소 목록 베열을 가져와 -> 각 목록에 enableDragList를 실행
function enableDragSort(listClass: string) {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {
    enableDragList(list);
  });
}

type listType = {
  children: string;
};
// 2. Drag할 요소들의 목록 배열의 -> 각 요소들에 enableDragItem을 실행
function enableDragList(list: listType) {
  Array.prototype.map.call(list.children, (item) => {
    enableDragItem(item);
  });
}

type itemType = {
  setAttribute: (arg0: string, arg1: boolean) => void;
  ondrag: (item: itemType) => void;
  ondragend: (item: itemType) => void;
  target: {
    parentNode: string[];
    clientX: number;
    clientY: number;
    classList: {
      add: (arg: string) => void;
    };
    nextSibling: string;
  };
  swapItem: {
    parentNode: boolean;
  };
};
// 3. Drag할 각 요소의 draggable속성을 true로 설정, drag시 발생함수 및 drop시 발생함수 각각 할당
function enableDragItem(item: itemType) {
  item.setAttribute("draggable", true);
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
}

// 4. 현재 선택한 요소의 좌표를 받아와
function handleDrag(item: itemType) {
  const selectedItem = item.target;
  const list = selectedItem.parentNode;
  const x = selectedItem.clientX;
  const y = selectedItem.clientY;
  selectedItem.classList.add("drag-sort-active");
  let swapItem =
    document.elementFromPoint(x, y) === null
      ? selectedItem
      : document.elementFromPoint(x, y);
  if (list === swapItem?.parentNode) {
    swapItem =
      swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

//drag해오던 아이템을 drop했을때 발생(active상태 종료)
function handleDrop(item: itemType) {
  item.target.classList.remove("drag-sort-active");
}

(() => {
  enableDragSort("drag-sort-enable");
})();

// 1. Input 입력값에 슬래시 포함되면 => popper 나타나게(슬래시 미포함 시 => popper 사라지게)

// type Type = {
//   target: {
//     value: string;
//     id: string;
//   };
//   input: {
//     value: string;
//     placeholder: string;
//     style: {
//       fontSize: string;
//       fontWeight: string;
//     };
//   };
//   popperDisplay: {
//     style: {
//       display: string;
//     };
//   };
// };

// type onChangeInputType = (e: { target: { value: string } }) => void;

const input = <HTMLCanvasElement>(
  document.querySelector('input[class="input-variable"]')
);
const popperDisplay = <HTMLCanvasElement>(
  document.querySelector(".popper-wrapper-hidden")
);

input.addEventListener("input", onChangeInput);

function onChangeInput(e) {
  e.target.value.includes("/")
    ? (popperDisplay.style.display = "block")
    : (popperDisplay.style.display = "none");
}

// 2. Popper에서 선택한 항목에 따라 => input의 placeholder와 style 변화, popper 사라지게
const selectText = <HTMLCanvasElement>(
  document.querySelector('.popper-box[name="text"]')
);
const selectHeadingOne = <HTMLCanvasElement>(
  document.querySelector('.popper-box[name="headingOne"]')
);
const selectHeadingTwo = <HTMLCanvasElement>(
  document.querySelector('.popper-box[name="headingTwo"]')
);
const selectHeadingThree = <HTMLCanvasElement>(
  document.querySelector('.popper-box[name="headingThree"]')
);
const selectBulletedList = <HTMLCanvasElement>(
  document.querySelector('.popper-box[name="bulletedList"]')
);

selectText?.addEventListener("click", onClickMenu);
selectHeadingOne?.addEventListener("click", onClickMenu);
selectHeadingTwo?.addEventListener("click", onClickMenu);
selectHeadingThree?.addEventListener("click", onClickMenu);
selectBulletedList?.addEventListener("click", onClickMenu);

const bullet = <HTMLCanvasElement>document.querySelector(".input-bullet");

function onClickMenu(e) {
  const clickedMenuId = e.target.id;
  input.placeholder = clickedMenuId;
  clickedMenuId === "Heading 1"
    ? (input.style.fontSize = "32px")
    : clickedMenuId === "Heading 2"
    ? (input.style.fontSize = "28px")
    : clickedMenuId === "Heading 3"
    ? (input.style.fontSize = "22px")
    : (input.style.fontSize = "16px");
  clickedMenuId === "Heading 1"
    ? (input.style.fontWeight = "700")
    : clickedMenuId === "Heading 2"
    ? (input.style.fontWeight = "600")
    : clickedMenuId === "Heading 3"
    ? (input.style.fontWeight = "600")
    : (input.style.fontWeight = "400");
  clickedMenuId === "List"
    ? (bullet.style.display = "block")
    : (bullet.style.display = "none");
  popperDisplay.style.display = "none";
  input.value = "";
}
