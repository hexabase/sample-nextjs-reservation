import { TAddUser, TUserInvite } from 'components/types/common';
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
          Authorization: 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2MjIxMTU1MTgsImlhdCI6MTY3NjAzNTUxOCwic3ViIjoiNjJkN2QzOTgwZmZjZTUzYTA5ZTJiYmU1IiwidW4iOiIifQ.fUbrmSWAJ1sny52L9TmlDM1nzjJuou9EmhiIxngdgdxFyaEg2u1BcaBLNpJM5R1XUq7WMyXMnJxrHmCPUNXv-i4SR26zQlPfY9lezFXrxEXX5MecF9SB2mW-MyVmkwPnWWBqRtVpnJ60vFDXELvrXZGBKY1UsMCC9Fnq5gRuRGnR5jDeU7bUPRnP6YNT4SpQj9x02Jg9XBNXyFHuZgdpUukDsnDsxuWhP1ZM6qPbyOe-rTeo11wlDjA4LSQKg6JipScWJf8NKwYJnQBP_A4q90zdTSqapAqNq3GU4T8QAixDBiiibmuXdTW8BUcF_jhH9btD0lsdIt2aynel0o7v_A'
        }
      }
    )
    return {
      data: response.data,
      status: response.status
    }
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error.response)
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
          Authorization: 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2MjIxMTU1MTgsImlhdCI6MTY3NjAzNTUxOCwic3ViIjoiNjJkN2QzOTgwZmZjZTUzYTA5ZTJiYmU1IiwidW4iOiIifQ.fUbrmSWAJ1sny52L9TmlDM1nzjJuou9EmhiIxngdgdxFyaEg2u1BcaBLNpJM5R1XUq7WMyXMnJxrHmCPUNXv-i4SR26zQlPfY9lezFXrxEXX5MecF9SB2mW-MyVmkwPnWWBqRtVpnJ60vFDXELvrXZGBKY1UsMCC9Fnq5gRuRGnR5jDeU7bUPRnP6YNT4SpQj9x02Jg9XBNXyFHuZgdpUukDsnDsxuWhP1ZM6qPbyOe-rTeo11wlDjA4LSQKg6JipScWJf8NKwYJnQBP_A4q90zdTSqapAqNq3GU4T8QAixDBiiibmuXdTW8BUcF_jhH9btD0lsdIt2aynel0o7v_A'
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