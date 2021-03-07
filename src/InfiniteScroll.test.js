import InfiniteScroll from "./InfiniteScroll";

describe("InfiniteScroll", () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn(function (_callBack, options) {});
  });

  afterEach(() => {
    window.IntersectionObserver.mockRestore();
  });
  describe("constructor({loadMore,options})", () => {
    it("올바른 인자를 넘겨야 합니다.", () => {
      const incorrectArgs = [
        {},
        { loadMore: null },
        { loadMore: 1 },
        { loadMore: true },
        { loadMore: "hello" },
        { loadMore: {} },
        { loadMore: function () {}, options: 1 },
        { loadMore: function () {}, options: "hello" },
        { loadMore: function () {}, options: true },
        { loadMore: function () {}, options: function () {} },
      ];
      incorrectArgs.forEach((arg) => {
        expect(function throwError() {
          new InfiniteScroll(arg);
        }).toThrowError(InfiniteScroll.messages.incorrectArgs);
      });
    });

    it("IntersectionObserver 인스턴스를 생성하여 속성으로 지정해야 합니다.", () => {
      const infiniteScroll = new InfiniteScroll({ loadMore: function () {} });
      expect(infiniteScroll.io).toBeInstanceOf(IntersectionObserver);
    });
  });
});
