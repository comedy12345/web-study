<script lang="tsx">
import { defineComponent } from "vue";

import MyBreadcrumb from "@/components/MyBreadcrumb/index.vue";
import MyRouteTag from "@/components/MyRouteTag/index.vue";
export default defineComponent({
      setup() {

            return () => (
                  <div class="my-header">
                        <div class='router-history'>
                              <MyBreadcrumb />
                              <MyRouteTag />
                        </div>
                  </div>
            )
      }
})
</script>
