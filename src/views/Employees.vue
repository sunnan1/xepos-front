<template>
  <div class="about">
    <h1>Employees List</h1>
    <router-link :to="{name : 'Employee Profile'}">Employee Profile</router-link>
    <div v-if="pagination != {}">
      Total : {{ pagination.total_page }}
      <br>
    </div>
    
    <table>
      <thead>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Company</th>
        <th>Email</th>
        <th>Phone</th>
        <th></th>
      </thead>
      <tbody v-if="records">
          <tr v-for="(employee,index) in records.data" :key="index">
              <td>{{ employee.first_name }}</td>
              <td>{{ employee.last_name }}</td>
              <td>{{ employee.company.name }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.phone }}</td>
              <td> <button @click="deleteEmployee(employee.id,index)">Delete</button></td>
          </tr>
      </tbody>
      <tbody v-else>
          <tr>
              <td align="center" colspan="3">No record found.</td>
          </tr>
      </tbody>
    </table>
    <br>
    <div v-if="pagination != {}">
       <li v-bind:class="{disabled:!pagination.first_link}"><a href="#" @click="employees(1)">&laquo;</a></li> &nbsp;&nbsp;
      <li v-for="n in pagination.last_page" v-bind:key="n" v-bind:class="{disabled:!pagination.current_page == n}"><a href="#" @click="employees(n)">{{ n }}</a>&nbsp;</li>&nbsp;&nbsp; 
      <li v-bind:class="{disabled:!pagination.first_link}"><a href="#" @click="employees(pagination.last_page)">&raquo;</a></li>&nbsp;

    </div>
  </div>
</template>

<style>

li
{ 
display:inline; 
}  
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
<script>
import req from '../apis/request'

export default {
  data(){
      return {
          records : [],
          page : 1,
          pagination : {}
      }
  },
  created() {
        this.employees(this.page)
  },
  methods : {
      deleteEmployee (employeeid)
      {
        req.deleteEmployee(employeeid)
        .then(res => {
            this.employees(this.page)
        })
      },
      employees(page)
      {
        this.page = page
          req.getEmployees(this.page)
          .then(response => {
            if (response.data)
            {
              this.records = '';
              this.records = response.data.data
              this.pagination = {
                  current_page : response.data.data.current_page,
                  last_page : response.data.data.last_page,
                  from_page : response.data.data.from,
                  to_page : response.data.data.to,
                  total_page : response.data.data.total,
                  path_page : response.data.data.path,
                  first_link : response.data.data.first_page_url,
                  last_link : response.data.data.last_page_url,
                  prev_link : response.data.data.prev_page_url,
                  next_link : response.data.data.next_page_url,
              }
            }
          })
      },
  }


}
</script>
