<script lang="tsx">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
export default defineComponent({
  setup() {
    return () => <div class="app"><RouterView></RouterView></div>
  }
})
</script>
<style lang="scss">
</style>
