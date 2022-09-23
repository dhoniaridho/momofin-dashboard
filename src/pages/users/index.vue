<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { OPTIONS, SORT, STATUS } from '@features/users/users.constant'
  import { toIdr } from '~/helpers'
  import { appConfig } from '~/config/app.config'
  import { useUsersFeature } from '@features/users/users.module'

  const {
    createColumns,
    isDeleting,
    isLoadingUsers,
    isResending,
    isVerifiying,
    onRequestDelete,
    onRequestResend,
    onRequestVerify,
    onSelectDropdown,
    user,
    users,
    pagination,
    filter,
    isShowQuickDetail,
    isShowResend,
    isShowVerificationModal,
    isShowDeleteModal,
  } = useUsersFeature()

  useHead({
    title: `Pengguna - ${appConfig.app.name}`,
  })
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
        <n-space>
          <n-form label-placement="left">
            <n-form-item label="Sort:">
              <n-select
                v-model:value="filter.period"
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
          :data="users"
          :bordered="false"
          :loading="isLoadingUsers"
        />
      </div>
      <n-space justify="start">
        <n-scrollbar x-scrollable style="margin-top: 1rem">
          <n-pagination
            v-model:page="filter.page"
            v-model:page-size="filter.limit"
            :page-count="pagination?.total_page"
            :page-sizes="[10, 20, 30, 40]"
            style="margin-top: 1rem"
            show-size-picker
          />
        </n-scrollbar>
      </n-space>
    </main>
  </n-space>
  <n-modal
    v-model:show="isShowResend"
    preset="card"
    title="Kirim Ulang Link"
    style="max-width: 40rem"
  >
    <n-text> Apakah Anda yakin ingin mengirim ulang email </n-text>
    <template #action>
      <n-space justify="end">
        <n-button tertiary @click="isShowResend = false"> Batalkan </n-button>
        <n-button
          type="primary"
          :loading="isResending"
          @click="onRequestResend"
        >
          Ya, Lanjutkan
        </n-button>
      </n-space>
    </template>
  </n-modal>
  <n-modal
    v-model:show="isShowDeleteModal"
    preset="card"
    title="Hapus Pengguna"
    style="max-width: 40rem"
  >
    <n-text>
      Apakah Anda yakin ingin menghapus data pengguna “{{
        user?.profile?.fullname
      }}” secara permanen dari sistem
    </n-text>
    <template #action>
      <n-space justify="end">
        <n-button tertiary @click="isShowDeleteModal = false">
          Batalkan
        </n-button>
        <n-button type="primary" :loading="isDeleting" @click="onRequestDelete">
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
      Apakah Anda yakin ingin memverifikasi email pengguna “{{
        user?.profile?.fullname
      }}”
    </n-text>
    <template #action>
      <n-space justify="end">
        <n-button tertiary @click="isShowVerificationModal = false">
          Batalkan
        </n-button>
        <n-button
          type="primary"
          :loading="isVerifiying"
          @click="onRequestVerify"
        >
          Ya, Lanjutkan
        </n-button>
      </n-space>
    </template>
  </n-modal>
  <n-modal
    v-model:show="isShowQuickDetail"
    preset="card"
    title="Profil Pengguna"
    style="max-width: 43rem"
  >
    <template #header-extra>
      <n-dropdown
        trigger="click"
        :options="OPTIONS(user?.profile?.account_status ?? 'Registered')"
        @select="onSelectDropdown"
      >
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
      <n-grid cols="1 500:4 900:4" :y-gap="10" item-responsive>
        <n-gi span="2">
          <n-space vertical>
            <n-text strong> {{ user?.profile.fullname }} </n-text>
            <n-text> {{ user?.profile.email }}</n-text>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space vertical>
            <n-text> Status Akun </n-text>
            <n-tag
              round
              :type="STATUS(user?.profile.account_status  as string)"
              :bordered="false"
            >
              <template #icon>
                <n-icon>
                  <Iconify icon="carbon:dot-mark" />
                </n-icon>
              </template>
              {{ user?.profile.account_status }}
            </n-tag>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space vertical>
            <n-text> Status e-KYC </n-text>
            <n-tag
              round
              :type="STATUS(user?.profile.certificate_status as string)"
              :bordered="false"
            >
              <template #icon>
                <n-icon>
                  <Iconify icon="carbon:dot-mark" />
                </n-icon>
              </template>
              {{ user?.profile.certificate_status }}
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

<route lang="yaml">
meta:
  requiresAuth: true
</route>
