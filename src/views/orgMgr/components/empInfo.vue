<template>
  <div>
    <div class="filter-container">
      <el-input v-model="search.badgeS" placeholder="工号" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.empNameS" placeholder="姓名" class="filter-item" style="width: 200px;" />
      <el-button  size="medium" type="primary"  @click="onSearch">查询</el-button>
      <el-button  size="medium" type="primary"  @click="onReset">重置</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">新增</el-button>
    </div>
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
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增或编辑人员信息-->
    <add-or-edit-emp v-if="addOrUpdateVisible" ref="addOrEditEmp" @refreshDataList="getEmpList"/>
  </div>
</template>
<script>
import { getEmpList,deleteEmp } from '@/api/emp'
import AddOrEditEmp from './addOrEditEmp'
export default {
  props: ['getOrgId', 'getOrgName'],
  components: { AddOrEditEmp },
  data() {
    return {
      search: {
        badgeS: '',
        empNameS: ''
      },
      datas: [],
      listLoading: true,
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getEmpList()
  },
  watch: {
    getOrgId(val) {
      this.getEmpList()
    }
  },
  methods: {
    getEmpList() {
      this.listLoading = true
      this.search.orgId = this.getOrgId
      getEmpList(this.search).then(response => {
        this.datas = response.data.emps
        this.listLoading = false
      })
    },
    onSearch() {
      this.getEmpList()
    },
    onReset() {
      this.search = {
        badgeS: '',
        empNameS: ''
      }
    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      const formObj = Object()
      formObj.orgId = this.getOrgId
      formObj.orgName = this.getOrgName
      this.$nextTick(() => {
        this.$refs['addOrEditEmp'].init(formObj, 'create')
      })
    },
    onShowUpdate(row) {
      const formObj = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrEditEmp'].init(formObj, 'update')
      })
    },
    onDeleteOne(row, index) {
      deleteEmp({ id: row.id,badge: row.badge}).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.datas.splice(index, 1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-container{
    margin-bottom: 10px;
  }

</style>

