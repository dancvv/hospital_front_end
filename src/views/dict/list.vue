<template>
  <div class="app-container">
    <!--    查出来的数据-->
    <!--   loda 加载子数的数据 -->
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <!--  使用a标签，使得跳转更为方便 -->
        <a href="http://localhost:8202/admin/cmn/dict/exportData" targer="_blank">
          <el-button type="text"><i class="fa fa-plus"/> 导出</el-button>
        </a>
      </div>
    </div>

    <el-table
      :data="list"
      :load="getChildren"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%"
      row-key="id"
      border
      lazy>
      <el-table-column label="名称" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220">
        <template slot-scope="{row}">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dict from '../../api/dict'

export default {
  name: 'List',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getDictList(1)
  },
  methods: {
    // 导出数据字典
    exportData() {
    //  调用导出接口
      window.location.href = 'http://localhost:8202/admin/cmn/dict/exportData'
    },
    // 数据字典列表
    // 属性结构不显示是由于采用element UI 版本过高，必须切换为2.14.1
    getDictList(id) {
      dict.dictList(id).then(response => {
        this.list = response.data
      })
    },
    // 查询子树的数据，递归操作
    getChildren(tree, treeNode, resolve) {
      dict.dictList(tree.id).then(response => {
        resolve(response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
