<script setup lang="ts">
  import {
    NButton as Button,
    NIcon,
    NSpace as Flex,
    type DataTableColumns,
  } from 'naive-ui'
  import { Icon } from '@iconify/vue'

  const filter = ref({
    search: '',
    page: 1,
    periode: 0,
    type: 'in',
    status: '',
    limit: 10,
  })
  const isShowQuickDetail = ref(false)
  const isShowCreateUser = ref(false)

  const formCreateUser = ref({
    firstName: '',
    lastName: '',
    roleId: 1,
    email: '',
  })

  const createColumnsUser: DataTableColumns<any> = [
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
      title: 'Hak Akses',
      key: 'product',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: () => {
        return h(Flex, [
          h(
            Button,
            {
              quaternary: true,
              circle: true,
              type: 'primary',
            },
            [
              h(Icon, {
                icon: 'heroicons:eye',
              }),
            ]
          ),
          h(
            Button,
            {
              quaternary: true,
              circle: true,
              type: 'primary',
              onClick: () => {
                isShowQuickDetail.value = true
              },
            },
            [
              h(Icon, {
                icon: 'heroicons:trash',
              }),
            ]
          ),
        ])
      },
    },
  ]
  const createColumnsRole = [
    {
      title: 'Hak Akses',
      key: 'role',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: () => {
        return h(Flex, [
          h(
            Button,
            {
              quaternary: true,
              circle: true,
              type: 'primary',
            },
            [
              h(Icon, {
                icon: 'heroicons:eye',
              }),
            ]
          ),
          h(
            Button,
            {
              quaternary: true,
              circle: true,
              type: 'primary',
              onClick: () => {
                isShowQuickDetail.value = true
              },
            },
            [
              h(Icon, {
                icon: 'heroicons:trash',
              }),
            ]
          ),
        ])
      },
    },
  ]

  const data = [
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'Paid',
      product: 'EMET 5',
      value: 'Rp 200.000',
    },
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'Cancelled',
      product: 'EMET 5',
      value: 'Rp 200.000',
    },
    {
      created_at: 'Feb 2, 2019 19:28',
      name: 'Annette Black',
      email: 'annette@mail.com',
      status: 'Pending',
      product: 'EMET 5',
      value: 'Rp 200.000',
    },
  ]
  const dataRole = [
    {
      role: 'Superadmin',
    },
    {
      role: 'Admin',
    },
    {
      role: 'Customer Service',
    },
  ]
</script>

<template>
  <n-space vertical style="gap: 1rem">
    <n-page-header>
      <template #title> Settings </template>
      <template #extra>
        <n-button type="primary" @click="isShowCreateUser = true">
          Tambah User
        </n-button>
      </template>
    </n-page-header>
    <n-card content-style="padding: 0;" embedded :bordered="false">
      <n-tabs type="line" size="large">
        <n-tab-pane name="User">
          <main>
            <n-space
              justify="space-between"
              style="margin: 2rem 0; width: 100%"
            >
              <n-input v-model:value="filter.search" placeholder="Cari User">
                <template #prefix>
                  <n-icon>
                    <Icon icon="carbon:search" />
                  </n-icon>
                </template>
              </n-input>
              <div>
                <n-date-picker
                  v-model:value="filter.periode"
                  type="daterange"
                />
              </div>
            </n-space>
            <div style="overflow: auto; white-space: pre">
              <n-data-table
                :columns="createColumnsUser"
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
        </n-tab-pane>
        <n-tab-pane name="Hak Akses">
          <main>
            <n-space
              justify="space-between"
              style="margin: 2rem 0; width: 100%"
            >
              <n-input
                v-model:value="filter.search"
                placeholder="Cari Hak Akses"
              >
                <template #prefix>
                  <n-icon>
                    <Icon icon="carbon:search" />
                  </n-icon>
                </template>
              </n-input>
              <div>
                <n-date-picker
                  v-model:value="filter.periode"
                  type="daterange"
                />
              </div>
            </n-space>
            <div style="overflow: auto; white-space: pre">
              <n-data-table
                :columns="createColumnsRole"
                :data="dataRole"
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
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>

  <n-modal
    v-model:show="isShowCreateUser"
    preset="card"
    title="User"
    style="max-width: 40rem"
  >
    <n-space vertical>
      <n-form>
        <n-grid :cols="2" :x-gap="24">
          <n-form-item-gi label="Nama Depan" path="firstName">
            <n-input
              v-model:value="formCreateUser.firstName"
              placeholder="Input Nama Depan"
            />
          </n-form-item-gi>
          <n-form-item-gi label="Nama Belakang" path="lastName">
            <n-input
              v-model:value="formCreateUser.lastName"
              placeholder="Input Nama Belakang"
            />
          </n-form-item-gi>
          <n-form-item-gi label="Hak Akses" path="role" :span="2">
            <n-select
              v-model:value="formCreateUser.roleId"
              :options="[
                {
                  label: 'Superadmin',
                  value: 1,
                },
                {
                  label: 'Admin',
                  value: 2,
                },
                {
                  label: 'Customer Service',
                  value: 3,
                },
              ]"
            />
          </n-form-item-gi>
          <n-form-item-gi
            label="Email Address"
            path="email"
            :span="2"
            label-placement="left"
          >
            <n-input
              v-model:value="formCreateUser.email"
              placeholder="Input Email"
            />
          </n-form-item-gi>
        </n-grid>
        <n-space justify="space-between">
          <n-button type="error" secondary> Hapus </n-button>
          <n-button type="primary"> Simpan </n-button>
        </n-space>
      </n-form>
    </n-space>
  </n-modal>
</template>
