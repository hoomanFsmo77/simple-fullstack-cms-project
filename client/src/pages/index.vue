<template>
  <div id="bg"></div>
  <div class="container mt-3 mb-5 pb-5" style="z-index: 10;position: relative">
    <div class="row justify-content-center align-items-center">
      <div v-if="registerMassage.msg" class="col-4 mb-3">
        <div  class="card ">
          <div class="card-body " :class="registerMassage.isSuccessful ? 'text-success' : 'text-danger'" v-html="registerMassage.msg">
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-4">
        <form @submit.prevent>
          <div class="form-floating mb-3">
            <input v-model="userInfo.firstname" type="text" class="form-control" id="firstname" placeholder="name@example.com">
            <label for="firstname">Firstname</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="userInfo.lastname" type="text" class="form-control" id="lastname" placeholder="name@example.com">
            <label for="lastname">Lastname</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="userInfo.username" type="text" class="form-control" id="username" placeholder="name@example.com">
            <label for="username">Username</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="userInfo.password" type="password" class="form-control" id="password" placeholder="name@example.com">
            <label for="password">Password</label>
          </div>
          <div class="d-flex justify-content-center">
            <button @click="registerHandler" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
useHead({
  bodyAttrs:{
    style:'overflow:hidden'
  }
})
const registerMassage=reactive({
  msg:'',
  isSuccessful:false
})
const userInfo=reactive({
  firstname:'',
  lastname:'',
  username:'',
  password:'',
})

const resetInputs = () => {
  userInfo.firstname=''
  userInfo.lastname=''
  userInfo.username=''
  userInfo.password=''
}

const registerHandler = async () => {
  registerMassage.msg=''
  registerMassage.isSuccessful=false
 try {
   const register=await $fetch<any>('http://localhost:3000/api/user/register',{
     body:JSON.stringify(userInfo),
     method:'POST'
   })
   registerMassage.msg=register.msg
   registerMassage.isSuccessful=register.isSuccessful
   if(register.isSuccessful){
     resetInputs()
     navigateTo('/panel')
   }
 }catch (err) {
   console.log(err)
 }

}

</script>

<style scoped>
#bg{
  width: 100vw;
  height: 100vh;
  background: url("https://images.pexels.com/photos/15977768/pexels-photo-15977768.jpeg") center  center/cover no-repeat;
 filter: blur(2px);
  position: absolute;
  left: 0;
  top: 0;
}
</style>