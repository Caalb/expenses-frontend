<template>
  <QPage class="flex flex-center">
    <QCard class="login-card">
      <QCardSection class="text-center">
        <h5 class="text-h4 q-mt-none q-mb-md text-grey-8">Login</h5>
      </QCardSection>

      <QCardSection>
        <QForm @submit="onSubmit" class="q-gutter-md">
          <QInput
            v-model="formState.email"
            type="email"
            label="E-mail"
            outlined
            :rules="validationRules.email"
          >
            <template v-slot:prepend>
              <QIcon name="email" />
            </template>
          </QInput>

          <QInput
            v-model="formState.password"
            :type="passwordVisible ? 'text' : 'password'"
            label="Senha"
            outlined
            :rules="validationRules.password"
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

          <div class="flex justify-between q-mt-sm">
            <QCheckbox v-model="formState.rememberMe" label="Lembrar-me" />
            <QBtn flat color="primary" label="Esqueceu a senha?" @click="handleForgotPassword" />
          </div>

          <div class="full-width q-mt-md">
            <QBtn
              type="submit"
              color="primary"
              label="Entrar"
              class="full-width"
              :loading="loading"
            />
          </div>
        </QForm>
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
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { QPage, QCard, QCardSection, QInput, QCheckbox, QBtn, QIcon, QForm} from 'quasar'

interface LoginCredentials {
  email: string
  password: string
}

type ValidationRule = (val: string) => boolean | string

interface ValidationRules {
  email: ValidationRule[]
  password: ValidationRule[]
}

const $q = useQuasar()

interface FormState extends LoginCredentials {
  rememberMe: boolean
}

const loading = ref<boolean>(false)
const passwordVisible = ref<boolean>(false)

const formState = reactive<FormState>({
  email: '',
  password: '',
  rememberMe: false,
})

const validationRules: ValidationRules = {
  email: [
    (val: string) => !!val || 'E-mail é obrigatório',
    (val: string) => val.includes('@') || 'E-mail inválido',
  ],
  password: [
    (val: string) => !!val || 'Senha é obrigatória',
    (val: string) => val.length >= 6 || 'A senha deve ter pelo menos 6 caracteres',
  ],
}

const togglePasswordVisibility = (): void => {
  passwordVisible.value = !passwordVisible.value
}

const handleForgotPassword = (): void => {
  console.log('Recuperar senha')
}

const handleRegister = (): void => {
  console.log('Ir para página de registro')
}

const onSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()
  try {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Dados do formulário:', formState)

    $q.notify({
      color: 'positive',
      message: 'Login realizado com sucesso!',
      icon: 'check',
    })
  } catch (error: unknown) {
    $q.notify({
      color: 'negative',
      message: (error as Error)?.message ?? 'Falha ao realizar login',
      icon: 'error',
    })
  }

  loading.value = false
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
