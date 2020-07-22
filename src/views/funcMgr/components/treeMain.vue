<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>功能列表</span>
    </div>
    <func-info ref="dep" v-if="activeName=='func'" :getParentId="getParentId"/>
  </el-card>
</template>

<script>
import funcInfo from './funcInfo'

export default {
  name: 'TreeMain',
  props: ['getParentId'],
  components: { funcInfo },
  data() {
    return {
      activeName: 'func'
    }
  },
  watch: {
    activeName(val) {
      this.activeName = val
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

