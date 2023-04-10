import { ICategory } from "../types/category";
import { IUser } from "../types/user";
import instance from "./instance";
const addCategory = (categories: ICategory) => {
    return instance.post('/addcategory', categories);
}
export {addCategory}