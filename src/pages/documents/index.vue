<script setup lang="ts">
  import { appConfig } from '~/config/app.config'
  import { useDocumentFeature } from '~/features/documents/documents.module'

  const {
    auditTrails,
    isAuditTrailsLoading,
    createColumns,
    documents,
    filter,
    isDocumentLoading,
    isShowQuickDetail,
    pagination,
  } = useDocumentFeature()

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
      <n-space
        justify="space-between"
        style="margin: 2rem 0"
        :wrap-item="false"
      >
        <div class="filter__search">
          <n-input v-model:value="filter.search" placeholder="Cari Dokumen">
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
      <div style="overflow: auto; white-space: pre">
        <n-data-table
          :row-key="(row) => row.id"
          :columns="createColumns()"
          :data="documents"
          :bordered="false"
          :loading="isDocumentLoading"
        />
      </div>
      <n-space justify="start">
        <n-scrollbar x-scrollable style="margin-top: 1rem">
          <n-pagination
            v-model:page="filter.page"
            v-model:page-size="filter.limit"
            :page-count="pagination?.totalPages"
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
    <n-space v-if="isAuditTrailsLoading" align="center">
      <n-spin size="large" />
    </n-space>
    <n-timeline v-else>
      <n-timeline-item
        v-for="(activity, index) in auditTrails"
        :key="index"
        type="success"
      >
        <n-card :title="activity.name" :bordered="false">
          <n-table bottom-bordered :bordered="false" :striped="true">
            <tr>
              <td style="width: 20%">IP Address</td>
              <td>{{ activity.ipAddress }}</td>
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
                {{ activity.dateTime }}
              </td>
            </tr>
          </n-table>
        </n-card>
      </n-timeline-item>
    </n-timeline>
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
