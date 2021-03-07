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
}

InfiniteScroll.messages = {
  incorrectArgs: "올바른 인자로 인스턴스를 생성해야 합니다.",
};
