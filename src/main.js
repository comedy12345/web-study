import { createApp } from 'vue';
// import Antd from 'ant-design-vue';
import App from './App.vue';
import { router } from '@/route/index';
import { createPinia } from 'pinia';
import 'ant-design-vue/dist/antd.css';
// 引入注册svg脚本
import svgIcon from "@/components/SvgIcon/index.vue";
import 'virtual:svg-icons-register';
import '@/interceptor';
const app = createApp(App);

app.use(router);
// app.use(Antd);
app.use(createPinia());
app.component('svg-icon', svgIcon);
app.mount('#app');
