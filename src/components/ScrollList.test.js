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

  describe("render()", () => {
    let arg;

    function createItems(count) {
      return new Array(count).fill().map((_, i) => `item${i}`);
    }

    beforeEach(() => {
      arg = {
        $target: document.createElement("ul"),
        renderPerItem: 5,
        createElement: function (item) {
          const $li = document.createElement("li");
          $li.textContent = item;
          return $li;
        },
      };
    });

    it("currentLastIndex가 렌더링한 아이템의 마지막 인덱스 값으로 갱신되어야 합니다.", () => {
      arg.items = createItems(2);
      const scrollList = new ScrollList(arg);
      expect(scrollList.currentLastIndex).toBe(1);
    });

    it("items개수가 renderPerItem보다 작은 경우 , createElement와 $target의 appendChild 함수가 남은 item 갯수 만큼 호출되어야 합니다.", () => {
      arg.items = createItems(4);

      const scrollList = new ScrollList(arg);
      jest.spyOn(scrollList, "createElement");
      jest.spyOn(scrollList.$target, "appendChild");

      scrollList.render();

      const itemsRemainingCount =
        scrollList.items.length - scrollList.currentLastIndex - 1;

      expect(scrollList.createElement).toHaveBeenCalledTimes(
        itemsRemainingCount
      );
      expect(scrollList.$target.appendChild).toHaveBeenCalledTimes(
        itemsRemainingCount
      );
    });

    it("items개수가 renderPerItem보다 크거나 같은 경우 , createElement 와 $target의 appendChild 함수가 renderPerItem 횟수 만큼 호출되어야 합니다.", () => {
      arg.items = createItems(20);

      const scrollList = new ScrollList(arg);
      jest.spyOn(scrollList, "createElement");
      jest.spyOn(scrollList.$target, "appendChild");

      scrollList.render();

      expect(scrollList.createElement).toHaveBeenCalledTimes(
        scrollList.renderPerItem
      );
      expect(scrollList.$target.appendChild).toHaveBeenCalledTimes(
        scrollList.renderPerItem
      );
    });
  });

  describe("getLastRenderedItem()", () => {
    const arg = {
      $target: document.createElement("ul"),
      items: ["item1", "item2"],
      renderPerItem: 5,
      createElement: function (item) {
        const $li = document.createElement("li");
        $li.textContent = item;
        return $li;
      },
    };

    const scrollList = new ScrollList(arg);

    it("반환값이 HTMLElement의 인스턴스여야 합니다.", () => {
      expect(scrollList.getLastRenderedItem()).toBeInstanceOf(HTMLElement);
    });

    it("렌더링된 아이템들 중 마지막 아이템을 반환해야 합니다.", () => {
      expect(scrollList.getLastRenderedItem().textContent).toBe("item2");
    });
  });

  describe("isAllItemsRendered()", () => {
    const arg = {
      $target: document.createElement("ul"),
      items: ["item1", "item2"],
      renderPerItem: 5,
      createElement: function (item) {
        const $li = document.createElement("li");
        $li.textContent = item;
        return $li;
      },
    };
    it("모든 items들이 렌더링되지 않으면 false값을 반환해야 합니다.", () => {
      arg.renderPerItem = 1;
      const scrollList = new ScrollList(arg);
      expect(scrollList.isAllItemsRendered()).toBe(false);
    });
    it("모든 items들이 렌더링되면 true값을 반환해야 합니다.", () => {
      arg.renderPerItem = 2;
      const scrollList = new ScrollList(arg);
      expect(scrollList.isAllItemsRendered()).toBe(true);
    });
  });
});
