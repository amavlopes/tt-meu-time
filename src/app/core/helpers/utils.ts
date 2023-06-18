import { HttpParams } from "@angular/common/http";
import { GenericObjectString, Params } from "@app/shared/types/types";

export class Utils {
  static setLocalStorageItem = (item: string, value: any) => {
    return localStorage.setItem(item, this.objectToString(value));
  };

  static getLocalStorageItem = <T>(item: string): T => {
    return this.stringToObject(localStorage.getItem(item)!) as T;
  };

  private static objectToString = <T extends {}>(object: T) => {
    return JSON.stringify(object);
  };

  private static stringToObject = (text: string): {} => {
    return JSON.parse(text);
  };

  static setHttpParams(params: GenericObjectString): Params {
    let urlParams = { params: new HttpParams({})};
    for (const key of Object.keys(params)) {
      urlParams.params = urlParams.params.set(key, params[key])
    }
    return urlParams;
  }
}
