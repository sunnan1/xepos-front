<template>
    <div>
        <h1>Company Profile</h1>
        <span v-if="message != ''" style="font-size:13px;color:green">
                    {{ message.message }}
        </span>  
        <br>
        <span v-if="errors.message" style="font-size:11px;color:red">
                    {{ errors.message }}
                </span>  
                <br>
        <form @submit.prevent="companysave">
            <label for="fname">Name:</label>
            <input type="text" id="fname" name="fname" v-model="form.name"><br>
                <span v-if="errors.name" style="font-size:11px;color:red">
                    {{ errors.name[0] }}
                </span>            
            <br>
            <label for="fname">Email:</label>
            <input type="email" id="fname" name="fname" v-model="form.email"><br>
                <span v-if="errors.email" style="font-size:11px;color:red">
                    {{ errors.email[0] }}
                </span>            
            <br>
            <label for="fname">Website:</label>
            <input type="text" id="fname" name="fname" v-model="form.website"><br>
            <br>

            <label for="fname">Logo:</label>
            <input type="file" name="picture" class="form-control-file" id="picture" @change="onFileChange">
            <br>
            <img v-bind:src="imagePreview" width="100" height="100" v-show="showPreview"/> 
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
            imagePreview: null,
            showPreview: false,
            message : '',
            form : {
                name : '',
                email : '',
                website : '',
                picture : null
            },
            errors: []
        }
    },
    methods : {
        companysave() {
            this.errors = []
            let formData = new FormData();
            formData.append("picture", this.form.picture);
            formData.append("name", this.form.name);
            formData.append("email", this.form.email);
            formData.append("website", this.form.website);
            req.saveCompany(formData , {
                  'Content-Type': 'multipart/form-data'
                })
                .then(response => {
                    formData = ''
                    this.message = response.data;
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    this.errors.message = 'Something went wrong'
                });
        },
        onFileChange(event){
        this.form.picture = event.target.files[0];
        let reader  = new FileReader();
        reader.addEventListener("load", function () {
            this.showPreview = true;
            this.imagePreview = reader.result;
        }.bind(this), false);
        console.log(this.form.picture)
        if( this.form.picture ){
            if ( /\.(jpe?g|png|gif)$/i.test( this.form.picture.name ) ) {
                reader.readAsDataURL( this.form.picture );
            }
        }
}
    }
}
</script>