import http from "../http/http";
import { IBreadData, IBreadList } from "../types";


export const getBread = () => {
    return http.get<Array<IBreadData>>("/breed/hound/images");
}

export const getBreadList = () => {
    return http.get<Array<IBreadList>>("/breeds/list/all");
}

export const getSubBreadList = (breedName: string) => {
    return http.get<Array<IBreadList>>(`breed/${breedName}/list`);
}

export const getSelectedBread = (bread: string, sub_bread: string, n_image: number) => {
    return http.get<Array<IBreadData>>(`/breed/${bread}/${sub_bread}/images/random/${n_image}`);
}

