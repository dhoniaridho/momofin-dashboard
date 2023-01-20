import {
  NButton as Button,
  NIcon,
  NSpace,
  NTag,
  NText,
  type DataTableColumns,
} from 'naive-ui'
import { Icon } from '@iconify/vue'
import { STATUS } from '@features/documents/document.constant'
import { useQuery } from '@tanstack/vue-query'
import {
  getAllDocuments,
  getAuditTrail,
} from '@features/documents/document.repository'
import type { DocumentResponse } from '~/features/documents/document.interface'
import Signers from './components/signer.vue'
import { DateTime } from 'luxon'

export function useDocumentFeature() {
  const filter = ref({
    search: '',
    page: 1,
    period: '',
    status: '',
    limit: 20,
  })
  const isShowQuickDetail = ref(false)
  const selectedDocumentId = ref('')

  function useDocuments() {
    return useQuery(['documents', filter], () => {
      return getAllDocuments(filter.value)
    })
  }

  function useAuditTrail() {
    return useQuery(['auditTrail', selectedDocumentId], () => {
      return getAuditTrail(+selectedDocumentId.value)
    })
  }

  const { data: documents, isLoading: isDocumentLoading } = useDocuments()
  const { data: auditTrails, isLoading: isAuditTrailsLoading } = useAuditTrail()

  const createColumns = (): DataTableColumns<DocumentResponse.Datum> => {
    return [
      {
        type: 'expand',
        renderExpand: (rowData) => {
          return h(Signers, {
            signers: rowData.signers,
          })
        },
      },
      {
        title: 'Waktu & Tanggal',
        key: 'created_at',
        sorter: 'default',
        render(rowData) {
          return DateTime.fromJSDate(
            new Date(rowData.created_at)
          ).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY, {
            locale: 'id',
          })
        },
      },
      {
        title: 'ID Dokumen',
        key: 'id',
        sorter: 'default',
      },
      {
        title: 'Email',
        key: 'email',
        sorter: 'default',
      },
      {
        title: 'Nama Dokumen',
        key: 'document_name',
        sorter: 'default',
      },
      {
        title: 'Ukuran Dokumen',
        key: 'file_size',
        sorter: 'default',
      },
      {
        title: 'Pihak',
        key: 'signer_count',
        render: (row) => {
          return h(NSpace, { vertical: true }, () => [
            h(NText, () => `${row.signer_count} Pihak`),

            h(
              NTag,
              {
                type: row.signer_count > 1 ? 'primary' : 'info',
                round: true,
                bordered: false,
              },
              () => (row.signer_count > 1 ? 'Multi Signer' : 'Single')
            ),
          ])
        },
      },
      {
        title: 'Status',
        key: 'status',
        sorter: 'default',

        render: (row) => {
          return h(
            NTag,
            {
              type: STATUS(row.status),
              bordered: false,
              round: true,
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
        title: 'Aksi',
        key: 'action',
        render: (row) => {
          return h(
            Button,
            {
              quaternary: true,
              circle: true,
              onClick() {
                isShowQuickDetail.value = true
                selectedDocumentId.value = row.id.toString()
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

  const data = computed(() => {
    return documents.value?.items.map((item) => {
      return {
        ...item,
        created_at: new Date(item.created_at).toLocaleString(),
      }
    })
  })

  watch(
    computed(() => filter.value.search),
    () => {
      filter.value.page = 1
    }
  )

  return {
    createColumns,
    documents: data,
    auditTrails,
    isAuditTrailsLoading,
    isDocumentLoading,
    filter,
    pagination: computed(() => documents.value?.meta),
    isShowQuickDetail,
  }
}
