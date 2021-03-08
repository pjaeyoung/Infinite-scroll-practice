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

  setState(lastIndex) {
    if (typeof lastIndex !== "number") {
      throw new Error(ScrollList.messages.notNumberArg);
    }

    if (lastIndex + 1 > this.items.length) {
      throw new Error(ScrollList.messages.lastIndexOverItemsCount);
    }
    this.currentLastIndex = lastIndex;
    this.render();
  }

  render() {
    this.items
      .slice(
        this.currentLastIndex + 1,
        this.currentLastIndex + 1 + this.renderPerItem
      )
      .forEach((anItem) => {
        this.$target.appendChild(this.createElement(anItem));
      });
  }
}

ScrollList.messages = {
  invalidConstructorArgs: "잘못된 인자로 ScrollList 인스턴스를 생성했습니다.",
  notNumberArg: "인자 타입이 숫자가 아닙니다.",
  lastIndexOverItemsCount: "lastIndex 값이 items 개수보다 큽니다.",
};
