<script setup lang="ts">
  import { appConfig } from '~/config/app.config'
  import {
    getKycStatus,
    STATUS,
  } from '@features/transactions/transactions.constants'
  import { useTransactionFeature } from '@features/transactions/transactions.module'
  import { toIdr } from '~/helpers'

  const {
    createColumns,
    transactionsEmet,
    user,
    filter,
    isShowQuickDetail,
    isTransactionsLoading,
    emetTransactionPagination,
    micrositeTransactionPagination,
    onExportData,
    transactionsMicrosite,
    isMicrositeTransactionsLoading,
  } = useTransactionFeature()

  const activeTab = ref<'MICROSITE' | 'EMET'>('EMET')

  useHead({
    title: `Transaksi - ${appConfig.app.name}`,
  })
</script>

<template>
  <n-space vertical :wrap-item="false">
    <n-page-header>
      <template #title> Transaksi </template>
    </n-page-header>
    <n-space justify="end" style="margin: 2rem 0" :wrap-item="false">
      <div class="filter__search">
        <n-button @click="onExportData(activeTab)"> Export </n-button>
      </div>
      <div class="filter__search">
        <n-input v-model:value="filter.search" placeholder="Cari Transaksi">
          <template #prefix>
            <n-icon>
              <Icon icon="carbon:search" />
            </n-icon>
          </template>
        </n-input>
      </div>
      <div class="filter__search">
        <m-datatable-filter v-model="filter.period" />
      </div>
    </n-space>
    <n-spin :show="isTransactionsLoading || isMicrositeTransactionsLoading">
      <n-tabs v-model:value="activeTab">
        <n-tab-pane name="EMET" tab="EMET">
          <main>
            <div style="overflow: auto; white-space: pre">
              <n-data-table
                :columns="
                  createColumns().filter(
                    (item) => item.className !== 'documentId'
                  )
                "
                :data="transactionsEmet"
                :loading="isTransactionsLoading"
                :bordered="false"
              />
            </div>
            <n-space justify="start">
              <n-scrollbar x-scrollable style="margin-top: 1rem">
                <n-pagination
                  v-model:page="filter.page"
                  v-model:page-size="filter.limit"
                  :page-count="emetTransactionPagination?.totalPages"
                  :page-sizes="[10, 20, 30, 40]"
                  style="margin-top: 1rem"
                  show-size-picker
                />
              </n-scrollbar>
            </n-space>
          </main>
        </n-tab-pane>
        <n-tab-pane name="MICROSITE" tab="Microsite">
          <main>
            <div style="overflow: auto; white-space: pre">
              <n-data-table
                :columns="
                  createColumns().filter((item) => item.className !== 'action')
                "
                :data="transactionsMicrosite"
                :loading="isMicrositeTransactionsLoading"
                :bordered="false"
              />
            </div>
            <n-space justify="start">
              <n-scrollbar x-scrollable style="margin-top: 1rem">
                <n-pagination
                  v-model:page="filter.page"
                  v-model:page-size="filter.limit"
                  :page-count="micrositeTransactionPagination?.totalPages"
                  :page-sizes="[10, 20, 30, 40]"
                  style="margin-top: 1rem"
                  show-size-picker
                />
              </n-scrollbar>
            </n-space>
          </main>
        </n-tab-pane>
      </n-tabs>
    </n-spin>
  </n-space>
  <n-modal
    v-model:show="isShowQuickDetail"
    preset="card"
    title="Profil Pengguna"
    style="max-width: 40rem"
  >
    <n-space v-if="user" vertical>
      <n-grid cols="1 500:4 900:4" :y-gap="10" item-responsive>
        <n-gi span="2">
          <n-space vertical>
            <n-text strong> {{ user?.profile?.fullname }} </n-text>
            <n-text> {{ user?.profile?.email }}</n-text>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space vertical>
            <n-text> Status Akun </n-text>
            <n-tag
              round
              :type="STATUS(user?.profile?.account_status  as string)"
              :bordered="false"
            >
              <template #icon>
                <n-icon>
                  <Iconify icon="carbon:dot-mark" />
                </n-icon>
              </template>
              {{ user?.profile?.account_status }}
            </n-tag>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space vertical>
            <n-text> Status e-KYC </n-text>
            <n-tag
              round
              :type="getKycStatus(user?.profile?.certificate_status ?? '').type as any"
              :bordered="false"
            >
              <template #icon>
                <n-icon>
                  <Iconify icon="carbon:dot-mark" />
                </n-icon>
              </template>
              {{ getKycStatus(user?.profile.certificate_status ?? '').text }}
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
              <n-text strong> {{ user?.balance.emet }} </n-text>
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
              <n-text strong> {{ user?.balance.esgn }} </n-text>
            </n-space>
          </n-space>
        </n-card>
      </n-space>
      <n-table striped :bordered="false">
        <tr>
          <td style="width: 50%">Nomor telepon</td>
          <td style="width: 50%">{{ user?.profile.phone_number }}</td>
        </tr>
        <tr>
          <td>Tanggal sertifikat terbit</td>
          <td>{{ user?.profile.certificate_issued_at }}</td>
        </tr>
        <tr>
          <td>Tanggal sertifikat kadaluarsa</td>
          <td>{{ user?.profile.certificate_expired_at }}</td>
        </tr>
        <tr>
          <td>N dokumen sukses</td>
          <td>{{ user?.document.completed }}</td>
        </tr>
        <tr>
          <td>N dokumen dalam proses</td>
          <td>{{ user?.document.processing }}</td>
        </tr>
        <tr>
          <td>N top-up</td>
          <td>{{ user?.topup.count }}</td>
        </tr>
        <tr>
          <td>Total top-up value</td>
          <td>{{ toIdr(user?.topup.amount ?? 0) }}</td>
        </tr>
      </n-table>
    </n-space>
  </n-modal>
</template>

<style scoped lang="postcss">
  .filter__search {
    @apply w-full md:w-fit;
  }
</style>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
