<template>
  <Form
    @submit="onSubmit"
    class="q-gutter-md"
    :validation-schema="validationSchema"
    :initial-values="formattedValues"
    for="expense-form"
    data-testid="expense-form"
  >
    <Field
      name="description"
      v-slot="{ field, errorMessage , value}"
    >
      <QInput
        outlined
        v-bind="field"
        :model-value="value"
        label="Descrição"
        :error-message="errorMessage"
        :error="!!errorMessage"
        data-testid="description-input"
        for="description-input"
      />
    </Field>

    <Field
      name="date"
      v-slot="{ field, errorMessage, value }"
    >
      <QInput
        outlined
        v-bind="field"
        label="Data"
        type="date"
        :model-value="value"
        :error-message="errorMessage"
        :error="!!errorMessage"
        :max="new Date().toISOString().split('T')[0]"
        data-testid="date-input"
        for="date-input"
      />
    </Field>

    <Field
      name="amount"
      v-slot="{ field, errorMessage, value }"
    >
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
        data-testid="amount-input"
        for="amount-input"
      />
    </Field>

    <div class="row justify-end q-gutter-sm">
      <QBtn
        label="Cancelar"
        color="grey-6"
        @click="$emit('cancel')"
        data-testid="cancel-button"
      />
      <QBtn
        type="submit"
        :label="isEditing ? 'Salvar' : 'Criar'"
        color="primary"
        :loading="submitting"
        data-testid="submit-button"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { QInput, QBtn } from 'quasar'
import { Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { formatDate } from '@/helpers/formatDate'
import type { ExpenseFormData } from '@/types/expense'

const props = defineProps<{
  initialValues: ExpenseFormData
  isEditing: boolean
  submitting: boolean
}>()

const formattedValues = {
  date: props.initialValues.date ? formatDate(props.initialValues.date, "yyyy-MM-dd") : "",
  amount: (props.initialValues.amount as number | string) === 'number'
    ? (props.initialValues.amount as unknown as number).toString()
    : (props.initialValues.amount as string) || "",
  description: props.initialValues.description || ""
}
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

    amount: z.preprocess(
      (val) => (typeof val === 'string' ? val : String(val)),
      z.string()
        .min(1, 'Valor é obrigatório')
        .refine((val) => !isNaN(Number(val)), 'Valor deve ser um número válido')
        .refine((val) => Number(val) > 0, 'Valor deve ser maior que zero')
        .transform((val) => Number(parseFloat(val).toFixed(2)))
    )
  })
)

const onSubmit = (values: unknown) => {
  const expenseValues = values as ExpenseFormData
  emit('submit', expenseValues)
}
</script>
