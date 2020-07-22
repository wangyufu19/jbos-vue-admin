<template>
  <div>
    <div class="filter-container">
      <el-input v-model="search.depCodeS" placeholder="部门编码" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.depNameS" placeholder="部门名称" class="filter-item" style="width: 200px;" />
      <el-button  size="medium" type="primary"  @click="onSearch">查询</el-button>
      <el-button  size="medium" type="primary"  @click="onReset">重置</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="depCode"
        label="部门编码"
        width="100"
      />
      <el-table-column
        prop="depName"
        label="部门名称"
        width="100"
      />
      <el-table-column
        prop="parentDepName"
        label="上级部门"
        width="100"
      />
      <el-table-column
        prop="depLevel"
        label="部门级别"
        width="100"
      />
      <el-table-column
        prop="depChargeName"
        label="部门负责人"
        width="100"
      />
      <el-table-column
        prop="depDirectorName"
        label="部门分管领导"
      />
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增或编辑部门信息-->
    <add-or-edit-dep v-if="addOrUpdateVisible" ref="addOrEditDep" @refreshDataList="getDepList"/>
  </div>
</template>

<script>
import { getDepList ,deleteDep } from '@/api/dep'
import AddOrEditDep from './addOrEditDep'
export default {
  props: ['getOrgId'],
  components: { AddOrEditDep },
  data() {
    return {
      search: {
        depCodeS: '',
        depNameS: ''
      },
      datas: [],
      listLoading: true,
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDepList()
  },
  watch: {
    getOrgId(val) {
      this.getDepList(this.getOrgId)
    }
  },
  methods: {
    getDepList() {
      this.listLoading = true
      this.search.orgId = this.getOrgId
      getDepList(this.search).then(response => {
        this.datas = response.data.deps
        this.listLoading = false
      })
    },
    onSearch() {
      this.getDepList()
    },
    onReset() {
      this.search = {
        depCodeS: '',
        depNameS: ''
      }
    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      const formObj = Object()
      formObj.orgId = this.getOrgId
      this.$nextTick(() => {
        this.$refs['addOrEditDep'].init(formObj, 'create')
      })
    },
    onShowUpdate(row) {
      const formObj = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrEditDep'].init(formObj, 'update')
      })
    },
    onDeleteOne(row, index) {
      deleteDep({ id: row.id }).then(response => {
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
