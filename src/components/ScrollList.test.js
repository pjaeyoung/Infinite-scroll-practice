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
      items: ["item1", "item2"],
      renderPerItem: 5,
      createElement: function (item) {
        return document.createElement("li");
      },
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

      it("lastIndex + 1 이 items 개수보다 크면 에러를 던집니다.", () => {
        expect(function shouldThrow() {
          scrollList.setState(3);
        }).toThrowError(ScrollList.messages.lastIndexOverItemsCount);
      });

      it("인스턴스 속성 lastIndex값이 인자값으로 대체되어야 합니다.", () => {
        const expectedIndex = 1;
        scrollList.setState(expectedIndex);
        expect(scrollList.currentLastIndex).toBe(expectedIndex);
      });

      it("render 함수가 호출되어야 합니다.", () => {
        jest.spyOn(scrollList, "render");
        scrollList.setState(1);
        expect(scrollList.render).toHaveBeenCalled();
      });
    });

    describe("render()", () => {
      beforeEach(() => {
        jest.spyOn(scrollList.$target, "appendChild");
      });

      afterEach(() => {
        scrollList.$target.appendChild.mockRestore();
      });

      it("items개수가 renderPerItem보다 크거나 같은 경우 , createElement 와 $target의 appendChild 함수가 renderPerItem 횟수 만큼 호출되어야 합니다.", () => {
        scrollList.items = ["1", "2", "3", "4", "5", "6"];
        jest.spyOn(scrollList, "createElement");
        scrollList.render();
        expect(scrollList.createElement).toHaveBeenCalledTimes(
          scrollList.renderPerItem
        );
        expect(scrollList.$target.appendChild).toHaveBeenCalledTimes(
          scrollList.renderPerItem
        );
      });

      it("items개수가 renderPerItem보다 작은 경우 , createElement와 $target의 appendChild 함수가 item 갯수 만큼 호출되어야 합니다.", () => {
        scrollList.items = ["1"];
        jest.spyOn(scrollList, "createElement");
        scrollList.render();
        expect(scrollList.createElement).toHaveBeenCalledTimes(
          scrollList.items.length
        );
        expect(scrollList.$target.appendChild).toHaveBeenCalledTimes(
          scrollList.items.length
        );
      });
    });
  });
});
