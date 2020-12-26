<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>选择你的操作：</span>
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">查看</el-dropdown-item>
              <el-dropdown-item command="b">新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="p_id"
              label="商品ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="p_name"
              label="商品名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="p_category"
              label="类别"
              width="180">
            </el-table-column>
            <el-table-column
              prop="cost"
              label="成本"
              width="180">
            </el-table-column>
            <el-table-column
              prop="price"
              label="售价"
              width="180">
            </el-table-column>
            <el-table-column
              prop="p_total"
              label="库存">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  methods: {
    handleCommand(command) {
      if(command=='a'){
        this.loading=true;
        this.created();
      }
      else if(command=='b'){
        this.loading=true;
        this.orderby();
      }
    },
    created: function () {
      var self = this;
      var data = JSON.stringify({name: 'zhizhizhi', age: 2});

      this.$axios.post('/product/allProduct', data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      })
        .then(successResponse => {
          if (successResponse.status === 200) {
            self.tableData = successResponse.data;
            this.$message({
              message: '查询成功',
              type: 'success'
            });
            this.loading=false;
          } else {
            this.$notify({
              title: "失败",
              message: successResponse.data.message,
              type: 'error'
            })
          }
        })
        .catch(failResponse => {
        })
    },
    orderby: function () {
      var self = this;
      var data = JSON.stringify({name: 'zhizhizhi', age: 2});

      this.$axios.post('/product/allProductod', data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      })
        .then(successResponse => {
          if (successResponse.status === 200) {
            self.tableData = successResponse.data;
            this.$message({
              message: '排序成功',
              type: 'success'
            });
            this.loading=false;
          } else {
            this.$notify({
              title: "失败",
              message: successResponse.data.message,
              type: 'error'
            })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}

</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
