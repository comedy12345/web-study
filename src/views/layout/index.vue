<script lang="tsx">
import { defineComponent, ref, provide } from "vue";
import { RouterView, useRoute } from "vue-router";
import { Layout, LayoutContent, LayoutHeader, LayoutSider, Menu } from 'ant-design-vue';
import MyMenuItem from '@/components/MenuItem/index.vue';
import { routes } from '@/route';
import LogoPng from '@/assets/logo.png';
import MyHeader from "@/components/MyHeader/index.vue";
import { Key } from "ant-design-vue/lib/vc-table/interface";
import { useRouteHistoryStore } from "@/store/routeHistory";


export default defineComponent({
      setup() {
            const collapsed = ref<boolean>(false);
            const route = useRoute();
            provide('collapsed', collapsed);
            const { $state: { selectdOpenKeys }, editSelectdOpenKeys } = useRouteHistoryStore();

            return () => (
                  <Layout hasSider={true}>
                        <Layout hasSider={true}>
                              <LayoutSider collapsible={true} trigger={null} collapsed={collapsed.value}>
                                    <div class="sider-header">
                                          <img src={LogoPng} />
                                          {collapsed.value || <span>VUE3+TSX</span>}
                                    </div>
                                    <Menu mode="inline" theme='dark'
                                          selectedKeys={[route.path]} openKeys={selectdOpenKeys}
                                          onOpenChange={(openKeys: Key[]) => editSelectdOpenKeys(openKeys)}>
                                          <MyMenuItem routesMenu={routes[0].children!} />
                                    </Menu>
                              </LayoutSider>
                              <LayoutContent class="layout-content">
                                    <LayoutHeader class='layout-header' >
                                          <MyHeader />
                                    </LayoutHeader>
                                    <div class="layout-content-main">
                                          <RouterView></RouterView>
                                    </div>
                              </LayoutContent>
                        </Layout>
                  </Layout>
            )
      }
})
</script>

<style lang="scss" scoped>
.ant-layout {
      height: 100vh !important;

      .sider-header {
            text-align: center;
            height: 60px;
            line-height: 60px;
            color: white;
            font-weight: 700;

            img {
                  width: 18px;
                  height: 18px;
            }
      }

      .layout-content {
            .layout-header {
                  height: 80px;
                  background-color: rgb(255, 255, 255);
                  padding: 0 20px;
                  display: flex;
                  flex-direction: column;
                  line-height: normal;

            }

            .layout-content-main {
                  padding: 40px;
                  background-color: rgba(255, 255, 255, 0.637);
            }

      }
}
</style>