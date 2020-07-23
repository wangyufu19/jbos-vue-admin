<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>字典类型列表</span>
    </div>
    <div class="filter-container">
      <el-input v-model="search.typeNameS" placeholder="类型名称" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
      @row-click="onRowClick"
    >
      <el-table-column
        prop="typeId"
        label="类型编码"
        width="180"
      />
      <el-table-column
        prop="typeName"
        label="类型名称"
        width="130"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--角色列表分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getDictTypeList" />
  </el-card>
</template>

<script>
import { getDictTypeList } from '@/api/dict'
export default {
  name: 'DictType',
  data() {
    return {
      search: {
        typeNameS: ''
      },
      datas: [],
      listLoading: true,
      total: 0,
      queryPage: {
        page: 1,
        limit: 20
      },
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDictTypeList()
  },
  methods: {
    getDictTypeList() {
      this.listLoading = true
      getDictTypeList(this.search).then(response => {
        this.datas = response.data.dictTypes
        this.listLoading = false
      })
    },
    onRowClick(row) {
      this.$emit('getTypeId', row.typeId)
    }
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
