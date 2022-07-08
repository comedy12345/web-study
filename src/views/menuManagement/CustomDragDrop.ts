interface IOption{
      el:string,
      dragstart?:IDragstart,
      dragover?:IDragstart,
      drop?:IDragstart
}
interface IDragDroptarget{
      firstIndex?:number,
      lastIndex?:number,
      dragEvent?:DragEvent
}
interface IDragstart{
      (target:IDragDroptarget):void
}

export default class CustomDragDrop{

      el: string;
      dragstart?:IDragstart;
      dragover?:IDragstart;
      drop?:IDragstart;

      constructor(option:IOption){
            this.el = option.el;
            this.dragstart = option.dragstart;
            this.dragover = option.dragover;
            this.drop = option.drop;
            this.init(this.el);
           
      }

      init(el:string){
          const dom:HTMLElement = document.querySelector(el)!;
          const fragment:DocumentFragment = this.createFragment(dom);
          this.addAttribute(fragment);
          dom.appendChild(fragment);

      }

      createFragment(dom:HTMLElement){
            const fragment:DocumentFragment =document.createDocumentFragment();
            let firstChild;
            while (firstChild=dom.firstChild) {
                  fragment.appendChild(firstChild);
            }
            return fragment;
      }

      addAttribute(fragment:DocumentFragment){
            [...fragment.children].map((item,index)=>{
                  item.setAttribute('draggable',"true");
                  item.setAttribute('draggable-key',index+'')
                  item.addEventListener('dragstart',this.dragstartHander.bind(this,item));
                  item.addEventListener('dragover',this.dragoverHander.bind(this,item));
                  item.addEventListener('drop',this.dropHander.bind(this,item));
            })
      }

      dragstartHander(...args:[Element,any]){
            const {index,dragEvent}=this.getDataTransfer(args,'set');
            this.dragstart&&this.dragstart({firstIndex:index,dragEvent});
      }

      dragoverHander(...args:[Element,any]){
            const {firstIndex,dragEvent}=this.getDataTransfer(args,'get');
            dragEvent.preventDefault();
            this.dragover&&this.dragover({firstIndex,dragEvent});
      }

      dropHander(...args:[Element,any]){
            const {index,firstIndex,dragEvent}=this.getDataTransfer(args,'get');
            this.drop&&this.drop({firstIndex,lastIndex:index,dragEvent});
      }

      getDataTransfer(args:[Element,any],type:string){
            const [currentDom,event] = args;
            const dragEvent:DragEvent = event;
            let index= [...currentDom.parentNode?.children!].findIndex(item=>item===currentDom);
            let  firstIndex=0;          
            if(type ==='set'){
                  dragEvent.dataTransfer?.setData('firstIndex',index.toString() );
            }else{
                  firstIndex = parseInt(dragEvent.dataTransfer?.getData('firstIndex')!);
            }
            return {
                  index,
                  firstIndex,
                  dragEvent
            }
      }

}




