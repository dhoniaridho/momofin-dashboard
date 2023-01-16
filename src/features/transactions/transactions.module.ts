import { exportMicrositeTransactions } from './transactions.repository'
import { toIdr } from './../../helpers/currency'
import { NButton as Button, NIcon, NTag, type DataTableColumns } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  exportTransactions,
  getAllMicrositeTransactions,
  getAllTransactions,
  getUserById,
} from '@features/transactions/transactions.repository'
import { STATUS } from '@features/transactions/transactions.constants'
import type { TransactionResponse } from '@features/transactions/transactions.interface'
import {
  exportEcontractTransactionToCSV,
  exportMicrositeTransactionToCSV,
} from './transactions.helper'
import { DateTime } from 'luxon'

export function useTransactionFeature() {
  const filter = ref({
    search: '',
    page: 1,
    period: '',
    status: '',
    limit: 20,
  })

  const filterComputed = computed(() => {
    return {
      limit: filter.value.limit,
      page: filter.value.page,
      search: filter.value.search,
      period: filter.value.period,
    }
  })

  const isShowDeleteModal = ref(false)
  const isShowQuickDetail = ref(false)
  const isShowVerificationModal = ref(false)
  const selectedUUID = ref('')

  function useTransactions() {
    return useQuery(['transactions', filter], () => {
      return getAllTransactions(filterComputed.value)
    })
  }

  function useMicrositeTransactions() {
    return useQuery(['microsite-transactions', filter], () => {
      return getAllMicrositeTransactions(filterComputed.value)
    })
  }

  function useUsersDetail() {
    return useQuery(['users', selectedUUID], () => {
      return getUserById(selectedUUID.value)
    })
  }

  function useExportEcontractTransaction() {
    return useMutation(
      ['downloadEcontractTransactons'],
      () => {
        return exportTransactions(filterComputed.value)
      },
      {
        onSuccess: (data) => {
          exportEcontractTransactionToCSV(data)
        },
      }
    )
  }

  function useExportMicrositeTransaction() {
    return useMutation(
      ['downloadMicrositeTransactons'],
      () => {
        return exportMicrositeTransactions(filterComputed.value)
      },
      {
        onSuccess: (data) => {
          exportMicrositeTransactionToCSV(data)
        },
      }
    )
  }

  const { mutate } = useExportEcontractTransaction()
  const { mutate: exportMicrositeTransaction } = useExportMicrositeTransaction()

  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions()

  const {
    data: micrositeTransaction,
    isLoading: isMicrositeTransactionsLoading,
  } = useMicrositeTransactions()
  const { data: user } = useUsersDetail()

  const createColumns = (): DataTableColumns<TransactionResponse.Datum> => {
    return [
      {
        title: 'Waktu & Tanggal',
        key: 'order_datetime',
        sorter: 'default',
        render(rowData) {
          return DateTime.fromISO(rowData.order_datetime).toLocaleString(
            DateTime.DATETIME_MED_WITH_WEEKDAY,
            {
              locale: 'id',
            }
          )
        },
      },
      {
        title: 'ID Transaksi',
        key: 'invoice_code',
        sorter: 'default',
      },
      {
        title: 'ID Dokumen',
        key: 'documentId',
        sorter: 'default',
        className: 'documentId',
        render(rowData) {
          return rowData.document_id ?? '-'
        },
      },
      {
        title: 'Email',
        key: 'buyer_email',
        sorter: 'default',
      },
      {
        title: 'Product',
        key: 'product_name',
        sorter: 'default',
      },
      {
        title: 'Value',
        key: 'total_price',
        sorter: 'default',
        render: (data) => {
          return toIdr(+data.total_price)
        },
      },
      {
        title: 'Source',
        key: 'type',
        sorter: 'default',
        render: (data) => {
          return data?.type
        },
      },
      {
        title: 'Payment Status',
        key: 'status',
        sorter: 'default',

        render: (row) => {
          return h(
            NTag,
            {
              type: STATUS(row.status),
              round: true,
              bordered: false,
            },
            {
              icon: () =>
                h(NIcon, () =>
                  h(Icon, {
                    icon: 'carbon:dot-mark',
                  })
                ),
              default: () => [row.status],
            }
          )
        },
      },

      {
        key: 'action',
        className: 'action',
        title: 'Aksi',
        render: (row) => {
          if (!row.buyer_user_id) return
          return h(
            Button,
            {
              quaternary: true,
              circle: true,
              onClick() {
                selectedUUID.value = row.buyer_user_id
                isShowQuickDetail.value = true
              },
            },
            () => {
              return h(Icon, {
                icon: 'heroicons:eye',
              })
            }
          )
        },
      },
    ]
  }

  const onSelectDropdown = (ev: string) => {
    switch (ev) {
      case 'delete':
        isShowDeleteModal.value = true
        break
      case 'verification':
        isShowVerificationModal.value = true
        break

      default:
        break
    }
  }

  const onExportData = (type: 'EMET' | 'MICROSITE') => {
    if (type === 'EMET') return mutate()
    return exportMicrositeTransaction()
  }

  const data = computed(() => {
    return transactions.value?.items.map((transaction) => {
      return {
        ...transaction,
        status: transaction.status.toLowerCase(),
      }
    })
  })

  return {
    createColumns,
    transactionsEmet: computed(() => data.value),
    transactionsMicrosite: computed(() => micrositeTransaction.value?.items),
    user,
    onSelectDropdown,
    filter,
    isTransactionsLoading,
    isShowQuickDetail,
    emetTransactionPagination: computed(() => transactions.value?.meta),
    micrositeTransactionPagination: computed(
      () => micrositeTransaction.value?.meta
    ),
    onExportData,
    isMicrositeTransactionsLoading,
  }
}
