import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: string, dateFormat = 'dd/MM/yyyy') => {
  return format(new Date(date), dateFormat, { locale: ptBR })
}
