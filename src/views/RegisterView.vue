<template>
  <QPage class="flex flex-center">
    <QCard class="register-card">
      <QCardSection class="text-center">
        <h5 class="text-h4 q-mt-none q-mb-md text-grey-8">Registro</h5>
      </QCardSection>

      <QCardSection>
        <Form @submit="onSubmit" class="q-gutter-md" :validation-schema="validationSchema">
          <Field name="name" v-slot="{ errorMessage, value, field }">
            <QInput
              type="text"
              label="Nome"
              outlined
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
            >
              <template #prepend>
                <QIcon name="person" />
              </template>
            </QInput>
          </Field>

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
              <template #prepend>
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
              <template #prepend>
                <QIcon name="lock" />
              </template>

              <template #append>
                <QIcon
                  :name="passwordVisible ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="togglePasswordVisibility"
                />
              </template>
            </QInput>
          </Field>

          <Field name="confirmPassword" v-slot="{ errorMessage, value, field }">
            <QInput
              :type="passwordVisible ? 'text' : 'password'"
              label="Confirmar Senha"
              outlined
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
            >
              <template #prepend>
                <QIcon name="lock" />
              </template>
            </QInput>
          </Field>

          <div class="full-width q-mt-md">
            <QBtn
              type="submit"
              color="primary"
              label="Registrar"
              class="full-width"
              :loading="loading"
            />
          </div>
        </Form>
      </QCardSection>

      <QCardSection class="text-center q-pa-sm">
        <p class="text-grey-6">
          Já tem uma conta?
          <QBtn flat color="primary" label="Faça login" @click="handleLogin" />
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
import type { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';
import { errorHandler } from '@/helpers/errorHandler';

const $q = useQuasar()
const router = useRouter()
const { handleSignUp } = useAuthStore()

const validationSchema = toTypedSchema(
  z.object({
    name: z.string()
      .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
      .regex(/^[a-zA-Z\s]*$/, { message: 'O nome deve conter apenas letras e espaços' }),
    email: z.string()
      .email({ message: 'E-mail inválido' }),
    password: z.string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'A senha deve conter pelo menos uma letra e um número'
      }),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
)

const loading = ref<boolean>(false)
const passwordVisible = ref<boolean>(false)
const togglePasswordVisibility = (): boolean => passwordVisible.value = !passwordVisible.value

const handleLogin = (): void => {
  router.push({ name: 'login' })
}

const onSubmit = async (values: Record<string, string>): Promise<void> => {
  loading.value = true
  const response = await handleSignUp({
    name: values.name,
    email: values.email,
    password: values.password
  }) as AxiosResponse | AxiosError
  loading.value = false

  if(response && ~~((response.status ?? 0) / 100) === 2) {
    $q.notify({
      color: 'positive',
      message: 'Registro realizado com sucesso!',
      icon: 'check',
    })

    router.push({ name: 'login' })
    return
  }

  errorHandler(response, 'Falha ao realizar registro', $q)
}
</script>

<style scoped>
.register-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
