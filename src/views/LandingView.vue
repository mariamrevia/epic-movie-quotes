<template>
    <div class="md:min-h-screen  w-screen bg-landingPage flex flex-col">
      <TheHeader/>
        <div class="bg-landingPage h-53 border-none min-w-full flex flex-col items-center justify-center">
            <FormRegister/>
            <LandingFormLogin/>
            <LandingRegisterEmailSent/>
            <LandingRegisterEmailConfirm/>
            <div>
                <h1 class="text-caramel md:text-4 md:w-50 w-22 text-2 text-center">
                    Find any quote in millions of movie lines
                </h1>
            </div>
            <button class="bg-red w-8.3 h-3 border-none rounded-md text-white mt-[1.5rem]">
                Get started
            </button>

        </div>

        <div
            class="md:min-h-screen items-center h-31 w-screen sm:min-w-full flex bg-landingPage1 bg-no-repeat md:bg-cover bg-[length:700px_600px] bg-center">
            <div class=" pl-10">
              <h2 class="text-white text-1.25 w-17.5 ">“You have to leave somethig behind to go forward”</h2>
              <p  class="text-white text-1">Interstellar, 2014</p>
            </div>
        </div>
        <div
            class="md:min-h-screen h-31 items-center w-screen sm:min-w-full flex bg-landingPage2 md:bg-fixed bg-no-repeat bg-[length:900px_600px]  md:bg-cover bg-50% bg-center  ">
            <div class=" pl-10">
              <h2 class="text-white text-1.25 w-15.6 ">“I think we’re just gonna have to be secretly in love with earch other and leave it that”</h2>
              <p  class="text-white text-1 ">The Royal Tenenbaums,2001</p>
            </div>
        </div>
        <div
            class="md:min-h-screen items-center  h-31 w-screen sm:min-w-full flex  bg-landingPage3 md:bg-fixed bg-no-repeat bg-[length:800px_600px] bg-right md:bg-cover md:bg-center">
            <div class=" pl-10">
              <h2 class="text-white text-1.25 w-17.5 ">“I see in your eyes the same fear that would take the heart of me....”</h2>
              <p  class="text-white text-1">The Lord of the Rings, 2003</p>
            </div>
        </div>
    </div>
</template>
<script setup>
    import FormRegister from '@/components/LandingFormRegister.vue'
    import LandingFormLogin from  '@/components/LandingFormLogin.vue'
    import LandingRegisterEmailSent from '@/components/LandingRegisterEmailSent.vue'
    import LandingRegisterEmailConfirm from '@/components/LandingRegisterEmailConfirm.vue';
    import TheHeader from '@/components/shared/TheHeader.vue'
     
</script>
