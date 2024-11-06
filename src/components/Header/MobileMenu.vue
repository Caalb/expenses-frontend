<template>
  <QList padding class="flex column full-height">
    <div>
      <QItem>
        <QItemSection avatar>
          <QAvatar>
            <img src="https://e1.pngegg.com/pngimages/896/660/png-clipart-pikachu-bymika-pikachu-illustration-thumbnail.png" />
          </QAvatar>
        </QItemSection>

        <QItemSection>
          <QItemLabel>John Doe</QItemLabel>

          <QItemLabel caption>john.doe@email.com</QItemLabel>
        </QItemSection>
      </QItem>

      <QSeparator />
    </div>

    <div class="flex-grow" />

    <QSeparator />

    <QItem clickable v-ripple @click="onLogout">
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

const onLogout = () => {
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