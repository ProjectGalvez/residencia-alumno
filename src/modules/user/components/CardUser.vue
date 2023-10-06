<script setup lang="ts">
import { toRef } from 'vue';
import { User } from 'src/modules/model/Model';

const props = defineProps<{ user: User }>();
const user = toRef(props, 'user');
</script>
<template>
  <q-card>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <q-card-section>
          <div
            class="fontsize-14 text-center text-weight-light flex items-center"
          >
            <q-icon name="people" class="q-mr-xs" />
            {{ user.name }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex justify-star items-center">
            <q-img v-if="user.url_foto" :src="user.url_foto" width="150px" />
            <table>
              <tr>
                <td>Email:</td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td>Rol:</td>
                <td>
                  <span v-if="user.roles && user.roles.length > 0">
                    {{ user.roles[0].name }}
                  </span>
                  <span v-else> Sin rol asignado </span>
                </td>
              </tr>
            </table>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<style scoped>
table tr td:nth-child(2) {
  font-weight: bold;
}
</style>
