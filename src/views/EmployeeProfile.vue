<template>
    <div>
        <h1>Employee Profile</h1>
        <span v-if="message != ''" style="font-size:13px;color:green">
                    {{ message.message }}
        </span>  
        <br>
        <span v-if="errors.message" style="font-size:11px;color:red">
                    {{ errors.message }}
        </span>  
        <br>
        <form @submit.prevent="employeesave">
            <label for="fname">First Name:</label>
            <input type="text" id="fname" name="fname" v-model="form.first_name"><br>
                <span v-if="errors.first_name" style="font-size:11px;color:red">
                    {{ errors.first_name[0] }}
                </span>            
            <br>
            <label for="fname">Last Name:</label>
            <input type="text" id="fname" name="fname" v-model="form.last_name"><br>
                <span v-if="errors.last_name" style="font-size:11px;color:red">
                    {{ errors.last_name[0] }}
                </span>            
            <br>
            <label for="fname">Company:</label>
            <select v-model="form.company_id">
                <option disabled value="">Please select one</option>
                <option v-for="company in companies" v-bind:value="company.id">{{company.name}}</option>
            </select>
            <br>
            <br>
            <label for="fname">Email:</label>
            <input type="text" id="fname" name="fname" v-model="form.email"><br>
            <br>
            <label for="fname">Phone:</label>
            <input type="text" id="fname" name="fname" v-model="form.phone"><br>
            <br>
         
            <input type="submit" value="Submit">
        </form>
        </div>
</template>

<script>
import req from '../apis/request'
export default {
    data() {
        return {
      
            message : '',
            companies : '',
            form : {
                first_name : '',
                last_name : '',
                company_id : '',
                email : '',
                phone : '',
            },
            errors: []
        }
    },

    mounted()
    {
        this.getCompanies()
    },
    methods : {

        getCompanies()
        {
            req.allCompanies()
            .then(res => {
                this.companies = res.data
            })
        },
        employeesave() {
            this.errors = []
            req.saveEmployee(this.form)
                .then(response => {
                    this.message = response.data;
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    this.errors.message = 'Something went wrong'
                });
        },
    }
}
</script>