<template>
  <div class="row items-center q-gutter-sm">
    <QBtn
      round
      flat
      class="q-ml-sm"
    >
      <QAvatar size="32px">
        <img src="https://e1.pngegg.com/pngimages/896/660/png-clipart-pikachu-bymika-pikachu-illustration-thumbnail.png" />
      </QAvatar>

      <QTooltip>Perfil</QTooltip>

      <QMenu auto-close>
        <QList style="min-width: 200px">
          <QItem
            clickable
            @click="userLogout"
          >
            <QItemSection avatar>
              <QIcon name="logout" />
            </QItemSection>

            <QItemSection>Sair</QItemSection>
          </QItem>
        </QList>
      </QMenu>
    </QBtn>
  </div>
</template>

<script setup lang="ts">
import {
  QBtn,
  QAvatar,
  QMenu,
  QList,
  QItem,
  QItemSection,
  QIcon,
  QTooltip
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
