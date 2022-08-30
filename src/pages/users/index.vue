<script setup lang="tsx">
  import {
    NButton as Button,
    NDropdown as DropDown,
    NIcon,
    NSpace as Flex,
    NTag,
    useMessage,
    type DataTableColumns,
  } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { OPTIONS } from '@features/users/users.constant'

  const { success } = useMessage()

  const filter = ref({
    search: '',
    page: 1,
    periode: 0,
    type: 'in',
    status: '',
    limit: 10,
  })
  const isShowDeleteModal = ref(false)
  const isShowQuickDetail = ref(false)
  const isShowVerificationModal = ref(false)

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
                        <Icon icon="akar-icons:eye" />
                      </NIcon>
                    )
                  },
                }}
              </Button>
              <DropDown
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
              </DropDown>
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
      case 'verification':
        isShowVerificationModal.value = true
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

  const onRequestResend = () => {
    success('Berhasil memverifikasi pengguna')
    isShowQuickDetail.value = false
  }

  const onRequestVerify = () => {
    success('Berhasil memverifikasi pengguna')
    isShowVerificationModal.value = false
  }
</script>

<template>
  <n-space vertical style="gap: 1rem">
    <n-page-header>
      <template #title> Pengguna </template>
    </n-page-header>
    <main>
      <n-space justify="space-between" style="margin: 2rem 0; width: 100%">
        <n-input v-model:value="filter.search" placeholder="Cari Pengguna">
          <template #prefix>
            <n-icon>
              <Icon icon="carbon:search" />
            </n-icon>
          </template>
        </n-input>
        <div>
          <n-date-picker v-model:value="filter.periode" type="daterange" />
        </div>
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
        <n-button tertiary @click="isShowDeleteModal = false">
          Batalkan
        </n-button>
        <n-button type="primary" @click="onRequestResend">
          Ya, Lanjutkan
        </n-button>
      </n-space>
    </template>
  </n-modal>
  <n-modal
    v-model:show="isShowVerificationModal"
    preset="card"
    title="Verifikasi Email Pengguna"
    style="max-width: 40rem"
  >
    <n-text>
      Apakah Anda yakin ingin memverifikasi email pengguna “Dianne Russell”
    </n-text>
    <template #action>
      <n-space justify="end">
        <n-button tertiary @click="isShowVerificationModal = false">
          Batalkan
        </n-button>
        <n-button type="primary" @click="onRequestVerify">
          Ya, Lanjutkan
        </n-button>
      </n-space>
    </template>
  </n-modal>
  <n-modal
    v-model:show="isShowQuickDetail"
    preset="card"
    title="Profil Pengguna"
    style="max-width: 40rem"
  >
    <template #header-extra>
      <n-dropdown trigger="click" :options="OPTIONS" @select="onSelectDropdown">
        <n-button quaternary circle>
          <template #icon>
            <n-icon>
              <Iconify icon="carbon:overflow-menu-horizontal" />
            </n-icon>
          </template>
        </n-button>
      </n-dropdown>
    </template>
    <n-space vertical>
      <n-grid :cols="3">
        <n-gi>
          <n-space vertical>
            <n-text strong> Annette Black </n-text>
            <n-text> annette@mail.com</n-text>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space vertical>
            <n-text> Status Akun </n-text>
            <n-tag type="success" :bordered="false">
              <template #icon>
                <n-icon>
                  <Iconify icon="carbon:dot-mark" />
                </n-icon>
              </template>
              Verified
            </n-tag>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space vertical>
            <n-text> Status e-KYC </n-text>
            <n-tag type="success" :bordered="false">
              <template #icon>
                <n-icon>
                  <Iconify icon="carbon:dot-mark" />
                </n-icon>
              </template>
              Verified
            </n-tag>
          </n-space>
        </n-gi>
      </n-grid>
      <n-space style="width: 100%" item-style="flex: 1">
        <n-card>
          <n-space>
            <n-icon size="50">
              <Icons name="emet" />
            </n-icon>
            <n-space vertical>
              <n-text> EMET </n-text>
              <n-text strong> 25 </n-text>
            </n-space>
          </n-space>
        </n-card>
        <n-card>
          <n-space>
            <n-icon size="50">
              <Icons name="esign" />
            </n-icon>
            <n-space vertical>
              <n-text> ESGN </n-text>
              <n-text strong> 89 </n-text>
            </n-space>
          </n-space>
        </n-card>
      </n-space>
      <n-table striped :bordered="false">
        <tr>
          <td style="width: 50%">Nomor telepon</td>
          <td style="width: 50%">087834806924</td>
        </tr>
        <tr>
          <td>Tanggal sertifikat terbit</td>
          <td>25 Agustus 2022</td>
        </tr>
        <tr>
          <td>Tanggal sertifikat kadaluarsa</td>
          <td>18 Oktober 2023</td>
        </tr>
        <tr>
          <td>N dokumen sukses</td>
          <td>228</td>
        </tr>
        <tr>
          <td>N dokumen dalam proses</td>
          <td>376</td>
        </tr>
        <tr>
          <td>N top-up</td>
          <td>594</td>
        </tr>
        <tr>
          <td>Total top-up value</td>
          <td>Rp 1,890,000.00</td>
        </tr>
      </n-table>
    </n-space>
  </n-modal>
</template>
