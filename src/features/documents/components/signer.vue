<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
  const props = defineProps(['signers'])

  const USAGES = computed<{ emet: number; esgn: number }[]>(() => {
    return props.signers.map((item: any) => item.usage_count)
  })

  const esgnUsage = computed(() => {
    return USAGES.value.reduce((a, b) => a + b.esgn, 0)
  })
  const emetUsage = computed(() => {
    return USAGES.value.reduce((a, b) => a + b.emet, 0)
  })
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
        <n-space style="margin-top: 2rem">
          <n-space>
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
    <n-space vertical>
      <n-h4>Total Penggunaan </n-h4>
      <n-space>
        <n-icon size="40">
          <icons name="esign" />
        </n-icon>
        {{ esgnUsage }} ESGN
      </n-space>
      <n-space>
        <n-icon size="40">
          <icons name="emet" />
        </n-icon>
        {{ emetUsage }} EMET
      </n-space>
    </n-space>
  </n-space>
</template>
