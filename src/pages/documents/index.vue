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
  import { SORT } from '@features/documents/document.constant'
  import { useQuery } from 'vue-query'
  import { getAllDocuments } from '~/features/documents/document.repository'
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

  function useDocuments() {
    return useQuery(['documents', filter], () => {
      return getAllDocuments(filter.value)
    })
  }

  const { data: documents, isLoading: isDocumentLoading } = useDocuments()

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
            h(NText, () => row.signer_count),

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
          if (row.status == 'completed') {
            return h(
              NTag,
              { round: true, bordered: false, type: 'success' },
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
          }
          if (row.status == 'processing') {
            return h(
              NTag,
              { round: true, bordered: false },
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
          }
          if (row.status == 'draft') {
            return h(
              NTag,
              { round: true, type: 'warning', bordered: false },
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
          }
          return h(
            NTag,
            {
              type: 'info',
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
        render: () => {
          return h(
            Button,
            {
              quaternary: true,
              circle: true,
              onClick() {
                isShowQuickDetail.value = true
              },
            },
            () => {
              return h(Icon, {
                icon: 'heroicons:chevron-right',
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

  const activities = [
    {
      actor: 'Yureka is my name',
      ip: '139.194.155.147',
      type: 'open',
      notes: 'Yureka is my name (yuretech@gmail.com) membuka dokumen',
      datetime: '26 Agt 2022 - 15:43',
    },
    {
      actor: 'Yureka is my name',
      ip: '139.194.155.147',
      type: 'open',
      notes: 'Yureka is my name (yuretech@gmail.com) membuka dokumen',
      datetime: '26 Agt 2022 - 15:43',
    },
    {
      actor: 'Yureka is my name',
      ip: '139.194.155.147',
      type: 'open',
      notes: 'Yureka is my name (yuretech@gmail.com) membuka dokumen',
      datetime: '26 Agt 2022 - 15:43',
    },
    {
      actor: 'Yureka is my name',
      ip: '139.194.155.147',
      type: 'signing',
      notes: 'Yureka is my name (yuretech@gmail.com) menandatangani dokumen',
      datetime: '26 Agt 2022 - 15:43',
    },
    {
      actor: 'Yureka is my name',
      ip: '139.194.155.147',
      type: 'send',
      notes:
        'Yureka is my name (yuretech@gmail.com) mengundang Yureka is my name  &  kulo admin   untuk menandatangani dokumen',
      datetime: '26 Agt 2022 - 15:42',
    },
    {
      actor: 'Yureka is my name',
      ip: '139.194.155.147',
      type: 'upload',
      notes: 'Yureka is my name (yuretech@gmail.com) mengupload dokumen',
      datetime: '26 Agt 2022 - 15:42',
    },
  ]

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
          <n-select
            v-model:value="filter.periode"
            style="width: 15rem"
            :options="SORT"
          />
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
        <n-pagination
          v-model:page="filter.page"
          v-model:page-size="filter.limit"
          :page-count="documents?.pagination.total_page"
          :page-sizes="[10, 20, 30, 40]"
          style="margin-top: 1rem"
          show-size-picker
        />
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
        v-for="(activity, index) in activities"
        :key="index"
        type="success"
        :time="activity.datetime"
      >
        <n-card :title="activity.actor">
          <n-table :striped="true">
            <tr>
              <td style="width: 20%">IP Address</td>
              <td>{{ activity.ip }}</td>
            </tr>
            <tr>
              <td style="width: 20%">Tipe</td>
              <td>
                <n-tag
                  v-if="activity.type == 'open' || activity.type == 'upload'"
                  type="default"
                >
                  {{ activity.type }}
                </n-tag>
                <n-tag v-else-if="activity.type == 'finished'" type="success">
                  {{ activity.type }}
                </n-tag>
                <n-tag v-else type="info">
                  {{ activity.type }}
                </n-tag>
              </td>
            </tr>
            <tr>
              <td style="width: 20%">Catatan</td>
              <td>{{ activity.notes }}</td>
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
