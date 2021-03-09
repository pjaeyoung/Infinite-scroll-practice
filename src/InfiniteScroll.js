import ScrollList from "./components/ScrollList.js";

export default class InfiniteScroll {
  constructor({ scrollList, options }) {
    if (
      !(scrollList instanceof ScrollList) ||
      (options && typeof options !== "object")
    ) {
      throw new Error(InfiniteScroll.messages.invalidConstructorArg);
    }

    this.scrollList = scrollList;
    this.io = new IntersectionObserver(this._callback.bind(this), options);
    this.io.observe(this.scrollList.getLastRenderedItem());
  }

  _callback(entries, observer) {
    if (!entries[0].isIntersecting) return;
    observer.unobserve(entries[0].target);
    if (this.scrollList.isAllItemsRendered()) {
      observer.disconnect();
    } else {
      this.scrollList.render();
      observer.observe(this.scrollList.getLastRenderedItem());
    }
  }
}

InfiniteScroll.messages = {
  invalidConstructorArg: "잘못된 인자로 인스턴스를 생성했습니다.",
};
