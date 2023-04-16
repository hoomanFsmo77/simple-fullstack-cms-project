<template>
  <div id="bg"></div>
  <div class="container mt-5 mb-5 py-5" style="z-index: 10;position: relative">
    <div class="row justify-content-center align-items-center">
      <div v-if="loginMassage.msg" class="col-4 mb-3">
        <div  class="card ">
          <div class="card-body " :class="loginMassage.isSuccessful ? 'text-success' : 'text-danger'" v-html="loginMassage.msg">
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-4">
        <form @submit.prevent>
          <div class="form-floating mb-3">
            <input v-model="userInfo.username" type="text" class="form-control" id="username" placeholder="name@example.com">
            <label for="username">Username</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="userInfo.password" type="password" class="form-control" id="password" placeholder="name@example.com">
            <label for="password">Password</label>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center">
            <button @click="loginHandler" class="btn btn-primary">Login</button>
            <p class="text-white">Do not you have account? <NuxtLink :to="{name:'REGISTER'}">register</NuxtLink></p>
          </div>
        </form>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
definePageMeta({name:'LOGIN'})
useHead({
  bodyAttrs:{
    style:'overflow:hidden'
  }
})
const loginMassage=reactive({
  msg:'',
  isSuccessful:false
})
const userInfo=reactive({
  username:'',
  password:'',
})
const loginHandler = async () => {
  try {
    const login=await $fetch<any>('http://localhost:3000/api/user/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(userInfo)
    })
    loginMassage.isSuccessful=login.isSuccessful
    loginMassage.msg=login.msg
    if(login.isSuccessful){
      return navigateTo({name:'PANEL'})
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
  background: url("https://images.pexels.com/photos/8247625/pexels-photo-8247625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") center  center/cover no-repeat;
  filter: blur(2px);
  position: absolute;
  left: 0;
  top: 0;
}
</style>