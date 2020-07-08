<template>
  <el-card>
  <el-tree
    ref="tree"
    :load="loadNode"
    :props="defaultProps"
    :filter-node-method="filterNode"
    class="filter-tree"
    lazy
    @node-click="onClickNode"
  />
  </el-card>
</template>

<script>
import { getOgrTree } from '@/api/org'
export default {
  data() {
    return {
      filterText: '',
      items: [],
      defaultProps: {
        label: 'text',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    async loadTreeData(parentId) {
      await getOgrTree({ parentId: parentId }).then(response => {
        this.items = response.data.orgTree
      })
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        await this.loadTreeData('0')
        return resolve(this.items)
      } else if (node.level > 0) {
        await this.loadTreeData(node.data.id)
        return resolve(this.items)
      }
    },
    onClickNode(data, node) {
      this.$store.commit('orgtree/SET_CURRENT_NODEID', data.id)
    }
  }
}
</script>
