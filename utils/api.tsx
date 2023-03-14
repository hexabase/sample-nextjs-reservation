import { TAddUser, TConfirmRegistration, TGetUserInfo, TInputCreateItem, TInputLogin, TInputRegisterUser, TLogin, TRegisterUser, TUserInvite } from 'components/types/common';
import { getCookie } from 'cookies-next';
import { ApiError, ApiResponse, createAxiosInstance } from './axios';

const axiosInstance = createAxiosInstance();

export const addUser = async (email: string): Promise<ApiResponse<TAddUser>> => {
  try {
    const response = await axiosInstance.post<TAddUser>(
      'https://api.hexabase.com/api/v0/users',
      {
        email: email,
        g_id: "64056d51a3ac0b5a0bc70137",
        w_id: "6401a9b65e6cd8c92726522b"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
        }
      }
    )
    return {
      data: response.data,
      status: response.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const userInvite = async (email: string): Promise<ApiResponse<TUserInvite[]>> => {
  try {
    const response = await axiosInstance.post<TUserInvite[]>(
      'https://api.hexabase.com/api/v0/userinvite', {
      users: [{ email }],
      domain: 'lunchpal.hexabase.app',
      sender_address: 'noreply@hexabase.com',
      invation_path: '/auth/register-completed'
    },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
        }
      }
    )

    return {
      data: response.data,
      status: response.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const confirmRegistration = async (id: string): Promise<ApiResponse<TConfirmRegistration>> => {
  try {

    const res = await axiosInstance.get(
      `https://api.hexabase.com/api/v0/users/registration/confirm?id=${id}`
    )
    return {
      data: res.data,
      status: res.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }

}

export const registerUser = async ({
  confirmation_id,
  email,
  username,
  password,
  workspace
}: TInputRegisterUser): Promise<ApiResponse<TRegisterUser>> => {
  try {
    const res = await axiosInstance.post(
      'https://api.hexabase.com/api/v0/users/registration/confirm',
      {
        confirmation_id,
        email,
        username,
        password,
        workspace,
      }
    )
    return {
      data: res.data,
      status: res.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const getUserInfo = async (): Promise<ApiResponse<TGetUserInfo>> => {
  const token = getCookie('token')
  try {
    const res = await axiosInstance.get(
      'https://api.hexabase.com/api/v0/userinfo',
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    )
    return {
      data: res.data,
      status: res.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const createItem = async ({ user_id, position, name }: TInputCreateItem): Promise<ApiResponse<any>> => {
  try {
    const token = getCookie('token');
    const res = await axiosInstance.post(
      'https://api.hexabase.com/api/v0/applications/lunch-pal/datastores/recruiters/items/new',
      {
        item: {
          user_id,
          position,
          name,
        }
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    )
    return {
      data: res.data,
      status: res.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const login = async ({ email, password }: TInputLogin): Promise<ApiResponse<TLogin>> => {
  try {
    const res = await axiosInstance.post(
      'https://api.hexabase.com/api/v0/login',
      {
        email,
        password,
      }
    )
    return {
      data: res.data,
      status: res.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const logout = async () => {
  try {
    const token = getCookie('token');
    const res = await axiosInstance.post(
      'https://api.hexabase.com/api/v0/users/logout',
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    )
    return {
      data: res.data,
      status: res.status,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const uploadFile = async (formData: FormData) => {
  try {
    const token = getCookie('token')
    const res = await axiosInstance.post(
      'https://api.hexabase.com/api/v0/files',
      formData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          "Content-Type": 'multipart/form-data'
        }
      }
    )
    return {
      data: res.data,
      status: res.status,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const getRecruitersItems = async (user_id: string) => {
  try {
    const token = getCookie('token')
    const res = await axiosInstance.post(
      'https://api.hexabase.com/api/v0/applications/lunch-pal/datastores/recruiters/items/search',
      {
        conditions: [
          {
            id: 'user_id',
            search_value: [user_id],
            exact_match: true
          }
        ],
        page: 1,
        per_page: 1,
        use_display_id: true
      },
      {
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_TOKEN_API}`,
        }
      }
    )

    return {
      data: res.data,
      status: res.status,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknow error')
  }
}

export const createJobItems = async (data: any, image: string[]) => {
  try {
    const token = getCookie('token')
    const d = new Date("2015-03-25");
    console.log(data)
    console.log(image)
    const res = await axiosInstance.post(
      'https://api.hexabase.com/api/v0/applications/lunch-pal/datastores/reservations/items/new',
      {
        item: {
          recruiter_id: '000000006',
          title: data.title,
          image: image,
          reservation_detail: data.reservation_detail,
          date: data.date,
          time_10: data.time_10 === true ? 1 : 0,
          time_11: data.time_11 === true ? 1 : 0,
          time_12: data.time_12 === true ? 1 : 0,
          time_13: data.time_13 === true ? 1 : 0,
          time_14: data.time_14 === true ? 1 : 0,
          time_15: data.time_15 === true ? 1 : 0,
          time_16: data.time_16 === true ? 1 : 0,
          time_17: data.time_17 === true ? 1 : 0,
        },
        is_force_update: true
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
        }
      }
    )

    return {
      data: res.data,
      status: res.status,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

export const getReservationsItems = async (recruiter_id: string) => {
  const token = getCookie('token')
  try {
    const res = await axiosInstance.post(
      'https://api.hexabase.com/api/v0/applications/lunch-pal/datastores/reservations/items/search',
      {
        conditions: [{
          id: 'recruiter_id',
          search_value: [recruiter_id],
          exact_match: true,

        }],
        include_links: true,
        page: 1,
        per_page: 10,
        use_display_id: true
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    )
    return {
      data: res.data,
      status: res.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}

const getFile = async (file_id: string) => {
  const token = getCookie('token')
  try {
    const res = await axiosInstance.get(
      `https://api.hexabase.com/api/v0/files/${file_id}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    )
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknow error')
  }
}

export const getItemDetails = async (item_id: string) => {
  const item_id1 = '640ae16d7fbbe73e1e6e114e'
  const token = getCookie('token')
  try {
    const res = await axiosInstance.get(
      `https://api.hexabase.com/api/v0/applications/lunch-pal/datastores/reservations/items/details/${item_id1}?include_linked_items=true&use_display_id=true`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    )
    return {
      data: res.data,
      status: res.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Unknown error')
  }
}