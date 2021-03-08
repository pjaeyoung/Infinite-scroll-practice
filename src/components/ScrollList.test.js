import ScrollList from "./ScrollList";

describe("ScrollList", () => {
  describe("constructor({$target, items, renderPerItem, createElement})", () => {
    const goodArg = {
      $target: document.createElement("ul"),
      items: [],
      renderPerItem: 5,
      createElement: function () {},
    };
    it("잘못된 인자로 인스턴스를 생성하면 에러를 던집니다.", () => {
      const badArgs = [
        { ...goodArg, $target: null },
        { ...goodArg, $target: undefined },
        { ...goodArg, $target: 1 },
        { ...goodArg, $target: true },
        { ...goodArg, $target: function () {} },
        { ...goodArg, $target: {} },
        { ...goodArg, $target: [] },
        { ...goodArg, items: null },
        { ...goodArg, items: undefined },
        { ...goodArg, items: 1 },
        { ...goodArg, items: true },
        { ...goodArg, items: function () {} },
        { ...goodArg, items: {} },
        { ...goodArg, renderPerItem: null },
        { ...goodArg, renderPerItem: undefined },
        { ...goodArg, renderPerItem: true },
        { ...goodArg, renderPerItem: function () {} },
        { ...goodArg, renderPerItem: {} },
        { ...goodArg, renderPerItem: [] },
        { ...goodArg, createElement: null },
        { ...goodArg, createElement: undefined },
        { ...goodArg, createElement: 1 },
        { ...goodArg, createElement: true },
        { ...goodArg, createElement: {} },
        { ...goodArg, createElement: [] },
      ];

      badArgs.forEach((arg) => {
        expect(function shouldThrow() {
          new ScrollList(arg);
        }).toThrowError(ScrollList.messages.invalidArgs);
      });
    });

    it("각 인자는 인스턴스의 속성으로 지정되어야 합니다.", () => {
      const scrollList = new ScrollList(goodArg);
      Object.keys(goodArg).forEach((prop) => {
        expect(scrollList.hasOwnProperty(prop)).toBe(true);
      });
    });
  });
});
