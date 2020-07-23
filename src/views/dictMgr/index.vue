<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="11" :xs="24">
        <dictType @getTypeId="setTypeId"/>
      </el-col>
      <el-col :span="13" :xs="24">
        <dictCode :typeId="typeId"/>
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
      typeId: undefined
    }
  },
  methods: {
    setTypeId(typeId) {
      this.typeId = typeId
    }
  }
}
</script>

<style scoped>

</style>
