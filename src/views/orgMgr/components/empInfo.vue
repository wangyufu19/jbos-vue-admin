<template>
  <el-table
    :data="datas"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="badge"
      label="工号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="empName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="姓别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="orgName"
      label="所属机构"
      width="180">
    </el-table-column>
    <el-table-column
      prop="depName"
      label="所属部门"
      width="180">
    </el-table-column>
    <el-table-column
      prop="headShip"
      label="职务"
      width="180">
    </el-table-column>
    <el-table-column
      prop="empStatus"
      label="员工状态"
      width="180">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      datas: []
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
