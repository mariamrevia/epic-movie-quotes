<template>
    <transition name="modal-animation">
      <div v-show="modalActive" >
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="flex flex-col items-center">
            <slot></slot>
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: ['modalActive']
  }
  </script>
  