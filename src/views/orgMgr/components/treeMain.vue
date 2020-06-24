<template>

  <el-tabs v-model="activeName" style="margin-top:15px;" type="card" @tab-click="handleClick">
    <el-tab-pane  label="部门信息" name="dep">
      <dep-info ref="dep" v-if="activeName=='dep'"/>
    </el-tab-pane>
    <el-tab-pane label="人员信息" name="emp">
      <emp-info v-if="activeName=='emp'"/>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import depInfo from './depInfo'
import empInfo from './empInfo'
export default {
  name: 'TreeMain',
  components: { depInfo, empInfo },
  data() {
    return {
      activeName: 'dep'
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

