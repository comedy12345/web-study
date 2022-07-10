
interface IOption {
      el: string,
      dragstart?: IDragstart,
      dragover?: IDragstart,
      drop?: IDragstart,
      delayed?: number
}
interface IDragDroptarget {
      firstIndex?: number,
      lastIndex?: number,
      dragEvent?: DragEvent,

}
interface IDragstart {
      (target: IDragDroptarget, complete?: Function): void,

}

interface Icalculation {
      first: number,
      last: number,
      otherMove: number
}
export default class CustomDragDrop {
      private el: string;
      private dragstart?: IDragstart;
      private dragover?: IDragstart;
      private drop?: IDragstart;
      private dom?: HTMLElement;
      private delayed?: number;
      // private startMove?: number;


      constructor(option: IOption) {
            this.el = option.el;
            this.dragstart = option.dragstart;
            this.dragover = option.dragover;
            this.drop = option.drop;
            this.delayed = option.delayed;
            if (!this.delayed) {
                  this.delayed = 100;
            }
            // this.startMove = 0;
            const dom: HTMLElement = document.querySelector(this.el)!;
            this.init(dom);
            this.dom = dom;
      }

      private init(dom: HTMLElement) {
            const fragment: DocumentFragment = this.createFragment(dom);
            this.addAttribute(fragment);
            dom.appendChild(fragment);
      }

      private createFragment(dom: HTMLElement) {
            const fragment: DocumentFragment = document.createDocumentFragment();
            let firstChild;
            while (firstChild = dom.firstChild) {
                  fragment.appendChild(firstChild);
            }
            return fragment;
      }

      private addAttribute(fragment: DocumentFragment) {
            [...fragment.children].map((item, index) => {
                  item.setAttribute('draggable', "true");
                  item.setAttribute('draggable-key', index + '')
                  item.addEventListener('dragstart', this.dragstartHander.bind(this, item));
                  item.addEventListener('dragover', this.dragoverHander.bind(this, item));
                  item.addEventListener('drop', this.dropHander.bind(this, item));
            })
      }

      private dragstartHander(...args: [Element, any]) {
            const { index, dragEvent } = this.getDataTransfer(args, 'set');
            this.dragstart && this.dragstart({ firstIndex: index, dragEvent });
      }

      private dragoverHander(...args: [Element, any]) {
            const { firstIndex, dragEvent } = this.getDataTransfer(args, 'get');
            dragEvent.preventDefault();
            this.dragover && this.dragover({ firstIndex, dragEvent });
      }

      private async dropHander(...args: [Element, any]) {
            const { index, firstIndex, dragEvent } = this.getDataTransfer(args, 'get');
            const moveDomRes = await this.moveDom(firstIndex, index).catch(res => res);
            if (moveDomRes === 'success') {
                  this.drop && this.drop({ firstIndex, lastIndex: index, dragEvent });
            }

      }



      private getDataTransfer(args: [Element, any], type: string) {
            const [currentDom, event] = args;
            const dragEvent: DragEvent = event;
            let index = [...currentDom.parentNode?.children!].findIndex(item => item === currentDom);
            let firstIndex = 0;
            if (type === 'set') {
                  dragEvent.dataTransfer?.setData('firstIndex', index.toString());
            } else {
                  firstIndex = parseInt(dragEvent.dataTransfer?.getData('firstIndex')!);
            }
            return {
                  index,
                  firstIndex,
                  dragEvent
            }
      }
      // 开始移动
      private moveDom(firstIndex: number, lastIndex: number) {
            return new Promise((resolve, reject) => {
                  try {
                        const calculation = this.calculation(this.dom!, firstIndex, lastIndex);
                        const newChildren = [...this.dom?.children!];
                        let firstDom: any = newChildren[firstIndex]!;
                        let lastDom: any = newChildren[lastIndex];
                        // 从后往前提
                        if (firstIndex > lastIndex) {
                              for (let index = firstIndex; index > lastIndex; index--) {
                                    const element: any = newChildren[index];
                                    element.style.transition = `transform ${this.delayed! / 1000}s`;
                                    element.style.transform = `translateY(${calculation.otherMove}px)`;
                                    if (firstIndex === index) {
                                          lastDom.style.transform = `translateY(${calculation.last}px)`;
                                          firstDom.style.transform = `translateY(${calculation.first + calculation.otherMove}px)`;
                                    }
                              }
                              // 从前往后提
                        } else {
                              for (let index = firstIndex; index <= lastIndex; index++) {
                                    const element: any = newChildren[index];
                                    element.style.transition = `transform ${this.delayed! / 1000}s`;
                                    element.style.transform = `translateY(${calculation.otherMove}px)`;
                                    if (lastIndex === index) {
                                          firstDom.style.transform = `translateY(${calculation.first}px)`;
                                          lastDom.style.transform = `translateY(${calculation.last + calculation.otherMove}px)`;
                                    }
                              }
                        }

                        setTimeout(() => {
                              // newChildren[firstIndex] = lastDom;
                              // newChildren[lastIndex] = firstDom;
                              // 改变真实dom元素位置（怀疑有bug）
                              this.dom?.replaceChild(firstDom, lastDom);
                              this.dom?.insertBefore(lastDom, this.dom.children[firstIndex])

                              newChildren.forEach((item => {
                                    (item as any).style.transition = 'none';
                                    (item as any).style.transform = 'translateY(0px)';
                              }))
                              resolve("success");
                        }, this.delayed);


                  } catch (error) {
                        reject("error")
                  }
            })

      }
      // 计算每个元素需要移动的距离(怀疑有bug)
      private calculation(dom: Element, firstIndex: number, lastIndex: number) {
            return [...dom?.children!]
                  .map(item => item.clientHeight)
                  .reduce((previousValue: Icalculation, currentValue: number, currentIndex: number, array: number[]): Icalculation => {
                        currentIndex <= firstIndex && (previousValue.first += currentValue);
                        currentIndex <= lastIndex && (previousValue.last += currentValue);
                        // 判断是向前移动还是向后移动
                        if (array.length - 1 === currentIndex) {
                              previousValue.first = previousValue.last - previousValue.first;
                              previousValue.last = 0 - previousValue.first;
                              const firstClientHeight = array[firstIndex];
                              const lastClientHeight = array[lastIndex];
                              // 从后往前提
                              if (firstIndex > lastIndex) {
                                    previousValue.otherMove = firstClientHeight - lastClientHeight;
                                    // 从前往后提
                              } else {
                                    previousValue.otherMove = lastClientHeight - firstClientHeight;
                              }
                        }
                        return previousValue;
                  }, { first: 0, last: 0, otherMove: 0 });
      }
}





