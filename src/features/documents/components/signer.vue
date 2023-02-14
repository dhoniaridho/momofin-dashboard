<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
  defineProps(['signers'])
</script>

<template>
  <n-space style="gap: 2rem">
    <n-space vertical style="gap: 1rem">
      <n-h4> Penandatangan </n-h4>
      <div v-for="user in $props?.signers" :key="user.email">
        <div>
          <n-space>
            <n-badge v-if="user.signing_status" type="success">
              <n-avatar circle>
                {{ user?.name.charAt(0) }}
              </n-avatar>
            </n-badge>
            <n-avatar v-else circle>
              {{ user?.name.charAt(0) }}
            </n-avatar>
            <n-space vertical>
              <n-space>
                <n-text>{{ user.name }}</n-text>
                <n-tag
                  :type="user.sign_status ? 'success' : 'info'"
                  :bordered="false"
                  round
                  size="small"
                >
                  {{
                    user.sign_status
                      ? 'Sudah Menandatangani'
                      : 'Belum Menandatangani'
                  }}
                </n-tag>
              </n-space>
              <n-text>{{ user.email }}</n-text>
            </n-space>
          </n-space>
        </div>
      </div>
    </n-space>
    <n-space vertical>
      <n-h4> Token Dipakai </n-h4>
      <div v-for="user in $props?.signers" :key="user.email">
        <n-space>
          <n-space v-if="user.signature_type == 'momofin'">
            <n-icon size="25">
              <icons name="momofin-sign" />
            </n-icon>
            {{ user.usage_count.esgn }} BASE
          </n-space>
          <n-space v-if="user.signature_type == 'peruri'">
            <n-icon size="25">
              <icons name="esign" />
            </n-icon>
            {{ user.usage_count.esgn }} ESGN
          </n-space>
          <n-space>
            <n-icon size="25">
              <icons name="emet" />
            </n-icon>
            <n-text> {{ user.usage_count.emet }} EMET </n-text>
          </n-space>
        </n-space>
      </div>
    </n-space>
  </n-space>
</template>
