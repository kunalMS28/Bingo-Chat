
import axios from "axios";
import {HOST} from"@/utils/constants"


export const apiCLient =axios.create({
    baseURL:HOST,
});