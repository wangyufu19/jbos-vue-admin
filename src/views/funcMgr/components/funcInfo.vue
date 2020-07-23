<template>
  <div>
    <div class="filter-container">
      <el-input v-model="search.funcCodeS" placeholder="功能编码" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.funcNameS" placeholder="功能名称" class="filter-item" style="width: 200px;" />
      <el-button  size="medium" type="primary"  @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary"  @click="onShowAdd">新增</el-button>
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
        prop="funcCode"
        label="功能编码"
        width="150"
      />
      <el-table-column
        prop="funcName"
        label="功能名称"
        width="150"
      />
      <el-table-column
        prop="funcType"
        label="功能类型"
        width="100"
      />
      <el-table-column
        prop="orderNo"
        label="排序"
        width="100"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增或编辑功能信息-->
    <add-or-edit-func v-if="addOrUpdateVisible" ref="addOrEditFunc" @refreshDataList="getFuncList"/>
  </div>
</template>

<script>
import { getFuncList, deleteFunc } from '@/api/func'
import AddOrEditFunc from './addOrEditFunc'
export default {
  props: ['getParentId'],
  components: { AddOrEditFunc },
  data() {
    return {
      search: {
        funcCodeS: '',
        funcNameS: ''
      },
      datas: [],
      listLoading: true,
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getFuncList(this.getParentId)
  },
  watch: {
    getParentId(val) {
      this.getFuncList(this.getParentId)
    }
  },
  methods: {
    getFuncList() {
      this.listLoading = true
      this.search.parentId = this.getParentId
      getFuncList(this.search).then(response => {
        this.datas = response.data.funcs
        this.listLoading = false
      })
    },
    onSearch() {
      this.getFuncList()
    },
    onReset() {
      this.search = {
        funcCodeS: '',
        funcNameS: ''
      }
    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      const formObj = Object()
      formObj.parentId = this.getParentId
      this.$nextTick(() => {
        this.$refs['addOrEditFunc'].init(formObj, 'create')
      })
    },
    onShowUpdate(row) {
      const formObj = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrEditFunc'].init(formObj, 'update')
      })
    },
    onDeleteOne(row, index) {
      deleteFunc({ id: row.id }).then(response => {
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
