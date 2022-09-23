<script setup lang="ts">
  import {
    NButton as Button,
    NIcon,
    NSpace,
    NTag,
    NText,
    type DataTableColumns,
  } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { SORT, STATUS } from '@features/documents/document.constant'
  import { useQuery } from 'vue-query'
  import {
    getAllDocuments,
    getAuditTrail,
  } from '@features/documents/document.repository'
  import type { DocumentResponse } from '~/features/documents/document.interface'
  import { appConfig } from '~/config/app.config'

  const filter = ref({
    search: '',
    page: 1,
    periode: 'Last 7 days',
    status: '',
    limit: 10,
  })
  const isShowQuickDetail = ref(false)
  const selectedDocumentId = ref(0)

  function useDocuments() {
    return useQuery(['documents', filter], () => {
      return getAllDocuments(filter.value)
    })
  }

  function useAuditTrail() {
    return useQuery(['auditTrail', selectedDocumentId], () => {
      return getAuditTrail(selectedDocumentId.value)
    })
  }

  const { data: documents, isLoading: isDocumentLoading } = useDocuments()
  const { data: auditTrails } = useAuditTrail()

  const createColumns = (): DataTableColumns<DocumentResponse.Datum> => {
    return [
      {
        title: 'Waktu & Tanggal',
        key: 'created_at',
      },
      {
        title: 'ID Dokumen',
        key: 'id',
      },
      {
        title: 'Email',
        key: 'email',
      },
      {
        title: 'Nama Dokumen',
        key: 'document_name',
      },
      {
        title: 'Pihak',
        key: 'signers.length',
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
                selectedDocumentId.value = row.id
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
    return documents.value?.data.map((item) => {
      return {
        ...item,
        created_at: new Date(item.created_at).toLocaleString(),
      }
    })
  })

  useHead({
    title: `Dokumen - ${appConfig.app.name}`,
  })
</script>

<template>
  <n-space vertical style="gap: 1rem">
    <n-page-header>
      <template #title> Dokumen </template>
    </n-page-header>
    <main>
      <n-space justify="space-between" style="margin: 2rem 0; width: 100%">
        <n-input v-model:value="filter.search" placeholder="Cari Dokumen">
          <template #prefix>
            <n-icon>
              <Icon icon="carbon:search" />
            </n-icon>
          </template>
        </n-input>
        <n-space>
          <n-form label-placement="left">
            <n-form-item label="Sort:">
              <n-select
                v-model:value="filter.periode"
                style="width: 15rem"
                :options="SORT"
              />
            </n-form-item>
          </n-form>
        </n-space>
      </n-space>
      <div style="overflow: auto; white-space: pre">
        <n-data-table
          :columns="createColumns()"
          :data="data"
          :bordered="false"
          :loading="isDocumentLoading"
        />
      </div>
      <n-space justify="start">
        <n-scrollbar x-scrollable style="margin-top: 1rem">
          <n-pagination
            v-model:page="filter.page"
            v-model:page-size="filter.limit"
            :page-count="documents?.pagination.total_page"
            :page-sizes="[10, 20, 30, 40]"
            style="margin-top: 1rem"
            show-size-picker
          />
        </n-scrollbar>
      </n-space>
    </main>
  </n-space>
  <n-modal
    v-model:show="isShowQuickDetail"
    preset="card"
    title="Auditrail"
    style="max-width: 40rem"
  >
    <n-timeline>
      <n-timeline-item
        v-for="(activity, index) in auditTrails"
        :key="index"
        type="success"
      >
        <n-card :title="activity.name" :bordered="false">
          <n-table bottom-bordered :bordered="false" :striped="true">
            <tr>
              <td style="width: 20%">IP Address</td>
              <td>{{ activity.ip_address }}</td>
            </tr>
            <tr>
              <td style="width: 20%">Tipe</td>
              <td>
                <n-tag type="info">
                  {{ activity.type }}
                </n-tag>
              </td>
            </tr>
            <tr>
              <td style="width: 20%">Catatan</td>
              <td>{{ activity.description }}</td>
            </tr>
            <tr>
              <td style="width: 20%">Tanggal & Waktu</td>
              <td>
                {{ activity.datetime }}
              </td>
            </tr>
          </n-table>
        </n-card>
      </n-timeline-item>
    </n-timeline>
  </n-modal>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
