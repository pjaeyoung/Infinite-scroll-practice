import InfiniteScroll from "./InfiniteScroll";

describe("InfiniteScroll", () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn(function (_callBack, options) {
      this.observe = function () {};
    });
  });

  afterEach(() => {
    window.IntersectionObserver.mockRestore();
  });
  describe("constructor({loadMore,options})", () => {
    it("올바른 인자를 넘겨야 합니다.", () => {
      const incorrectArgs = [
        {},
        { loadMore: null },
        { loadMore: 1 },
        { loadMore: true },
        { loadMore: "hello" },
        { loadMore: {} },
        { loadMore: function () {}, options: 1 },
        { loadMore: function () {}, options: "hello" },
        { loadMore: function () {}, options: true },
        { loadMore: function () {}, options: function () {} },
      ];
      incorrectArgs.forEach((arg) => {
        expect(function throwError() {
          new InfiniteScroll(arg);
        }).toThrowError(InfiniteScroll.messages.incorrectArgs);
      });
    });

    it("IntersectionObserver 인스턴스를 생성하여 속성으로 지정해야 합니다.", () => {
      const infiniteScroll = new InfiniteScroll({ loadMore: function () {} });
      expect(infiniteScroll.io).toBeInstanceOf(IntersectionObserver);
    });
  });

  describe("_createObserveCallback(loadMore)", () => {
    let infiniteScroll;
    const args = {
      loadMore: function () {},
    };
    let fakeLoadMore;

    beforeEach(() => {
      fakeLoadMore = jest.fn();
      infiniteScroll = new InfiniteScroll(args);
    });

    it("반환값은 함수입니다.", () => {
      const result = infiniteScroll._createObserveCallback(fakeLoadMore);
      expect(typeof result).toBe("function");
    });

    describe("반환 함수 observeCallback(entries,observer)", () => {
      let observeCallback;
      const fakeObserver = {};

      beforeEach(() => {
        observeCallback = infiniteScroll
          ._createObserveCallback(fakeLoadMore)
          .bind(infiniteScroll);
      });

      it("마지막 아이템을 가리키는 entries[0]가 감지되지 않은 상태면 loadMore를 실행하지 않습니다.", () => {
        const entries = [{ isIntersectioning: false }];
        observeCallback(entries, fakeObserver);
        expect(fakeLoadMore).not.toHaveBeenCalled();
      });

      it("마지막 아이템을 가리키는 entries[0]가 감지된 상태면 loadMore를 실행해야 합니다.", () => {
        const entries = [{ isIntersectioning: true, target: {} }];
        observeCallback(entries, fakeObserver);
        expect(fakeLoadMore).toHaveBeenCalled();
        expect(fakeLoadMore).toHaveBeenCalledWith(
          entries[0].target,
          infiniteScroll.updateObserveTarget
        );
      });
    });
  });

  describe("updateObserveTarget(target)", () => {
    it("io의 observe가 마지막 아이템을 인자로 넘겨야 합니다.", () => {
      const lastElement = {};
      const args = {
        loadMore: function (target, updateObserveTarget) {
          updateObserveTarget(lastElement);
        },
      };
      const infiniteScroll = new InfiniteScroll(args);
      jest.spyOn(infiniteScroll.io, "observe").mockImplementation(() => {});

      infiniteScroll.updateObserveTarget(lastElement);
      expect(infiniteScroll.io.observe).toHaveBeenCalled();
      expect(infiniteScroll.io.observe).toHaveBeenCalledWith(lastElement);
    });
  });
});
