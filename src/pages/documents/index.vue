<script setup lang="tsx">
  import {
    NButton as Button,
    NIcon,
    NSpace as Flex,
    NTag as Tag,
    NText as Text,
    type DataTableColumns,
  } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { SORT } from '@features/documents/document.constant'

  const filter = ref({
    search: '',
    page: 1,
    periode: 'Last 7 days',
    type: 'in',
    status: '',
    limit: 10,
  })
  const isShowQuickDetail = ref(false)

  const createColumns = (): DataTableColumns<any> => {
    return [
      {
        title: 'Waktu & Tanggal',
        key: 'created_at',
      },
      {
        title: 'ID Dokumen',
        key: 'name',
      },
      {
        title: 'Email',
        key: 'email',
      },
      {
        title: 'Nama Dokumen',
        key: 'document.name',
      },
      {
        title: 'Pihak',
        key: 'signers.length',
        render: (row) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{row.signers.length} Pihak</span>
              <Text type="primary">Single</Text>
            </div>
          )
        },
      },
      {
        title: 'Status',
        key: 'status',
        render: (row) => {
          if (row.status == 'Paid') {
            return (
              <Tag bordered={false} type="success" round>
                {{
                  icon: () => {
                    return (
                      <NIcon>
                        <Icon icon="carbon:dot-mark" />
                      </NIcon>
                    )
                  },
                  default: () => row.status,
                }}
              </Tag>
            )
          }
          if (row.status == 'Cancelled') {
            return (
              <Tag bordered={false} type="default" round>
                {{
                  icon: () => {
                    return (
                      <NIcon>
                        <Icon icon="carbon:dot-mark" />
                      </NIcon>
                    )
                  },
                  default: () => row.status,
                }}
              </Tag>
            )
          }
          return (
            <Tag bordered={false} type="info" round>
              {{
                icon: () => {
                  return (
                    <NIcon>
                      <Icon icon="carbon:dot-mark" />
                    </NIcon>
                  )
                },
                default: () => row.status,
              }}
            </Tag>
          )
        },
      },

      {
        key: 'action',
        render: () => {
          return (
            <Flex>
              <Button
                quaternary
                circle
                onClick={() => {
                  isShowQuickDetail.value = true
                }}
              >
                {{
                  icon: () => {
                    return (
                      <NIcon>
                        <Icon icon="heroicons:chevron-right" />
                      </NIcon>
                    )
                  },
                }}
              </Button>
            </Flex>
          )
        },
      },
    ]
  }

  const data = [
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'Paid',
      product: 'EMET 5',
      document: {
        name: '*****lus.pdf 58,2 KB',
      },
      signers: [
        {
          user: {
            name: '',
          },
        },
      ],
    },
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'Cancelled',
      product: 'EMET 5',
      document: {
        name: '*****lus.pdf 58,2 KB',
      },
      signers: [
        {
          user: {
            name: '',
          },
        },
      ],
    },
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'Pending',
      product: 'EMET 5',
      document: {
        name: '*****lus.pdf 58,2 KB',
      },
      signers: [
        {
          user: {
            name: '',
          },
        },
      ],
    },
  ]

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
        />
      </div>
      <n-space justify="start">
        <n-pagination
          v-model:page="filter.page"
          v-model:page-size="filter.limit"
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
