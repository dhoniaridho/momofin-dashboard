<route lang="yaml">
meta:
  layout: guest
</route>

<script setup lang="ts">
  import { useMutation } from 'vue-query'
  import { AuthRepository } from '@features/auth/auth.repository'
  import type { ILoginPayload } from '@features/auth/auth.interface'
  import { LoginPayloadSchema } from '@features/auth/auth.schema'
  import { type FormInst, useMessage } from 'naive-ui'
  import router from '~/router'
  import { AuthService } from '@features/auth/auth.service'
  import useAuthStore from '@features/auth/auth.store'
  import { appConfig } from '~/config/app.config'
  import { useTheme } from '~/store/theme'

  const { error, success } = useMessage()
  const auth = useAuthStore()
  const theme = useTheme()

  const formRef = ref<FormInst | null>(null)

  useHead({
    title: `Login - ${appConfig.app.name}`,
  })

  let formData = $ref({
    email: '',
    password: '',
    remember: false,
  })

  function useLogin() {
    return useMutation(
      (value: ILoginPayload) => {
        return AuthRepository.login(value)
      },
      {
        onSuccess: (response) => {
          success('Login berhasil, anda akan di arahkan ke halaman dashboard')
          AuthService.signIn(response.token, formData.remember)
          router.push('/')
          auth.user = response.account
        },
        onError: (response: any) => {
          error(response?.msg)
          formData.password = ''
        },
      }
    )
  }

  const { mutate, isLoading } = useLogin()

  const onSubmit = () => {
    formRef.value?.validate((error) => {
      if (error) return
      mutate(formData)
    })
  }

  useHead({
    title: `Login - ${appConfig.app.name}`,
  })
</script>

<template>
  <n-card :class="$style.container" :content-style="$style.container">
    <n-space justify="center" align="center" :class="$style.container">
      <div :class="$style.card__wrapper">
        <Icons name="logo" height="50" />
        <n-space justify="center">
          <n-text> Dashboard Tele Sales eMET </n-text>
        </n-space>
        <div
          style="position: relative; width: fit-content; margin-inline: auto"
        >
          <n-card :class="$style.card" size="medium">
            <n-h2>Login ke Akun Anda </n-h2>
            <n-text
              >Silahkan masukkan email & kata sandi untuk masuk ke akun Anda
            </n-text>
            <div :class="$style.form__wrapper">
              <n-form
                ref="formRef"
                :model="formData"
                :rules="LoginPayloadSchema"
                @submit.prevent="onSubmit"
              >
                <n-form-item path="email" label="Alamat Email">
                  <n-input v-model:value="formData.email" placeholder="Email" />
                </n-form-item>
                <n-form-item path="password" label="Password">
                  <n-input
                    v-model:value="formData.password"
                    show-password-on="click"
                    type="password"
                    placeholder="Password"
                  />
                </n-form-item>
                <n-row :gutter="[0, 24]">
                  <n-col :span="24"> </n-col>
                </n-row>
                <n-form-item>
                  <n-space vertical :size="20" :class="$style.form__action">
                    <n-checkbox v-model:checked="formData.remember">
                      Ingat Saya
                    </n-checkbox>
                    <n-button
                      attr-type="submit"
                      type="primary"
                      block
                      :loading="isLoading"
                    >
                      Login
                    </n-button>
                  </n-space>
                </n-form-item>
              </n-form>
            </div>
          </n-card>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button
                style="position: absolute; right: 1rem; top: 1rem"
                circle
                @click="theme.toggleTheme"
              >
                <span v-if="theme.currentTheme"> 🌞 </span>
                <span v-else> 🌒 </span>
              </n-button>
            </template>
            <span v-if="theme.currentTheme"> Mode Terang </span>
            <span v-else> Mode Gelap </span>
          </n-tooltip>
        </div>
      </div>
    </n-space>
  </n-card>
</template>

<style scoped module>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .card {
    max-width: 500px;
    margin: auto;
    position: relative;
  }
  .card__brand {
    margin: auto;
    pointer-events: none;
    user-select: none;
  }
  .card__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
  .form__wrapper {
    margin-top: 1rem;
  }
  a {
    text-decoration: none;
  }
  .form__action {
    width: 100%;
  }
  .branding {
    height: 2rem;
    width: 5rem;
  }
  .branding__wrapper {
    height: 2rem;
    width: 10rem;
    display: flex;
    margin-inline: auto;
    align-items: center;
  }
</style>

<route lang="yaml">
meta:
  requiresAuth: false
</route>
