export default class ScrollList {
  constructor({ $target, items, renderPerItem, createElement }) {
    if (this.isInValidArgs({ $target, items, renderPerItem, createElement })) {
      throw new Error(ScrollList.messages.invalidArgs);
    }

    this.$target = $target;
    this.items = items;
    this.renderPerItem = renderPerItem;
    this.createElement = createElement;
    this.currentLastIndex = -1;
  }

  isInValidArgs({ $target, items, renderPerItem, createElement }) {
    return (
      !($target instanceof HTMLElement) ||
      !Array.isArray(items) ||
      typeof renderPerItem !== "number" ||
      typeof createElement !== "function"
    );
  }
}

ScrollList.messages = {
  invalidArgs: "잘못된 인자로 ScrollList 인스턴스를 생성했습니다.",
};
