<template>
  <div class="row items-center q-gutter-sm">
    <QBtn round flat class="q-ml-sm">
      <QAvatar size="32px">
        <img src="https://e1.pngegg.com/pngimages/896/660/png-clipart-pikachu-bymika-pikachu-illustration-thumbnail.png" />
      </QAvatar>

      <QTooltip>Perfil</QTooltip>

      <QMenu auto-close>
        <QList style="min-width: 200px">
          <QItem clickable v-close-popup @click="onMenuClick('logout')">
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

const onMenuClick = (action: string) => {
  switch (action) {
    case 'logout':
      // Implementar logout
      break
    case 'profile':
      // Navegar para perfil
      break
    case 'settings':
      // Navegar para configurações
      break
  }
}
</script>