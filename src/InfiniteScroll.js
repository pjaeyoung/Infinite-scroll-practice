export default class InfiniteScroll {
  constructor({ loadMore, options }) {
    if (
      typeof loadMore !== "function" ||
      (options !== undefined && typeof options !== "object")
    ) {
      throw new Error(InfiniteScroll.messages.incorrectArgs);
    }

    this.io = new IntersectionObserver(loadMore, options);
  }

  updateObserveTarget(observer) {}

  _createObserveCallback(loadMore) {
    return function (entries, observer) {
      if (entries[0].isIntersectioning) {
        loadMore(entries[0].target, this.updateObserveTarget);
      }
    };
  }
}

InfiniteScroll.messages = {
  incorrectArgs: "올바른 인자로 인스턴스를 생성해야 합니다.",
};
