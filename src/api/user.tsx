import { IUser } from "../types/user";
import instance from "./instance";
const adduser = (users: IUser) => {
    return instance.post('/signup',users);
}
export {adduser}