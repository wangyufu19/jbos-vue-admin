<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>字典编码列表</span>
    </div>
    <div class="filter-container">
      <el-button size="medium" type="primary" @click="onAddRow()">新增行</el-button>
      <el-button size="medium" type="primary" @click="onDeleteRow()">删除行</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onSave">保存</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @row-click="onRowClick"
    >
      <el-table-column
        prop="dictId"
        label="字典编码"
        width="200"
      >
        <template slot-scope="scope">
          <el-input v-if="scope.row.status" v-model="scope.row.dictId" />
          <span v-else>{{ scope.row.dictId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="dictName"
        label="字典名称"
        width="200"
      >
        <template slot-scope="scope">
          <el-input v-if="scope.row.status" v-model="scope.row.dictName" />
          <span v-else>{{ scope.row.dictName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNo"
        label="排序"
      >
        <template slot-scope="scope">
          <el-input v-if="scope.row.status" v-model="scope.row.orderNo" />
          <span v-else>{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getDictCodeList, saveDictCode} from '@/api/dict'
export default {
  name: 'DictCode',
  props: ['typeId'],
  data() {
    return {
      datas: [],
      listLoading: true,
      currentRow: ''
    }
  },
  watch: {
    typeId(val) {
      this.getDictCodeList()
    }
  },
  created() {
    this.getDictCodeList()
  },
  methods: {
    getDictCodeList() {
      this.listLoading = true
      getDictCodeList({ typeId: this.typeId }).then(response => {
        this.datas = response.data.dictCodes
        this.listLoading = false
      })
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
    },
    onRowClick(row, event, column) {
      this.currentRow = row.index
    },
    onResetRowStatus(){
      this.datas.map(item => {
        if (item.status) {
          item.status = 0
        }
        return item
      })
    },
    onAddRow() {
      this.onResetRowStatus()
      const row = {
        dictId: '',
        dictName: '',
        orderNo: '',
        status: 1
      }
      this.datas.push(row)
    },
    onDeleteRow() {
      if (this.currentRow === undefined || this.currentRow === '') {
        this.$message({
          message: '请选择操作的数据',
          type: 'success'
        })
        return
      }
      this.datas.splice(this.currentRow, 1)
    },
    onSave() {
      if(this.datas.length>0){
        this.onResetRowStatus()
        saveDictCode({ typeId: this.typeId, dictCodes: this.datas }).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      }
    }
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
