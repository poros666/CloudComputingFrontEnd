<template>
  <div class="warper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/allproduct' }">所有产品列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product' }"
        >产品销量TOP</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/total' }">每月销售</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/profit' }"
        >每月利润</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/category' }"
        >类别第一</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/gender' }"
        >性别青睐</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/three' }">连续购买</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <h1 class="HT">每月销售利润统计</h1>
      <h5 class="subT">Profit of every MONTH.</h5>
      <el-button
        ref="btn"
        class="btn"
        type="success"
        round
        :loading="false"
        @click="getData"
        >查询</el-button
      >
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      row-class-name="success-row"
    >
      <el-table-column label="序号"width="90px">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="year" label="年份" sortable width="200"> </el-table-column>
      <el-table-column prop="month" label="月份" sortable width="200"> </el-table-column>
      <el-table-column prop="profit" sortable label="利润"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MonthProfit",
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  methods: {
    getData: function() {
      this.$refs.btn.loading = true;
      var self = this;
      //var data = JSON.stringify({ name: "zhizhizhi", age: 2 });
      this.$axios
        .get("/api/profit/monthprofit")
        .then(successResponse => {
          if (successResponse.status === 200) {
            self.tableData = successResponse.data['data'];
            for (var i = 0; i < self.tableData.length; i++) {
              self.tableData[i].profit /= 100;
            }
            this.$message({
              message: "成功",
              type: "success"
            });
            this.$refs.btn.loading = false;
            this.$refs.btn.type = "success";
          } else {
            this.$notify({
              title: "错误",
              message: successResponse.data.message,
              type: "error"
            });
            this.$refs.btn.loading = false;
            this.$refs.btn.type = "danger";
          }
        })
        .catch(failResponse => {
          this.$message({
            message: "请求失败",
            type: "error"
          });
          this.$refs.btn.loading = false;
          this.$refs.btn.type = "danger";
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
