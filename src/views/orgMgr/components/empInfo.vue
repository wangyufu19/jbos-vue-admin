<template>
  <el-table
    :data="datas"
    v-loading="listLoading"
    border
    fit
    highlight-current-row
    style="width: 100%"
  >
    <el-table-column
      prop="badge"
      label="工号"
      width="100"
    />
    <el-table-column
      prop="empName"
      label="姓名"
      width="100"
    />
    <el-table-column
      prop="orgName"
      label="所属机构"
      width="100"
    />
    <el-table-column
      prop="depName"
      label="所属部门"
      width="100"
    />
    <el-table-column
      prop="headShip"
      label="职务"
      width="100"
    />
    <el-table-column
      prop="empStatus"
      label="员工状态"
    />
    <el-table-column label="操作" align="center" width="180">
      <template slot-scope="{row,$index}">
        <el-button type="primary" size="mini" @click="handleUpdate(row)"> 编辑</el-button>
        <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)"> 删除 </el-button>
      </template>
    </el-table-column>
  </el-table>

</template>
<script>
import { getEmpList } from '@/api/emp'
export default {
  data() {
    return {
      datas: [],
      listLoading: true
    }
  },
  created() {
    this.getEmpList(this.$store.getters.currentNodeId)
  },
  methods: {
    getEmpList(orgId) {
      this.listLoading = true
      getEmpList({ orgId: orgId }).then(response => {
        this.datas = response.data.emps
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
