import { router } from '@/route';
import { useRouteHistoryStore } from "@/store/routeHistory";
import { Key } from "ant-design-vue/lib/vc-table/interface";

router.beforeEach((to, from) => {
      const { $state:{ routeHistorys ,selectdOpenKeys},editSelectdOpenKeys }=useRouteHistoryStore();
      
      getPath("","",selectdOpenKeys,editSelectdOpenKeys,false,to.path);

      if(!routeHistorys.find((item: { path: string; })=>item.path===to.path)){
            routeHistorys.push({id:String(new Date().getTime()),name:String(to.name) ,path:to.path})
      }
      return true
})
/**
 * 
 * @param path 父级路径
 * @param currentPath 当前路径
 * @param selectdOpenKeys 缓存中的路径数据
 * @param editSelectdOpenKeys 操作缓存中数据的方法
 * @param flag 用于判断是不是第一次
 * @param toPath 全路径
 * @returns 
 */
const getPath = (
            path:string,
            currentPath:string,
            selectdOpenKeys:Key[],
            editSelectdOpenKeys:Function,
            flag:boolean,
            toPath:string
      ) => {

      if(!flag){
            flag = true;

            // 将路径分割成数组
            const pathSplit = toPath.split('/').filter(item=>item);

            // 取出最后一位 --最后一位就是不带父级路径的当前路径
            const afterPath = pathSplit[pathSplit.length-1];

            // 通过最后一位截取出，不带当前路径的父级路径
            const beforePath = toPath.split('/'+afterPath)[0];
            
            const newToPathSplit = beforePath.split('/');

            const newAfterPath = "/"+ newToPathSplit[newToPathSplit.length-1];
            
            getPath(beforePath,newAfterPath,selectdOpenKeys,editSelectdOpenKeys,flag,toPath);
            return;
      }
      if(!path) return;
     
      if(!selectdOpenKeys.find(item=>item === path) && flag){
            editSelectdOpenKeys([path],'add');
      }
      if(!currentPath)return;
      
      // 继续往前截取
      const pathSplit = path.split(currentPath);
    

      if(pathSplit.length){
            getPath(pathSplit[0],pathSplit[1],selectdOpenKeys,editSelectdOpenKeys,flag,toPath);
      }
}