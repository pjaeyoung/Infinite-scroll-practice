import ScrollList from "./components/ScrollList.js";
import InfiniteScroll from "./InfiniteScroll.js";

const items = new Array(21).fill().map((_, i) => `item ${i + 1}`);
const PER_ITEMS = 5;

function createElement(item) {
  const $li = document.createElement("li");
  $li.className = "scroll-item";
  $li.textContent = item;
  return $li;
}

new InfiniteScroll({
  options: { thresold: 0.5 },
  scrollList: new ScrollList({
    $target: document.querySelector("#scroll-list"),
    items,
    renderPerItem: PER_ITEMS,
    createElement,
  }),
});
