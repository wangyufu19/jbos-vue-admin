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

      :data="datas"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="dictCode"
        label="字典编码"
        width="260"
      />
      <el-table-column
        prop="dictName"
        label="字典名称"
      />
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'DictCode'
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
