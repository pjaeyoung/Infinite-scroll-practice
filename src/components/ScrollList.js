export default class ScrollList {
  constructor({ $target, items, renderPerItem, createElement }) {
    if (
      this.isInvalidConstructorArgs({
        $target,
        items,
        renderPerItem,
        createElement,
      })
    ) {
      throw new Error(ScrollList.messages.invalidConstructorArgs);
    }

    this.$target = $target;
    this.items = items;
    this.renderPerItem = renderPerItem;
    this.createElement = createElement;
    this.currentLastIndex = -1;

    this.render();
  }

  isInvalidConstructorArgs({ $target, items, renderPerItem, createElement }) {
    return (
      !($target instanceof HTMLElement) ||
      !Array.isArray(items) ||
      typeof renderPerItem !== "number" ||
      typeof createElement !== "function"
    );
  }

  isAllItemsRendered() {
    return this.currentLastIndex + 1 === this.items.length;
  }

  getLastRenderedItem() {
    return this.$target.children[this.currentLastIndex];
  }

  render() {
    const startIndex = this.currentLastIndex + 1;
    const endIndex = startIndex + this.renderPerItem;

    this.items.slice(startIndex, endIndex).forEach((anItem) => {
      this.$target.appendChild(this.createElement(anItem));
      this.currentLastIndex++;
    });
  }
}

ScrollList.messages = {
  invalidConstructorArgs: "잘못된 인자로 ScrollList 인스턴스를 생성했습니다.",
  notNumberArg: "인자 타입이 숫자가 아닙니다.",
  lastIndexOverItemsCount: "lastIndex 값이 items 개수보다 큽니다.",
};
