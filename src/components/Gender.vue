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
      <h1 class="HT">最受男性/女性青睐产品</h1>
      <h5 class="subT">Products most FAVORED by men / women.</h5>
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
    <h5 class="subTs">BEST sales of Men.</h5>
    <el-table
      :data="tableDataMale"
      style="width: 100%"
      row-class-name="success-row"
    >
      <el-table-column prop="p_id" label="产品id" width="180">
      </el-table-column>
      <el-table-column prop="p_name" label="产品名" width="180">
      </el-table-column>
      <el-table-column prop="p_category" label="类别"> </el-table-column>
      <el-table-column prop="cost" label="成本"> </el-table-column>
      <el-table-column prop="price" label="单价"> </el-table-column>
      <el-table-column prop="s_vol" label="销量"> </el-table-column>
    </el-table>
    <h5 class="subTs">BEST sales of Women.</h5>
    <el-table
      :data="tableDataFemale"
      style="width: 100%"
      row-class-name="women-row"
    >
      <el-table-column prop="p_id" label="产品id" width="180">
      </el-table-column>
      <el-table-column prop="p_name" label="产品名" width="180">
      </el-table-column>
      <el-table-column prop="p_category" label="类别"> </el-table-column>
      <el-table-column prop="cost" label="成本"> </el-table-column>
      <el-table-column prop="price" label="单价"> </el-table-column>
      <el-table-column prop="s_vol" label="销量"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Gender",
  data() {
    return {
      loading: false,
      tableDataMale: [
        {
          p_id: "dsf8dfgd7ft738h7t3rh",
          p_name: "林中小屋",
          p_category: "恐怖电影",
          cost: 1142,
          price: 1215,
          s_vol: 132
        },
        {
          p_id: "dsf8dfgd7ft738h7t3rh",
          p_name: "林中小屋",
          p_category: "恐怖电影",
          cost: 1142,
          price: 1215,
          s_vol: 332
        }
      ],
      tableDataFemale: [
        {
          p_id: "dsf8dfgd7ft738h7t3rh",
          p_name: "林中小屋",
          p_category: "恐怖电影",
          cost: 1142,
          price: 1215,
          s_vol: 132
        },
        {
          p_id: "dsf8dfgd7ft738h7t3rh",
          p_name: "林中小屋",
          p_category: "恐怖电影",
          cost: 1142,
          price: 1215,
          s_vol: 332
        }
      ]
    };
  },
  methods: {
    getData: function() {
      this.$refs.btn.loading = true;
      var self = this;
      //var data = JSON.stringify({ name: "zhizhizhi", age: 2 });
      this.$axios
        .get("/api/purchase/genderprefer")
        .then(successResponse => {
          if (successResponse.status === 200) {
            self.tableDataMale = successResponse.data.male;
            self.tableDataFemale = successResponse.data.female;
            for (var i = 0; i < self.tableData.length; i++) {
              self.tableDataMale[i].cost /= 100;
              self.tableDataMale[i].price /= 100;
              self.tableDataFemale[i].cost /= 100;
              self.tableDataFemale[i].price /= 100;
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

<style lang="scss" scoped>
.subTs {
  font-family: "Oswald", sans-serif;
}
</style>
