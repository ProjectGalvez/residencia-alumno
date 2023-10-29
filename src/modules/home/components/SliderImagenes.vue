<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      slide: ref(1),
      fullscreen: ref(false),
    };
  },
};
</script>
<template>
  <div class="q-pt-md">
    <q-carousel
      swipeable
      animated
      arrows
      v-model="slide"
      v-model:fullscreen="fullscreen"
      infinite
    >
      <q-carousel-slide :name="1" img-src="/banner-1.jpg" />
      <q-carousel-slide :name="2" img-src="/banner-2.jpg" />
      <q-carousel-slide :name="3" img-src="/banner-3.jpg" />
      <q-carousel-slide :name="4" img-src="/banner-4.jpg" />

      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            push
            round
            dense
            color="white"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>
