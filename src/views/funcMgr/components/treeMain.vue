<template>
  <el-card>
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane  label="功能信息" name="func">
      <func-info ref="dep" v-if="activeName=='func'" :getParentId="getParentId"/>
    </el-tab-pane>
  </el-tabs>
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

