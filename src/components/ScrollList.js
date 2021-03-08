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
    this.currentLastIndex = lastIndex;
    this.render();
  }

  render() {}
}

ScrollList.messages = {
  invalidConstructorArgs: "잘못된 인자로 ScrollList 인스턴스를 생성했습니다.",
  notNumberArg: "인자 타입이 숫자가 아닙니다.",
};
