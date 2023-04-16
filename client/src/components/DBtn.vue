<template>
  <button data-bs-toggle="modal" :data-bs-target="`#delete`+id" class="btn btn-danger">Delete</button>
 <teleport to="body">
   <div class="modal fade" :id="`delete`+id" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Alert</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <p>Are you sure to delete this user?</p>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button @click="deleteUserHandler" data-bs-dismiss="modal" type="button" class="btn btn-danger">Delete</button>
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


const deleteUserHandler =async () => {
  try {
    const deleteUser=await $fetch(`http://localhost:3000/api/user/${id}`,{
      method:'DELETE'
    })
    refreshNuxtData('allUsersFetch')
  }catch (err) {

  }
}

</script>

<style scoped>

</style>