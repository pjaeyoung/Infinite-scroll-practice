import ScrollList from "./components/ScrollList.js";

const items = new Array(21).fill().map((_, i) => `item ${i + 1}`);
const PER_ITEMS = 5;

function createElement(item) {
  const $li = document.createElement("li");
  $li.className = "scroll-item";
  $li.textContent = item;
  return $li;
}

function createObserverCallback(scrollList) {
  return (entries, observer) => {
    if (!entries[0].isIntersecting) return;
    observer.unobserve(entries[0].target);
    if (scrollList.isAllItemsRendered()) {
      observer.disconnect();
    } else {
      scrollList.render();
      observer.observe(scrollList.getLastRenderedItem());
    }
  };
}

function init() {
  const scrollList = new ScrollList({
    $target: document.querySelector("#scroll-list"),
    items,
    renderPerItem: PER_ITEMS,
    createElement,
  });

  const io = new IntersectionObserver(createObserverCallback(scrollList), {
    threshold: 0.8,
  });

  io.observe(scrollList.getLastRenderedItem());
}

init();
