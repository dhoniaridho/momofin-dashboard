<script setup lang="tsx">
  import {
    NButton as Button,
    NDropdown,
    NIcon,
    NSpace as Flex,
    NTag,
    type DataTableColumns,
  } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { OPTIONS } from '@features/users/users.constant'

  const filter = ref({
    search: '',
    page: 1,
    periode: '',
    type: 'in',
    status: '',
    limit: 10,
  })
  const isShowDeleteModal = ref(false)

  const createColumns = (): DataTableColumns<any> => {
    return [
      {
        title: 'Tanggal Registrasi',
        key: 'created_at',
      },
      {
        title: 'Nama Lengkap',
        key: 'name',
      },
      {
        title: 'Email',
        key: 'email',
      },
      {
        title: 'Status Akun',
        key: 'status',
        render: (row) => {
          if (row.status == 'verified') {
            return (
              <NTag bordered={false} type="success" round>
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
              </NTag>
            )
          }
          if (row.status == 'suspended') {
            return (
              <NTag bordered={false} type="default" round>
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
              </NTag>
            )
          }
          return (
            <NTag bordered={false} type="info" round>
              {{
                icon: () => {
                  return (
                    <NIcon>
                      <Icon icon="carbon:dot-mark" />
                    </NIcon>
                  )
                },
                default: () => row.kyc,
              }}
            </NTag>
          )
        },
      },
      {
        title: 'Status e-KYC',
        key: 'kyc',
        render: (row) => {
          if (row.kyc == 'Aktif') {
            return (
              <NTag bordered={false} type="success" round>
                {{
                  icon: () => {
                    return (
                      <NIcon>
                        <Icon icon="carbon:dot-mark" />
                      </NIcon>
                    )
                  },
                  default: () => row.kyc,
                }}
              </NTag>
            )
          }
          if (row.kyc == 'Ditolak') {
            return (
              <NTag bordered={false} type="default" round>
                {{
                  icon: () => {
                    return (
                      <NIcon>
                        <Icon icon="carbon:dot-mark" />
                      </NIcon>
                    )
                  },
                  default: () => row.kyc,
                }}
              </NTag>
            )
          }
          return (
            <NTag bordered={false} type="warning" round>
              {{
                icon: () => {
                  return (
                    <NIcon>
                      <Icon icon="carbon:dot-mark" />
                    </NIcon>
                  )
                },
                default: () => row.kyc,
              }}
            </NTag>
          )
        },
      },
      {
        key: 'action',
        render: () => {
          return (
            <Flex>
              <Button quaternary circle>
                {{
                  icon: () => {
                    return (
                      <NIcon>
                        <Icon icon="akar-icons:eye" />
                      </NIcon>
                    )
                  },
                }}
              </Button>
              <NDropdown
                trigger="click"
                options={OPTIONS}
                onSelect={onSelectDropdown}
              >
                <Button quaternary circle>
                  {{
                    icon: () => {
                      return (
                        <NIcon>
                          <Icon icon="carbon:overflow-menu-horizontal" />
                        </NIcon>
                      )
                    },
                  }}
                </Button>
              </NDropdown>
            </Flex>
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

      default:
        break
    }
  }

  const data = [
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'verified',
      kyc: 'Aktif',
    },
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'registered',
      kyc: 'Ditolak',
    },
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'verified',
      kyc: 'Expired ',
    },
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'suspended',
      kyc: 'Ditolak',
    },
  ]
</script>

<template>
  <n-space vertical style="gap: 1rem">
    <n-page-header>
      <template #title> Pengguna </template>
      <template #header>
        <n-breadcrumb>
          <n-breadcrumb-item>Pengguna</n-breadcrumb-item>
        </n-breadcrumb>
      </template>
    </n-page-header>
    <main>
      <n-space justify="start" style="margin: 2rem 0">
        <n-input v-model:value="filter.search" placeholder="Cari Pengguna">
          <template #prefix>
            <n-icon>
              <Icon icon="carbon:search" />
            </n-icon>
          </template>
        </n-input>
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
    v-model:show="isShowDeleteModal"
    preset="card"
    title="Hapus Pengguna"
    style="max-width: 40rem"
  >
    <n-text>
      Apakah Anda yakin ingin menghapus data pengguna “Dianne Russell” secara
      permanen dari sistem
    </n-text>
    <template #action>
      <n-space justify="end">
        <n-button tertiary> Batalkan </n-button>
        <n-button type="primary"> Ya, Lanjutkan </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
