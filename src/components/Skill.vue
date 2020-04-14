<template>
  <div>
    <el-table :data="activities" stripe>
      <el-table-column prop="datetime" label="日期"></el-table-column>
      <el-table-column prop="rate" label="分数"></el-table-column>
    </el-table>
    <h2/>
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">Add</el-button>
    <el-button type="success" icon="el-icon-data-analysis" v-on:click="onChartClick">Trends</el-button>
    <!-- <el-button type="primary" icon="el-icon-data-analysis" @click="dialogVisible = true">Trends</el-button> -->

    <el-dialog title="Add" :visible.sync="dialogFormVisible" width="320px">
      <el-form :model="form">
        <el-form-item label="Date" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="Pick a day">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="Rate" :label-width="formLabelWidth">
          <el-input-number v-model="form.rate" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onAddClick()">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Trends" :visible.sync="dialogVisible" width="90%">
      <chart :columns="getColumns()" :datasets="getDatasets()"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Ok</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import Chart from "./Chart.vue";
import { getActivitiesByRecordIdProxy, createActivityProxy } from "../utils/StudentUtil";

export default Vue.extend({
  components: {
    Chart
  },
  props: {
    record: Object,
    student: Object
  },
  data() {
    return {
      activities: [],
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        date: new Date(),
        rate: 0
      },
      formLabelWidth: "50px"
    };
  },
  async created() {
    this.activities = await getActivitiesByRecordIdProxy(this.$Amplify, this.record.id);
    console.log(this.activities);
  },
  methods: {
    // getActivities() {
    //   const skillName = this.name;
    //   const records = this.student.records;
    //   const curRecord = records.find(record => {
    //     return record.skill === skillName;
    //   });
    //   if (curRecord) {
    //     return curRecord.activities;
    //   } else {
    //     return [];
    //   }
    // },
    getColumns() {
      // const activities = this.getActivities();
      const columns = [];
      this.activities.forEach(activity => {
        columns.push(activity.datetime);
      });
      return JSON.stringify(columns);
    },
    getDatasets() {
      // const activities = this.getActivities();
      const data = [];
      this.activities.forEach(activity => {
        data.push(activity.rate);
      });
      const dataset = [
        {
          label: this.record.skillName,
          borderColor: "lightblue",
          data: data
        }
      ];
      return JSON.stringify(dataset);

      // return JSON.stringify([
      //     {
      //     label: 'Data One',
      //     borderColor: 'lightgreen',
      //     data: [40, null, 50, 60]
      //     },
      //     {
      //         label: 'Data two',
      //         borderColor: 'lightblue',
      //         data: [30, 10, 60, 50]
      //     }
      // ]);
    },
    async onAddClick() {
        this.dialogFormVisible = false;

        const pickedDate = this.form.date;
        const year = pickedDate.getFullYear();
        const month = pickedDate.getMonth() + 1;
        const day = pickedDate.getDate();
        
        const newActivity = await createActivityProxy(this.$Amplify, this.record.id,
          `${year}-${month}-${day}`, this.form.rate, "ui"
        );
        if (newActivity) {
          this.activities.push(newActivity);
        }
    },
    onChartClick() {
      this.$router.push({
        name: "chart",
        params: {
          columns: this.getColumns(),
          datasets: this.getDatasets()
        }
      });
    }
  }
});
</script>