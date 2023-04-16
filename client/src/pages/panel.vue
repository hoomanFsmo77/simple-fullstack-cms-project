<template>
  <section id="users-list" >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <div class="mt-5 py-3">
              <h2 class="text-center text-white">All registered users</h2>
          </div>
          <template v-if="!allUsersFlag && allUsersData.length>0">
            <UserCard v-for="item in allUsersData"
                      :id="item.id"
                      :username="item.username"
                      :firstname="item.firstname"
                      :lastname="item.lastname"
                      :created-at="item.created_at"

            />
          </template>
          <template v-else>
            <h4 class="text-white text-center">There is no user!</h4>
          </template>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({name:'PANEL'})
useHead({
  bodyAttrs:{
    style:'backgroundColor:#333'
  }
})


const {data:allUsersData,error,pending:allUsersFlag}=await useAsyncData('allUsersFetch',()=>$fetch('http://localhost:3000/api/users'))

</script>

<style scoped>
#users-list{
  background-color: #333;
  width: 100%;
  height: 100%;
}

</style>