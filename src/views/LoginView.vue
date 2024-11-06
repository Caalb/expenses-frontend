<template>
  <QPage class="flex flex-center">
    <QCard class="login-card">
      <QCardSection class="text-center">
        <h5 class="text-h4 q-mt-none q-mb-md text-grey-8">Login</h5>
      </QCardSection>

      <QCardSection>
        <Form @submit="onSubmit" class="q-gutter-md" :validation-schema="validationSchema">
          <Field name="email" v-slot="{ errorMessage, value, field }">
            <QInput
              type="email"
              label="E-mail"
              outlined
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
            >
              <template v-slot:prepend>
                <QIcon name="email" />
              </template>
            </QInput>
          </Field>

          <Field name="password" v-slot="{ errorMessage, value, field }">
            <QInput
              :type="passwordVisible ? 'text' : 'password'"
              label="Senha"
              outlined
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"

            >
              <template v-slot:prepend>
                <QIcon name="lock" />
              </template>

              <template v-slot:append>
                <QIcon
                  :name="passwordVisible ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="togglePasswordVisibility"
                />
              </template>
            </QInput>
          </Field>

          <div class="full-width q-mt-md">
            <QBtn
              type="submit"
              color="primary"
              label="Entrar"
              class="full-width"
              :loading="loading"
            />
          </div>
        </Form>
      </QCardSection>

      <QCardSection class="text-center q-pa-sm">
        <p class="text-grey-6">
          Não tem uma conta?
          <QBtn flat color="primary" label="Registre-se" @click="handleRegister" />
        </p>
      </QCardSection>
    </QCard>
  </QPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QBtn, QCard, QCardSection, QIcon, QInput, QPage, useQuasar } from 'quasar';
import { Form, Field } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/auth';
import type { AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';

const $q = useQuasar()
const router = useRouter()
const { handleSignIn } = useAuthStore()

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  })
)

const loading = ref<boolean>(false)
const passwordVisible = ref<boolean>(false)
const togglePasswordVisibility = (): boolean => passwordVisible.value = !passwordVisible.value

const handleRegister = (): void => {
  router.push({ name: 'register' })
}

const onSubmit = async (values: Record<string, string>): Promise<void> => {
    loading.value = true
    const response = await handleSignIn(values.email, values.password) as AxiosResponse
    loading.value = false

    if(response && ~~(response.status/100) === 2) {
      $q.notify({
        color: 'positive',
        message: 'Login realizado com sucesso!',
        icon: 'check',
      })

      router.push({ name: 'home' })
      return;
    }

  $q.notify({
    color: 'negative',
    message: ((response as unknown) as Error)?.message ?? 'Falha ao realizar login',
    icon: 'error',
  })
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
