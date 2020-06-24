<template>

  <el-tabs v-model="activeName" style="margin-top:15px;" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
      <keep-alive v-if="activeName=='first'">
          <dep-info/>
      </keep-alive>
      <keep-alive v-else-if="activeName=='second'">
          <emp-info/>
      </keep-alive>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import depInfo from './depInfo'
import empInfo from './empInfo'
export default {
  name: 'TreeMain',
  components: { depInfo,empInfo },
  data() {
    return {
      tabMapOptions: [
        { label: '部门信息', key: 'first' },
        { label: '人员信息', key: 'second' }
      ],
      activeName: 'first'
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

