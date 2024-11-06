<template>
  <Form
    @submit="onSubmit"
    class="q-gutter-md"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
  >
    <Field name="description" v-slot="{ field, errorMessage , value}">
      <QInput
        outlined
        v-bind="field"
        :model-value="value"
        label="Descrição"
        :error-message="errorMessage"
        :error="!!errorMessage"
      />
    </Field>

    <Field name="date" v-slot="{ field, errorMessage, value }">
      <QInput
        outlined
        v-bind="field"
        label="Data"
        type="date"
        :model-value="value"
        :error-message="errorMessage"
        :error="!!errorMessage"
      />
    </Field>

    <Field name="value" v-slot="{ field, errorMessage, value }">
      <QInput
        outlined
        v-bind="field"
        label="Valor"
        :model-value="value"
        type="number"
        step="0.01"
        prefix="R$"
        :error-message="errorMessage"
        :error="!!errorMessage"
      />
    </Field>

    <div class="row justify-end q-gutter-sm">
      <QBtn label="Cancelar" color="grey-6" @click="$emit('cancel')" />
      <QBtn
        type="submit"
        :label="isEditing ? 'Salvar' : 'Criar'"
        color="primary"
        :loading="submitting"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { QInput, QBtn } from 'quasar'
import { Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { ExpenseFormData } from '@/types/expense'

defineProps<{
  initialValues: ExpenseFormData
  isEditing: boolean
  submitting: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', values: ExpenseFormData): void
  (e: 'cancel'): void
}>()

const validationSchema = toTypedSchema(
  z.object({
    description: z.string()
      .min(3, 'Descrição deve ter no mínimo 3 caracteres')
      .max(191, 'Descrição deve ter no máximo 191 caracteres'),

    date: z.string().min(1, 'Data é obrigatória'),
    value: z.string().min(1, 'Valor é obrigatório').transform(Number)
  })
)

const onSubmit = (values: ExpenseFormData) => {
  emit('submit', values)
}
</script>
