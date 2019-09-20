<template>
  <div id="register">
    <el-card class="title-container" shadow="hover">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">微服务信息</span>
      <el-button style="float: right;" @click="click" size="small">刷新</el-button>
    </el-card>
    <div class="table-container">
      <el-table border :data="tableData">
        <el-table-column
          label="微服务名"
          prop="name" >
        </el-table-column>
        <el-table-column
          label="服务状态"
          prop="status">
        </el-table-column>
        <el-table-column
          label="主页地址"
          prop="homePageUrl" width="500px">
        </el-table-column>
        <el-table-column
          label="服务ip"
          prop="ip">
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUnistal(scope.$index, scope.row)">恢复
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">下线
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getService} from "../../api/eurekaServer";

  export default {
    name: "register",
    data() {
      return {
        link: 'localhost:8761',
        pageSize: 5,
        pageNum: 1,
        tableData: [],
        total: null,
        data: [],
        tempData: '',
      }
    },
    created() {
      this.click();
    },
    methods: {
      click() {
        let that = this;
        this.$http({
          url: '/api/eureka/apps',
          method: "get",
          contentType: 'application/json',
          accept: 'application/json'

        })
          .then(function (res) {
            console.log(res);
            that.tempData = res.data.applications.application;
            that.mapInformation();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      mapInformation() {
        this.data = this.tempData.map(item => {
          return {
            name: item.name,
            status: item.instance.map(item => {
              return item.status;
            }),
            homePageUrl: item.instance.map(item => {
              return item.homePageUrl;
            }),
            ip: item.instance.map(item => {
              return item.ipAddr;
            }),
            instanceId:item.instance.map(item => {
              return item.instanceId;
            }),
          }
        });
        this.handle();
      },
      handleSizeChange(val) {
        this.pageNum = 1;
        this.pageSize = val;
        this.handle();

      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.handle();
      },
      handle() {
        console.log(this.pageNum)
        this.tableData = this.data.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
        console.log('调用控制函数');
        console.log(this.tableData.instanceId) ;
        console.log(this.tableData);
      },
      handleUnistal(index, row) {
        let instanceId = this.tableData[index].instanceId[0];
        let appId = this.tableData[index].name;
        console.log('ins',instanceId);
        this.$http({
          url: '/api/eureka/apps/'+appId+'/'+instanceId+'/status?value=UP',
          method: "delete",
        })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
        this.click();
      },
      handleDelete(index, row) {
        let instanceId = this.tableData[index].instanceId[0];
        let appId = this.tableData[index].name;
        console.log('ins',instanceId);
        let that = this;
        this.$confirm('该操作将终止该微服务所有功能，且必须手动恢复','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          that.$http({
            url: '/api/eureka/apps/'+appId+'/'+instanceId+'/status?value=OUT_OF_SERVICE',
            method: "put",
          })
            .then(function (res) {
              console.log(res);
              that.click();
            })
            .catch(function (error) {
              console.log(error);
            });
        })

      }
    }
  }
</script>

<style scoped>
  #register {
    padding: 25px;
  }

  .title-container {
    margin-top: 20px;
  }
</style>
