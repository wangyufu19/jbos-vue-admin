<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>字典编码列表</span>
    </div>
    <div class="filter-container">
      <el-button size="medium" type="primary" @click="onSearch">新增行</el-button>
      <el-button size="medium" type="primary" @click="onReset">删除行</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">保存</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="dictId"
        label="字典编码"
        width="200"
      />
      <el-table-column
        prop="dictName"
        label="字典名称"
        width="200"
      />
      <el-table-column
        prop="orderNo"
        label="排序"
      />
    </el-table>
  </el-card>
</template>

<script>
import { getDictCodeList } from '@/api/dict'
export default {
  name: 'DictCode',
  props: ['typeId'],
  data() {
    return {
      datas: [],
      listLoading: true,
    }
  },
  created() {
    this.getDictCodeList()
  },
  watch: {
    typeId(val) {
      this.getDictCodeList()
    }
  },
  methods: {
    getDictCodeList() {
      this.listLoading = true
      getDictCodeList({typeId:this.typeId}).then(response => {
        this.datas = response.data.dictCodes
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
