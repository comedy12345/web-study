import  { createRouter,RouteRecordRaw,createWebHashHistory } from "vue-router";

export const routes:RouteRecordRaw[] =[
      {
            path:'',
            component:() => import('@/views/layout/index.vue'),
            redirect:'dashboard',
            children:[
                  {
                        name:'首页',
                        path:'/dashboard',
                        component:() => import('@/views/home/index.vue')   
                  },
                  {
                        name:'测试一',
                        path:'/test1',
                        redirect:'/test1/sonMenu',
                        component:() => import('@/views/test/index.vue'),
                        children:[
                              { 
                                    name:'子菜单',
                                    path:'/test1/sonMenu',
                                    redirect:'/test1/sonMenu/three',
                                    component:() => import('@/views/test/test1-1/index.vue'),
                                    children:[
                                          {
                                                name:'子菜单3层',
                                                path:'/test1/sonMenu/three',
                                                component:() => import('@/views/test/test1-1/three/index.vue'),  
                                          }
                                    ]
                              },
                              { 
                                    name:'子菜单二',
                                    path:'/test1/sonMenu2',
                                    component:() => import('@/views/test/test1-2/index.vue') 
                              }
                        ],
                  },
                  {
                        name:'测试二',
                        path:'/test2',
                        component:() => import('@/views/test2/index.vue')
                  },
                  {
                        name:'菜单管理',
                        path:'/menuMannagement',
                        component:() => import('@/views/menuManagement/index.vue')
                  }
            ]
      },
      
];
export const router = createRouter({
      history: createWebHashHistory(),
      routes, 
})