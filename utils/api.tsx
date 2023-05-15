import {
  TAddUser,
  TConfirmRegistration,
  TGetUserInfo,
  TInputCreateItem,
  TInputLogin,
  TInputRegisterUser,
  TListFieldValues,
  TLogin,
  TRegisterUser,
  TReservationSearchLoad,
  TUploadFileRespond,
  TUserInvite,
} from 'components/types/common';
import { getCookie } from 'cookies-next';
import { ApiError, ApiResponse, createAxiosInstance } from './axios';

const axiosInstance = createAxiosInstance();

export const addUser = async (email: string): Promise<ApiResponse<TAddUser>> => {
  try {
    const response = await axiosInstance.post<TAddUser>(
      `${process.env.NEXT_PUBLIC_LINKER_API}/users`,
      {
        email: email,
        g_id: '642bf4aee81f0dd09995df4a',
        w_id: '642bc28651005517b9643ea0',
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const userInvite = async (email: string): Promise<ApiResponse<TUserInvite[]>> => {
  try {
    const response = await axiosInstance.post<TUserInvite[]>(
      `${process.env.NEXT_PUBLIC_LINKER_API}/userinvite`,
      {
        users: [{ email }],
        domain: `${process.env.NEXT_PUBLIC_DOMAIN}`,
        sender_address: `${process.env.NEXT_PUBLIC_SENDER_ADDRESS}`,
        invitation_path: `${process.env.NEXT_PUBLIC_INVITATION_PATH}`,
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const confirmRegistration = async (
  id: string,
): Promise<ApiResponse<TConfirmRegistration>> => {
  try {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_LINKER_API}/users/registration/confirm?id=${id}`,
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const registerUser = async ({
  confirmation_id,
  email,
  username,
  password,
  workspace,
}: TInputRegisterUser): Promise<ApiResponse<TRegisterUser>> => {
  try {
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/users/registration/confirm`,
      {
        confirmation_id,
        email,
        username,
        password,
        workspace,
      },
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const getUserInfo = async (): Promise<ApiResponse<TGetUserInfo>> => {
  const token = getCookie('token');
  try {
    const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_LINKER_API}/userinfo`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const createItem = async ({
  user_id,
  position,
  name,
}: TInputCreateItem): Promise<ApiResponse<any>> => {
  try {
    const token = getCookie('token');
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/recruiters/items/new`,
      {
        item: {
          user_id,
          position,
          name,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const login = async ({ email, password }: TInputLogin): Promise<ApiResponse<TLogin>> => {
  try {
    const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_LINKER_API}/login`, {
      email,
      password,
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const logout = async () => {
  try {
    const token = getCookie('token');
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/users/logout`,
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const uploadFile = async (formData: FormData): Promise<ApiResponse<TUploadFileRespond>> => {
  try {
    const token = getCookie('token');
    const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_LINKER_API}/files`, formData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : process.env.NEXT_PUBLIC_TOKEN_API,
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const getRecruitersItems = async (user_id: string) => {
  try {
    const token = getCookie('token');
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/recruiters/items/search`,
      {
        conditions: [
          {
            id: 'user_id',
            search_value: [user_id],
            exact_match: true,
          },
        ],
        page: 1,
        per_page: 1,
        use_display_id: true,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknow error');
  }
};

export const createReservationItems = async (data: any, image: string[]) => {
  try {
    const token = getCookie('token');
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/reservations/items/new`,
      {
        item: {
          title: data.title,
          image: image,
          reservation_detail: data.reservation_detail,
          date: data.date,
          recruiter: data.recruiter,
          time_10: data.time_10 === true ? 1 : 0,
          time_11: data.time_11 === true ? 1 : 0,
          time_12: data.time_12 === true ? 1 : 0,
          time_13: data.time_13 === true ? 1 : 0,
          time_14: data.time_14 === true ? 1 : 0,
          time_15: data.time_15 === true ? 1 : 0,
          time_16: data.time_16 === true ? 1 : 0,
          time_17: data.time_17 === true ? 1 : 0,
        },
        is_force_update: true,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const updateReservationItems = async (item_id: string, time: string) => {
  try {
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/reservations/items/edit/${item_id}`,
      {
        item: {
          [`time_${time}`]: 0,
        },
        is_force_update: true,
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const getReservationsItems = async (recruiter_i_id: string, page: number) => {
  const token = getCookie('token');
  try {
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/reservations/items/search`,
      {
        conditions: [
          {
            id: 'recruiter',
            search_value: [recruiter_i_id],
            exact_match: true,
          },
        ],
        include_lookups: true,
        page: page,
        per_page: 10,
        use_display_id: true,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const getFile = async (file_id: string) => {
  const token = getCookie('token');
  try {
    const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_LINKER_API}/files/${file_id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : process.env.NEXT_PUBLIC_TOKEN_API,
      },
      responseType: 'arraybuffer',
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknow error');
  }
};

export const getItemDetails = async (item_id?: string): Promise<ApiResponse<TListFieldValues>> => {
  const token = getCookie('token');
  try {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/reservations/items/details/${item_id}?include_linked_items=true&include_lookups=true&use_display_id=true`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const searchReservation = async ({
  conditions,
  use_or_condition,
  sort_field_id,
  sort_order,
  page,
  per_page,
  use_display_id,
  include_lookups,
}: TReservationSearchLoad) => {
  try {
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/reservations/items/search`,
      {
        conditions,
        use_or_condition,
        sort_field_id,
        sort_order,
        page,
        per_page,
        use_display_id,
        include_lookups,
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Unknown error');
  }
};

export const createSubscriber = async (reservation_id: any, time: any, name: any, email: any) => {
  try {
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/subscribers/items/new`,
      {
        item: {
          reservation_id: reservation_id,
          time: time,
          name: name,
          email: email,
          access_key_updates: { groups_to_publish: ['administrator'] },
        },
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error();
  }
};

export const createLinkToSubscriber = async (item_id: string, link_item_id: string) => {
  try {
    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_LINKER_API}/applications/lunchpal/datastores/reservations/items/addlink/${item_id}`,
      {
        link_datastore_id: 'subscribers',
        link_item_id: link_item_id,
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_TOKEN_API,
        },
      },
    );
    return {
      data: true,
      status: res.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error();
  }
};
