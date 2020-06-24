<template>
  <el-table
    :data="datas"
    height="250"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="depCode"
      label="部门编码"
      width="180"
    />
    <el-table-column
      prop="depName"
      label="部门名称"
      width="180"
    />
    <el-table-column
      prop="depLevel"
      label="部门级别"
      width="180"
    />
    <el-table-column
      prop="depCharge"
      label="部门负责人"
      width="180"
    />
    <el-table-column
      prop="depDirector"
      label="部门分管领导"
      width="180"
    />
  </el-table>
</template>

<script>
import { getDepList } from '@/api/dep'
export default {
  data() {
    return {
      datas: []
    }
  },
  created() {
    this.getDepList(this.$store.getters.currentNodeId)
  },
  methods: {
    getDepList(orgId) {
      getDepList({ orgId: orgId }).then(response => {
        this.datas = response.data.deps
        this.loading = false
      })
    }
  }
}
</script>

