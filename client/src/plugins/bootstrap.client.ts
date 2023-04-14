// @ts-ignore
import  bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default defineNuxtPlugin((nuxtApp)=>{
    return nuxtApp.provide('bootstrap',bootstrap)
})