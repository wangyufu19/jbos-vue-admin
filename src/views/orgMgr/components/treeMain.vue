<template>
  <el-card>
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane  label="部门信息" name="dep">
      <dep-info ref="dep" v-if="activeName=='dep'" :getOrgId="getOrgId" :getOrgName="getOrgName"/>
    </el-tab-pane>
    <el-tab-pane label="人员信息" name="emp">
      <emp-info v-if="activeName=='emp'" :getOrgId="getOrgId" :getOrgName="getOrgName"/>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
import depInfo from './depInfo'
import empInfo from './empInfo'
export default {
  name: 'TreeMain',
  props: ['getOrgId', 'getOrgName'],
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

