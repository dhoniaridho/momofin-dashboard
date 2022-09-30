<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
  defineProps(['signers'])
</script>

<template>
  <n-space vertical>
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
            </n-space>
            <n-text>{{ user.email }}</n-text>
          </n-space>
        </n-space>
      </div>
    </div>
  </n-space>
</template>
