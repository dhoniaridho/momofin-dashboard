import type { FormRules } from 'naive-ui'

export const LoginPayloadSchema: FormRules = {
  email: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Email wajib diisi',
    },
    {
      type: 'email',
      trigger: ['blur', 'input'],
      message: 'Masukkan email yang valid',
    },
  ],
  password: [
    {
      required: true,
      message: 'Password wajib diisi',
      trigger: ['input', 'blur'],
    },
    {
      min: 5,
      message: 'Password minimal 5 karakter',
      trigger: ['input', 'blur'],
    },
  ],
}
