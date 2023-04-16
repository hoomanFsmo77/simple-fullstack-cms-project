<template>
  <div class="card mb-3" >
    <div class="card-header">
      <h5>Username: {{username}}</h5>
    </div>
    <div class="card-body">
      <p>Firstname: {{firstname}}</p>
      <p>Lastname: {{lastname}}</p>
      <p>Created at: {{createdAt}}</p>
    </div>
    <div class="card-footer d-flex gap-2 ">
      <DBtn :id="id"/>
      <UBtn :id="id"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const {firstname,id,createdAt,username,lastname}=defineProps<{
  id:number,
  username:string,
  firstname:string
  lastname:string,
  createdAt:string
}>()

</script>

<style scoped>

</style>