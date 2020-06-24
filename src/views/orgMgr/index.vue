<template>
  <div class="app-container">
    <div class="wrapper-center-container" style="padding: 0">
      <div class="tree-left-container">
        <div class="tree-left">
          <leftTree/>
        </div>
      </div>
      <div class="tree-main-container">
          <treeMain/>
      </div>
    </div>
  </div>
</template>

<script>
import { leftTree, treeMain } from './components'
export default {
  name: 'OrgMgr',
  components: {
    leftTree,
    treeMain
  }
}
</script>

<style scoped>
  .wrapper-center-container{
    background: #fff;
    padding: 30px;
    width: 100%;
    overflow: hidden;
  }
  .tree-left-container{
    width: 250px;
    border-right: 1px solid #ececec;
    height: 600px;
    overflow-y: auto;
    padding: 10px 20px 20px;
    float: left;
  }
  .tree-tit{
    font-size: 18px;
    line-height: 45px;
    border-bottom: 1px solid #ececec;
    color: #333;
  }
  .tree-left{
    width: 100%;
    overflow: hidden;
  }
  .tree-main-container{
    margin-left: 230px;
    width: 100%;
    padding-left: 25px;
  }
</style>
