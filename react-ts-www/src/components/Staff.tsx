import { ConstructionSharp } from '@material-ui/icons';
import * as React from 'react';
import * as Axios from './Axios'


export interface IStaff {

    "id": number,
    "last_login": string,
    "username": string,
    "avatar": string,
    "login_name": string,
    "is_online": boolean,
    "email": string,
    "date_of_birth": string,
    "is_active": boolean,
    "is_admin": boolean,
    "pharmacy": any,
    "pid": null,
    "position": "药师"
}

export interface IUser {
    userId: number;
}
export default function Staff() {

}

/**
 * @description: 通过id获取用户
 * @params {IUser} params
 * @return {Promise}
 */
export const getUserInfo = (params: number): Promise<any> => {
    const url = 'yaoe_admin/staff/' + params + '/'
    return Axios.axiosInstance.get(url).then(res => res);
};