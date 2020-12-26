<template>
  <div class="warper">
    <el-breadcrumb separator="/">
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
      <h1 class="HT">连续三个月有购买记录的客人</h1>
      <h5 class="subT">
        Clients who has purchase records in THREE consecutive months.
      </h5>
      <el-input-number
        class="input"
        v-model="num"
        @change="handleChange"
        :min="1997"
        :max="2012"
        label="top"
      ></el-input-number>
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
      <el-table-column prop="c_id" label="用户id" width="180">
      </el-table-column>
      <el-table-column prop="c_name" label="用户昵称" width="180">
      </el-table-column>
      <el-table-column prop="c_sex" label="用户性别"> </el-table-column>
      <el-table-column prop="data_dt" label="连续购买记录"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ThreeMonth",
  data() {
    return {
      num: 2010,
      loading: false,
      tableData: [
        {
          c_id: "1asd2f34yg",
          c_name: "雷神",
          c_sex: 0,
          data_dt: "2020-07-01|2020-07-02|2020-07-03"
        },
        {
          c_id: "123g234g34",
          c_name: "干扰素",
          c_sex: 1,
          data_dt: "2020-07-01|2020-07-02|2020-07-03"
        },
        {
          c_id: "1f34h65",
          c_name: "东方",
          c_sex: 1,
          data_dt: "2020-07-01|2020-07-02|2020-07-03"
        }
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    getData: function() {
      this.$refs.btn.loading = true;
      var self = this;
      //var data = JSON.stringify({ name: "zhizhizhi", age: 2 });
      this.$axios
        .get("api/user/threeday?year=" + num)
        .then(successResponse => {
          if (successResponse.status === 200) {
            self.tableData = successResponse.data;
            for (var i = 0; i < self.tableData.length; i++) {
              if (self.tableData[i].c_sex == 0) {
                self.tableData[i].c_sex = "男";
              } else {
                self.tableData[i].c_sex = "女";
              }
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
