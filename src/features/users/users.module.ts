import { Icon } from '@iconify/vue'
import { OPTIONS, STATUS } from '@features/users/users.constant'
import { useMutation, useQuery } from 'vue-query'
import {
  getAllUsers,
  getUserById,
  verifyUserById,
  resendEmailVerification,
  deleteUserById,
} from '@features/users/users.repository'

import type { UsersResponse } from '~/features/users/users.interface'
import {
  NButton,
  NDropdown,
  NIcon,
  NSpace,
  NTag,
  useMessage,
  type DataTableColumns,
} from 'naive-ui'

export function useUsersFeature() {
  const { success, error } = useMessage()

  const selectedUUID = ref('')

  const filter = ref({
    search: '',
    page: 1,
    period: '7d',
    status: '',
    limit: 10,
  })
  const isShowDeleteModal = ref(false)
  const isShowQuickDetail = ref(false)
  const isShowVerificationModal = ref(false)
  const isShowResend = ref(false)

  function useUsers() {
    return useQuery(['users', filter], () => {
      return getAllUsers(filter.value)
    })
  }

  function useUsersDetail() {
    return useQuery(['users', selectedUUID], () => {
      return getUserById(selectedUUID.value)
    })
  }

  function useVerifyUser() {
    return useMutation(
      () => {
        return verifyUserById(selectedUUID.value)
      },
      {
        onSuccess({ msg }) {
          success(msg)
          refetchUsers.value()
          isShowVerificationModal.value = false
        },
        onError: ({ data }) => {
          error(data)
        },
      }
    )
  }

  function useResendEmail() {
    return useMutation(
      () => {
        return resendEmailVerification(selectedUUID.value)
      },
      {
        onSuccess({ msg }) {
          isShowResend.value = false
          success(msg)
        },
        onError() {
          error('Gagal Mengirim Ulang Email')
        },
      }
    )
  }

  function useDeleteUser() {
    return useMutation(
      () => {
        return deleteUserById(selectedUUID.value)
      },
      {
        onSuccess({ msg }) {
          isShowDeleteModal.value = false
          success(msg)
          refetchUsers.value()
        },
        onError() {
          error('Gagal menghapus user')
        },
      }
    )
  }

  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useUsers()
  const { data: user, refetch: refetchUserDetail } = useUsersDetail()
  const { mutate: execVerify, isLoading: isVerifiying } = useVerifyUser()
  const { mutate: execResend, isLoading: isResending } = useResendEmail()
  const { mutate: execDelete, isLoading: isDeleting } = useDeleteUser()

  const createColumns = (): DataTableColumns<UsersResponse.User> => {
    return [
      {
        title: 'Tanggal Registrasi',
        key: 'created_at',
        sorter: 'default',
      },
      {
        title: 'Nama Lengkap',
        key: 'fullname',
        sorter: 'default',
      },
      {
        title: 'Email',
        key: 'email',
        sorter: 'default',
      },
      {
        title: 'Status Akun',
        key: 'status',
        sorter: 'default',
        render: (row) => {
          return h(
            NTag,
            {
              bordered: false,
              round: true,
              type: STATUS(row.account_status),
            },
            {
              icon: () =>
                h(NIcon, () =>
                  h(Icon, {
                    icon: 'carbon:dot-mark',
                  })
                ),
              default: () => row.account_status,
            }
          )
        },
      },
      {
        title: 'Status e-KYC',
        key: 'kyc',
        sorter: 'default',
        render: (row) => {
          return h(
            NTag,
            {
              bordered: false,
              round: true,
              type: STATUS(row.certificate_status),
            },
            {
              icon: () =>
                h(NIcon, () =>
                  h(Icon, {
                    icon: 'carbon:dot-mark',
                  })
                ),
              default: () => [row.certificate_status],
            }
          )
        },
      },
      {
        title: 'Aksi',
        key: 'action',
        render: (row) => {
          return h(NSpace, () => [
            h(
              NButton,
              {
                quaternary: true,
                circle: true,
                onClick() {
                  isShowQuickDetail.value = true
                  selectedUUID.value = row.id
                  refetchUserDetail.value()
                },
              },
              () =>
                h(Icon, {
                  icon: 'akar-icons:eye',
                })
            ),
            h(
              NDropdown,
              {
                trigger: 'click',
                options: OPTIONS(row.account_status),
                onSelect: onSelectDropdown,
                onClick() {
                  selectedUUID.value = row.id
                  refetchUserDetail.value()
                },
              },
              () =>
                h(NButton, () =>
                  h(NIcon, () =>
                    h(Icon, {
                      icon: 'carbon:overflow-menu-horizontal',
                    })
                  )
                )
            ),
          ])
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
      case 'resend':
        isShowResend.value = true
        break

      default:
        break
    }
  }

  const onRequestResend = () => {
    execResend()
  }

  const onRequestVerify = () => {
    execVerify()
  }

  const onRequestDelete = () => {
    execDelete()
  }

  return {
    onRequestDelete,
    onRequestVerify,
    onRequestResend,
    users: computed(() => users.value?.user),
    pagination: computed(() => users.value?.pagination),
    onSelectDropdown,
    isVerifiying,
    isResending,
    isDeleting,
    isLoadingUsers,
    user,
    createColumns,
    filter,
    isShowResend,
    isShowQuickDetail,
    isShowVerificationModal,
    isShowDeleteModal,
  }
}
