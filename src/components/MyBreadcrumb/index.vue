<script lang="tsx">
import { computed, defineComponent, inject, ref, Ref } from "vue";
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useLayout } from "@/hooks/useLayout";
export default defineComponent({
      setup() {
            const { route, routerLinkHander, uuidv4 } = useLayout();
            const collapsed = inject<Ref<boolean>>('collapsed', ref(false));
            const matched = computed(() => route.matched.filter(item => item.path !== ""));
            const pullIn = computed(() => {
                  return !collapsed?.value
                        ? <MenuFoldOutlined onClick={() => collapsed.value = true} />
                        : <MenuUnfoldOutlined onClick={() => collapsed.value = false} />
            })
            const breadcrumb = () => (
                  matched.value.map((item) => <BreadcrumbItem onClick={routerLinkHander(item.path)} key={uuidv4()}>{item.name}</BreadcrumbItem>)
            );
            return () => (
                  <div class="my-breadcrumb">
                        <div>
                              {pullIn.value}
                        </div>
                        <div class="breadcrumb-container">
                              <Breadcrumb>
                                    {breadcrumb}
                              </Breadcrumb>
                        </div>
                  </div>
            )
      }
})
</script>
<style lang="scss" scoped>
.my-breadcrumb {
      height: 50px;
      display: flex;
      align-items: center;


      .breadcrumb-container {
            margin-left: 20px;

            :deep(.ant-breadcrumb) {
                  .ant-breadcrumb-link {
                        cursor: pointer;
                  }
            }
      }
}
</style>