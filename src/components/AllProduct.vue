<template>
  <div class="warper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/allproduct' }">所有产品列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product' }">产品销量TOP</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/total' }">每月销售</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/profit' }">每月利润</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category' }">类别第一</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/gender' }">性别青睐</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/three' }">连续购买</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <h1 class="HT">所有产品列表</h1>
      <h5 class="subT">All Products.
        <el-button ref="btn" size="small" class="btn" :loading="btn_loading" type="success" round @click="getData(currentPage)">重新获取数据</el-button>
        <el-button type="primary" size="small" icon="el-icon-search" round @click="gotolink1">搜索产品</el-button>
        <el-button type="primary" size="small" icon="el-icon-view"round  @click="gotolink2">类别筛选</el-button>
      </h5>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-class-name='success-row'
    >
      <el-table-column label="序号"width="90px">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="p_id" sortable label="产品id" width="180">
      </el-table-column>
      <el-table-column prop="p_name" sortable label="产品名" > </el-table-column>
      <el-table-column prop="p_category" sortable label="类别" > </el-table-column>
      <el-table-column prop="cost" sortable label="成本"> </el-table-column>
      <el-table-column prop="price" sortable label="单价"> </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <router-link :to="{path:'purchase/',query:{id:scope.row.p_id,name:scope.row.p_name}}" target="_blank">查询历史订单</router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="center">
    <el-pagination
      @current-change="getData"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :total="total">
    </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AllProduct",
  data() {
    return {
      btn_loading:false,
      currentPage:1,
      total:1,
      loading: false,
      tableData: [
      ],
      options: [{label: ' Diabetes Exercises'}, {label: '10-12 Years'}, {label: '3-6 Years'},{label: '4-for-3 DVD'},
        {label: '539'}, {label: '7-9 Years'}, {label: 'A&E Home Video'},{label: 'ABC News'},
        {label: 'Accessories'}, {label: 'Accessories & Supplies'}, {label: 'Adhesives, Sealants & Lubricants'},{label: 'African American Cinema'},
        {label: 'Animation'}, {label: 'Art House & International'}, {label: 'Arts & Photography'},{label: 'BBC'},
        {label: 'Birth-2 Years'}, {label: 'Blu-ray'}, {label: 'Blues'},{label: 'Boxed Sets'},
        {label: 'Boys'}, {label: 'British Television'}, {label: 'Broadway'},{label: 'Broadway & Vocalists'},
        {label: 'Building Supplies'}, {label: 'Business & Money'}, {label: 'CBS News Network'},{label: 'Camera & Photo'},
        {label: 'Cartoon Network'}, {label: 'Cases, Holsters & Sleeves'}, {label: 'Characters & Series'},{label: 'Charlie Rose Store'},
        {label: 'Children\'s Books'}, {label: 'Children\'s Music'}, {label: 'Christian & Gospel'},{label: 'Christian Books & Bibles'},
        {label: 'Christian Movies & TV'}, {label: 'Christian Video'}, {label: 'Classic Rock'},{label: 'Classic TV'},
        {label: 'Classical'}, {label: 'Classics'}, {label: 'Comedy & Spoken Word'},{label: 'Computers & Accessories'},
        {label: 'Computers & Technology'}, {label: 'Country'}, {label: 'Crafting'}, {label: 'Crafts, Hobbies & Home'},
        {label: 'Criterion Collection'},{label: 'Cult Movies'},{label: 'DC Comics Collection'},{label: 'Dance & Electronic'},
        {label: 'Digital VHS'},{label: 'Directors'},{label: 'Discovery Channel'},{label: 'Disney Home Video'},
        {label: 'Docurama'},{label: 'Dogs'},{label: 'Dolls & Accessories'},{label: 'Educational'},
        {label: 'Electrical'},{label: 'FX'},{label: 'Film Movement'},{label: 'Fish & Aquatic Pets'},
        {label: 'Folk'},{label: 'Foot, Hand & Nail Care'},{label: 'Fragrance'},{label: 'Fully Loaded DVDs'},
        {label: 'GPS, Finders & Accessories'},{label: 'Games & Accessories'},{label: 'Gardening & Lawn Care'},{label: 'Genre for Featured Categories'},
        {label: 'HBO'},{label: 'HDNet'},{label: 'Hardware'},{label: 'Headphones'},
        {label: 'Health Care'},{label: 'Health, Fitness & Dieting'},{label: 'Heating, Cooling & Air Quality'},{label: 'High-Definition DVDs'},
        {label: 'History'},{label: 'History Channel'},{label: 'Holiday & Wedding'},{label: 'Holidays & Seasonal'},
        {label: 'Home D茅cor'},{label: 'Humor & Entertainment'},{label: 'Independently Distributed'},{label: 'Indie & Alternative'},
        {label: 'Indie & Art House'},{label: 'Instrument Accessories'},{label: 'James Bond'},{label: 'Jane Austen on DVD Store'},
        {label: 'Jazz'},{label: 'Jewish Heritage'},{label: 'John Wayne Store'},{label: 'Kitchen & Dining'},
        {label: 'Knitting & Crochet'},{label: 'Latin Music'},{label: 'Legacy Systems'},{label: 'Literature & Fiction'},
        {label: 'MGM Home Entertainment'},{label: 'MOD CreateSpace Video'},{label: 'MTV'},{label: 'Made-for-TV Movies'},
        {label: 'Makeup'},{label: 'Medical Supplies & Equipment'},{label: 'Men'},{label: 'Metal'},
        {label: 'Mini-DVD'},{label: 'Miniseries'},{label: 'Monty Python Store'},{label: 'Motorcycle & Powersports'},
        {label: 'Movies'},{label: 'Music Artists'},{label: 'Musicals & Performing Arts'},{label: 'NCAA on Demand'},
        {label: 'Needlework'},{label: 'New Age'},{label: 'New, Used & Rental Textbooks'},{label: 'Novelty & Gag Toys'},
        {label: 'Novelty & More'},{label: 'Office & School Supplies'},{label: 'Olympics'},{label: 'Opera & Classical Vocal'},
        {label: 'Outdoor D茅cor'},{label: 'Outdoor Power Tools'},{label: 'Outdoor Recreation'},{label: 'PBS'},
        {label: 'PC'},{label: 'Paint, Wall Treatments & Supplies'},{label: 'Painting, Drawing & Art Supplies'},{label: 'Pantry Staples'},
        {label: 'Paramount Home Entertainment'},{label: 'Party Supplies'},{label: 'Pest Control'},{label: 'Pop'},
        {label: 'Power & Hand Tools'},{label: 'Prime Video'},{label: 'R&B'},{label: 'Rap & Hip-Hop'},
        {label: 'Reference'},{label: 'Reggae'},{label: 'Religion & Spirituality'},{label: 'Replacement Parts'},
        {label: 'Rock'},{label: 'Safety & Security'},{label: 'Sci-Fi Series & Sequels'},{label: 'Science & Math'},
        {label: 'Science Fiction & Fantasy'},{label: 'Scrapbooking & Stamping'},{label: 'Self-Help'},{label: 'Sewing'},
        {label: 'Sexual Wellness'},{label: 'Shakespeare on DVD Store'},{label: 'Showtime'},{label: 'Skin Care'},
        {label: 'Soundtracks'},{label: 'Spanish Language'},{label: 'Special Interest'},{label: 'Sports & Fitness'},
        {label: 'Sports & Outdoors'},{label: 'Studio Recording Equipment'},{label: 'Studio Specials'},{label: 'TV'},
        {label: 'TV Series'},{label: 'Teen & Young Adult'},{label: 'Television & Video'},{label: 'Terminator'},
        {label: 'The Comedy Central Store'},{label: 'The Twilight Zone'},{label: 'Tools & Accessories'},{label: 'Travel'},
        {label: 'Travel Channel'},{label: 'Tweens'},{label: 'Universal Media Discs'},{label: 'Wall Art'},
        {label: 'Walt Disney Studios Home Entertainment'},{label: 'Welding & Soldering'},{label: 'Widescreen'},{label: 'Women'},
        {label: 'World Music'},{label: 'Yoga'}
      ],
    };
  },
  mounted() {this.getData(1)},
  methods: {
    gotolink1(){
      this.$router.replace('/searchProduct')
    },
    gotolink2(){
      this.$router.replace('/productByCategory')
    },
    getData: function(currentPage) {
      this.currentPage = currentPage;
      this.$refs.btn.loading = true;
      var self = this;
      this.$axios
        .get("/api/product/getAllProduct?page_id=" + this.currentPage)
        .then(successResponse => {
          if (successResponse.status === 200) {
            this.total = successResponse.data['count'] /10;
            self.tableData = successResponse.data['data'];
            for (var i = 0; i < self.tableData.length; i++) {
              self.tableData[i].price /= 100;
              self.tableData[i].cost /= 100;
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
.el-row {
  margin-top: 20px;
}
</style>
