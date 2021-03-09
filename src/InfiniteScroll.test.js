import ScrollList from "./components/ScrollList";
import InfiniteScroll from "./InfiniteScroll";

describe("InfiniteScroll", () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn(function (callback, options) {
      ({
        observe: function () {},
        unobserve: function () {},
        disconnect: function () {},
      });
    });
  });

  afterEach(() => {
    window.IntersectionObserver.mockRestore();
  });
  describe("constructor({scrollList,options})", () => {
    const goodArgs = {
      scrollList: new ScrollList({
        $target: document.createElement("ul"),
        renderPerItem: 5,
        items: [],
        createElement: function () {},
      }),
      options: {},
    };
    it("잘못된 인자로 넘기면 에러를 던져야 합니다.", () => {
      const badArgs = [
        {},
        { ...goodArgs, scrollList: null },
        { ...goodArgs, scrollList: true },
        { ...goodArgs, scrollList: 1 },
        { ...goodArgs, scrollList: "badarg" },
        { ...goodArgs, scrollList: function () {} },
        { ...goodArgs, options: 1 },
        { ...goodArgs, options: true },
        { ...goodArgs, options: "badarg" },
        { ...goodArgs, options: function () {} },
      ];

      badArgs.forEach((arg) => {
        expect(function shouldThrow() {
          new InfiniteScroll(arg);
        }).toThrowError(InfiniteScroll.messages.invalidConstructorArg);
      });
    });

    it("올바른 인자로 넘기면 scrollList값이 속성으로 지정되어야 합니다.", () => {
      const infiniteScroll = new InfiniteScroll(goodArgs);
      expect(infiniteScroll.scrollList).toEqual(goodArgs.scrollList);
    });

    it("올바른 인자로 넘기면 IntersectionObserver 인스턴스가 속성으로 지정되어야 합니다. ", () => {
      const infiniteScroll = new InfiniteScroll(goodArgs);
      expect(infiniteScroll.io).toBeInstanceOf(IntersectionObserver);
    });
  });
});
