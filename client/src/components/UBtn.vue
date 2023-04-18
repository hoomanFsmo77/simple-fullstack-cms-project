<template>
  <button data-bs-toggle="modal" @click="getUserDetail" :data-bs-target="`#edit`+id" class="btn btn-warning">Edit</button>
  <teleport to="body">
    <div class="modal fade" :id="`edit`+id" tabindex="-1" aria-labelledby="edit" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">User Detail</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div v-if="iseUserDataFetch" class="modal-body">
            <div class="form-floating mb-3">
              <input v-model="userTargetDetail.firstname"  type="text" class="form-control" id="firstname" placeholder="name@example.com">
              <label for="firstname">Firstname</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="userTargetDetail.lastname" type="text" class="form-control" id="lastname" placeholder="name@example.com">
              <label for="lastname">Lastname</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="userTargetDetail.username" type="text" class="form-control" id="username" placeholder="name@example.com">
              <label for="username">Username</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="userTargetDetail.password"  type="password" class="form-control" id="password" placeholder="name@example.com">
              <label for="password">Password</label>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="updateUser" data-bs-dismiss="modal" type="button" class="btn btn-info">update</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>

</template>

<script setup lang="ts">
const {id}=defineProps<{
  id:number
}>()
const userTargetDetail=reactive({
  firstname:'',
  lastname:'',
  username:'',
  password:'',
})
const iseUserDataFetch=ref(false)

const updateUser =async () => {
  try {
    const updateUser=await $fetch(`http://localhost:3000/api/user/${id}`,{
      method:'PUT',
      body:JSON.stringify(userTargetDetail),
      headers:{
        'Content-Type':'application/json'
      }
    })
    console.log(updateUser)
    refreshNuxtData('allUsersFetch')
  }catch (err) {
    console.log(err)
  }
}

const getUserDetail =async () => {
  iseUserDataFetch.value=false
  try {
    const targetUserFetch=await $fetch<any>(`http://localhost:3000/api/user/${id}`)
    userTargetDetail.firstname=targetUserFetch[0].firstname
    userTargetDetail.lastname=targetUserFetch[0].lastname
    userTargetDetail.username=targetUserFetch[0].username
    userTargetDetail.password=targetUserFetch[0].password
    iseUserDataFetch.value=true
  }catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>