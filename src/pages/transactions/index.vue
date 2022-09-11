<script setup lang="ts">
  import {
    NButton as Button,
    NIcon,
    NTag,
    type DataTableColumns,
  } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { OPTIONS } from '@features/users/users.constant'
  import { useQuery } from 'vue-query'
  import { getAllTransactions } from '@features/transactions/transaction.repository'

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

  function useTransactions() {
    return useQuery(['transactions', filter], () => {
      return getAllTransactions(filter.value)
    })
  }

  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions()

  const createColumns = (): DataTableColumns<any> => {
    return [
      {
        title: 'Waktu & Tanggal',
        key: 'order_datetime',
      },
      {
        title: 'ID Transaksi',
        key: 'invoice_code',
      },
      {
        title: 'Email',
        key: 'buyer_email',
      },
      {
        title: 'Product',
        key: 'product_name',
      },
      {
        title: 'Value',
        key: 'total_price',
      },
      {
        title: 'Payment Status',
        key: 'status',
        render: (row) => {
          if (row.status == 'PAID') {
            return h(
              NTag,
              {
                type: 'primary',
              },
              () => [
                h(NIcon, () =>
                  h(Icon, {
                    icon: 'carbon:dot-mark',
                  })
                ),
                row.status,
              ]
            )
          }
          if (row.status == 'EXPIRED') {
            return h(NTag, () => [
              h(NIcon, () =>
                h(Icon, {
                  icon: 'carbon:dot-mark',
                })
              ),
              row.status,
            ])
          }
          if (row.status == 'PENDING') {
            return h(NTag, { type: 'warning' }, () => [
              h(NIcon, () =>
                h(Icon, {
                  icon: 'carbon:dot-mark',
                })
              ),
              row.status,
            ])
          }
          return h(
            NTag,
            {
              type: 'info',
            },
            () => [
              h(NIcon, () =>
                h(Icon, {
                  icon: 'carbon:dot-mark',
                })
              ),
              row.status,
            ]
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
        status: transaction.status.toUpperCase(),
      }
    })
  })
</script>

<template>
  <n-space vertical style="gap: 1rem">
    <n-page-header>
      <template #title> Transaksi </template>
    </n-page-header>
    <main>
      <n-space justify="space-between" style="margin: 2rem 0; width: 100%">
        <n-input v-model:value="filter.search" placeholder="Cari Transaksi">
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
          :loading="isTransactionsLoading"
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
