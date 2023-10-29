<script setup lang="ts">
import { ref } from 'vue';
import usePerfil from '../composables/usePerfil';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useEditarPortada from '../composables/useEditarPortada';
import useEditarAvatar from '../composables/useEditarAvatar';
import useEditarName from '../composables/useEditarName';
import { useRouter } from 'vue-router';

const { user, isLoading } = usePerfil();
const router = useRouter();

const saveCover = ref(false);
const saveAvatar = ref(false);
const coverImageUploader = ref(null);
const avatarImageUploader = ref(null);

const modelCover = ref(null);
const modelAvatar = ref(null);

const { actalizarPortada, isLoadingPortada } = useEditarPortada();
const { actalizarAvatar, isLoadingAvatar } = useEditarAvatar();
const { actalizarName } = useEditarName();

const openCoverImageUploader = () => {
  coverImageUploader.value.click();
};

const openAvatarImageUploader = () => {
  avatarImageUploader.value.click();
};

const handleCoverImageChange = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    modelCover.value = selectedFile;
    user.value.url_portada = imageUrl;
    saveCover.value = true;
  }
};

const handleAvatarImageChange = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    user.value.url_foto = imageUrl;
    modelAvatar.value = selectedFile;
    saveAvatar.value = true;
  }
};
const handleActualizarPortada = () => {
  const portada = new FormData();
  if (modelCover.value) {
    portada.append('url_portada', modelCover.value);
    actalizarPortada(portada);
    saveCover.value = false;
  }
};

const handleActualizarAvatar = () => {
  const avatar = new FormData();
  if (modelAvatar.value) {
    avatar.append('url_foto', modelAvatar.value);
    actalizarAvatar(avatar);
    saveAvatar.value = false;
  }
};

const handleActualizarName = (newName: string) => {
  const name = new FormData();
  name.append('name', newName);
  actalizarName(name);
};

const cambiarPassword = () => {
  router.push({ name: 'cambiar-password' });
};
</script>
<template>
  <q-page padding>
    <LoaderSpinner v-if="isLoading" />
    <div class="row" v-else-if="user">
      <!-- Primera columna -->
      <div class="col-md-6 col-xs-12 q-pa-lg">
        <q-card class="profile-card">
          <q-card-section class="cover-section">
            <div class="change-cover-button">
              <q-btn
                size="sm"
                round
                color="pink"
                icon="image"
                @click="openCoverImageUploader"
              />
              <q-btn
                v-if="saveCover"
                size="sm"
                round
                color="blue-grey-6"
                icon="save"
                @click="handleActualizarPortada"
                :isLoading="isLoadingPortada"
              />
              <input
                type="file"
                ref="coverImageUploader"
                style="display: none"
                accept="image/jpeg, image/png"
                @change="handleCoverImageChange"
              />
            </div>

            <div class="change-avatar-button">
              <q-btn
                size="sm"
                round
                color="pink"
                icon="photo"
                @click="openAvatarImageUploader"
              />
              <q-btn
                v-if="saveAvatar"
                size="sm"
                round
                color="blue-grey-6"
                icon="save"
                @click="handleActualizarAvatar"
                :isLoading="isLoadingAvatar"
              />
              <input
                type="file"
                ref="avatarImageUploader"
                style="display: none"
                accept="image/jpeg, image/png"
                @change="handleAvatarImageChange"
              />
            </div>
            <q-avatar class="avatar-overlay" size="150px">
              <img :src="user?.url_foto" alt="Foto de perfil" />
            </q-avatar>
            <q-img
              class="cover-image"
              :src="user.url_portada"
              alt="Portada del perfil"
            />
          </q-card-section>
          <q-card-section>
            <div class="cursor-pointer">
              <span class="username">{{ user.name }}</span>
              <q-popup-edit v-model="user.name" auto-save v-slot="scope">
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="
                    scope.set;
                    handleActualizarName(scope.value);
                  "
                  required
                />
              </q-popup-edit>
            </div>
            <div class="text-subtitle2">Correo: {{ user?.email }}</div>
          </q-card-section>
          <q-card-section>
            <q-btn
              color="deep-orange"
              glossy
              label="Cambiar contraseña"
              size="xs"
              @click="cambiarPassword"
            />
          </q-card-section>
        </q-card>
      </div>
      <!-- Segunda columna (puedes agregarla según tus necesidades) -->
    </div>
  </q-page>
</template>

<style scoped>
.change-cover-button {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 2;

  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.change-avatar-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 90%);
  z-index: 2;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.profile-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.column-left {
  max-width: 350px;
}

.profile-card {
  width: 100%;
}

.cover-section {
  position: relative;
  padding: 0;
  overflow: hidden;
}

.avatar-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.cover-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.username {
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
}
.text-left {
  text-align: left;
  margin: 0;
}
ul {
  list-style: none; /* Elimina los puntos/bullet points */
}
</style>
