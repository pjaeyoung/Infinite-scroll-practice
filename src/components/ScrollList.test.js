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
        }).toThrowError(ScrollList.messages.invalidConstructorArgs);
      });
    });

    it("필요한 모든 인스턴스의 속성이 지정되어야 합니다.", () => {
      const allProps = ["currentLastIndex", ...Object.keys(goodArg)];
      const scrollList = new ScrollList(goodArg);
      allProps.forEach((prop) => {
        expect(scrollList.hasOwnProperty(prop)).toBe(true);
      });
    });
  });

  describe("methods", () => {
    const arg = {
      $target: document.createElement("ul"),
      items: [],
      renderPerItem: 5,
      createElement: function () {},
    };

    let scrollList;

    beforeEach(() => {
      scrollList = new ScrollList(arg);
    });
    describe("setState(lastIndex)", () => {
      it("lastIndex의 타입이 숫자가 아니면 에러를 던집니다.", () => {
        const notNumber = ["", null, undefined, {}, function () {}, []];
        notNumber.forEach((arg) => {
          expect(function shouldThrow() {
            scrollList.setState();
          }).toThrowError(ScrollList.messages.notNumberArg);
        });
      });

      it("인스턴스 속성 lastIndex값이 인자값으로 대체되어야 합니다.", () => {
        const expectedIndex = 2;
        scrollList.setState(expectedIndex);
        expect(scrollList.currentLastIndex).toBe(expectedIndex);
      });
    });
  });
});
