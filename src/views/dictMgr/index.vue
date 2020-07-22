<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="11" :xs="24">
        <dictType />
      </el-col>
      <el-col :span="13" :xs="24">
        <dictCode/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dictType, dictCode } from './components'
export default {
  name: 'FuncMgr',
  components: {
    dictType,
    dictCode
  },
  data() {
    return {
      parentId: undefined
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
