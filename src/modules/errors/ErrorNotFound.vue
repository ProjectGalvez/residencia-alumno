<script setup lang="ts"></script>
<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Perdón. No hay nada aquí</div>

      <div class="sad-face">😢</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Ir a inicio"
        no-caps
      />
    </div>
  </div>
</template>

<style scoped>
.sad-face {
  font-size: 72px; /* Tamaño de la carita triste */
  animation: tears 2s infinite alternate; /* Animación de las lágrimas */
}

@keyframes tears {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px); /* Efecto de lágrimas cayendo */
  }
}
</style>
