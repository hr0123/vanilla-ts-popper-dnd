// DragAndDrop
function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {
    enableDragList(list);
  });
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, (item) => {
    enableDragItem(item);
  });
}

function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
}

function handleDrag(item) {
  const selectedItem = item.target,
    list = selectedItem.parentNode,
    x = event.clientX,
    y = event.clientY;
  selectedItem.classList.add("drag-sort-active");
  let swapItem =
    document.elementFromPoint(x, y) === null
      ? selectedItem
      : document.elementFromPoint(x, y);
  if (list === swapItem.parentNode) {
    swapItem =
      swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

//drag해오던 아이템을 drop했을때 발생
function handleDrop(item) {
  item.target.classList.remove("drag-sort-active");
}

(() => {
  enableDragSort("drag-sort-enable");
})();

// ---

// 1. Input 입력값에 슬래시 포함되면 => popper 나타나게(슬래시 미포함 시 => popper 사라지게)
const input = document.querySelector('input[class="input-variable"]');
const popperDisplay = document.querySelector(".popper-wrapper-hidden");

input?.addEventListener("input", handlePopper);

function handlePopper(e) {
  e.target.value.includes("/")
    ? (popperDisplay.style.display = "block")
    : (popperDisplay.style.display = "none");
}

// 2. Popper에서 선택한 항목에 따라 => input의 placeholder와 style 변화, popper 사라지게
const selectText = document.querySelector('.popper-box[name="text"]');
const selectHeadingOne = document.querySelector(
  '.popper-box[name="headingOne"]',
);
const selectHeadingTwo = document.querySelector(
  '.popper-box[name="headingTwo"]',
);
const selectHeadingThree = document.querySelector(
  '.popper-box[name="headingThree"]',
);
const selectBulletedList = document.querySelector(
  '.popper-box[name="bulletedList"]',
);

selectText.addEventListener("click", onClickMenu);
selectHeadingOne.addEventListener("click", onClickMenu);
selectHeadingTwo.addEventListener("click", onClickMenu);
selectHeadingThree.addEventListener("click", onClickMenu);
selectBulletedList.addEventListener("click", onClickMenu);

const bullet = document.querySelector(".input-bullet");

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
