<template>
  <QList
    padding
    class="flex column full-height"
  >
    <div>
      <QItem>
        <QItemSection avatar>
          <QAvatar>
            <img src="https://e1.pngegg.com/pngimages/896/660/png-clipart-pikachu-bymika-pikachu-illustration-thumbnail.png" />
          </QAvatar>
        </QItemSection>

        <QItemSection>
          <QItemLabel>Carlos Junior</QItemLabel>

          <QItemLabel caption>contato@caalb.dev</QItemLabel>
        </QItemSection>
      </QItem>

      <QSeparator />
    </div>

    <div class="flex-grow" />

    <QSeparator />

    <QItem clickable
           @click="userLogout"
    >
      <QItemSection avatar>
        <QIcon name="logout" />
      </QItemSection>

      <QItemSection>Sair</QItemSection>
    </QItem>
  </QList>
</template>

<script setup lang="ts">
import {
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QAvatar,
  QIcon,
  QSeparator,
} from 'quasar'
import { useAuthStore } from '@/stores/auth'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
const $q = useQuasar()
const { handleLogout } = useAuthStore()

const userLogout = () => {
  handleLogout()
  router.push({ name: 'login' })
  $q.notify({
    color: 'negative',
    message: 'Sessão encerrada com sucesso!',
    icon: 'check',
  })
}
</script>

<style scoped>
.full-height {
  height: 100vh;
}

.flex-grow {
  flex-grow: 1;
}
</style>
