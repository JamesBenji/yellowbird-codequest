<!-- eslint-disable linebreak-style -->
<template>
    <div>
        <p>
        Your payment was successful.
        We have accepted your order and will begin the delivery process within 2 hours.
        </p>
        <button @click="router.push('/store')"
                  class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
            Continue Shopping
          </button>
    </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
