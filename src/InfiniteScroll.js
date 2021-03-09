import ScrollList from "./components/ScrollList";

export default class InfiniteScroll {
  constructor({ scrollList, options }) {
    if (
      !(scrollList instanceof ScrollList) ||
      (options && typeof options !== "object")
    ) {
      throw new Error(InfiniteScroll.messages.invalidConstructorArg);
    }
  }
}

InfiniteScroll.messages = {
  invalidConstructorArg: "잘못된 인자로 인스턴스를 생성했습니다.",
};
