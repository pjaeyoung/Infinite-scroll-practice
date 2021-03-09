import ScrollList from "./components/ScrollList";
import InfiniteScroll from "./InfiniteScroll";

describe("InfiniteScroll", () => {
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
  });
});
