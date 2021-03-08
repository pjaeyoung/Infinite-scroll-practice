function callback(entries, observer) {
  const isIntersecting = entries[0].isIntersecting;
  const currentItem = entries[0].target;
  const startIndex = parseInt(currentItem.dataset.index);

  if (isIntersecting) {
    observer.unobserve(currentItem);
    const items = data
      .slice(startIndex + 1, startIndex + 1 + PER_ITEMS)
      .map((item, index) => {
        const $li = document.createElement("li");
        $li.className = "scroll-item";
        $li.textContent = item;
        $li.dataset.index = startIndex + 1 + index;
        $scrollList.appendChild($li);
        return $li;
      });

    const lastIndex = parseInt(items[items.length - 1].dataset.index);
    if (lastIndex + 1 === MAX_ITEMS) {
      observer.disconnect();
    } else {
      observer.observe(items[items.length - 1]);
    }
  }
}

const data = new Array(21).fill().map((_, i) => `item ${i + 1}`);

const $scrollList = document.querySelector("#scroll-list");

const MAX_ITEMS = data.length;
const PER_ITEMS = 5;

const items = data.slice(0, PER_ITEMS).map((item, index) => {
  const $li = document.createElement("li");
  $li.className = "scroll-item";
  $li.textContent = item;
  $li.dataset.index = index;
  $scrollList.appendChild($li);
  return $li;
});

const options = {
  thresold: 0.5,
};

const io = new IntersectionObserver(callback, options);

io.observe(items[items.length - 1]);
