import { NButton as Button, NIcon, NTag, type DataTableColumns } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useQuery } from 'vue-query'
import {
  getAllTransactions,
  getUserById,
} from '@features/transactions/transactions.repository'
import { STATUS } from '@features/transactions/transactions.constants'
import type { TransactionResponse } from '@features/transactions/transactions.interface'

export function useTransactionFeature() {
  const filter = ref({
    search: '',
    page: 1,
    period: '',
    status: '',
    limit: 10,
  })

  const filterComputed = computed(() => {
    return {
      limit: filter.value.limit,
      page: filter.value.page,
      start_date: filter.value.period[0],
      end_date: filter.value.period[1],
      search: filter.value.search,
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

  function useUsersDetail() {
    return useQuery(['users', selectedUUID], () => {
      return getUserById(selectedUUID.value)
    })
  }

  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions()
  const { data: user } = useUsersDetail()

  const createColumns = (): DataTableColumns<TransactionResponse.Datum> => {
    return [
      {
        title: 'Waktu & Tanggal',
        key: 'order_datetime',
        sorter: 'default',
      },
      {
        title: 'ID Transaksi',
        key: 'invoice_code',
        sorter: 'default',
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
        title: 'Aksi',
        render: (row) => {
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

  const data = computed(() => {
    return transactions.value?.data.map((transaction) => {
      return {
        ...transaction,
        status: transaction.status.toLowerCase(),
      }
    })
  })

  return {
    createColumns,
    transactions: computed(() => data.value),
    user,
    onSelectDropdown,
    filter,
    isTransactionsLoading,
    isShowQuickDetail,
    pagination: computed(() => transactions.value?.pagination),
  }
}
