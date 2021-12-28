import { LocalStorage, Notify } from 'quasar'
import { boot } from 'quasar/wrappers';
import axios, { AxiosRequestConfig , AxiosInstance, AxiosError } from 'axios';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
interface ApiErrorResponseData{
  message: string;
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' });
const goLanguageRepositoryApi = axios.create({
  baseURL: process.env.GO_LANGUAGE_REPOSITORY_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
goLanguageRepositoryApi.interceptors.request.use((config: AxiosRequestConfig) => {
  //set user token
  const userToken:string = LocalStorage.getItem('go_language_repository_user_token')??''
  const authorization = 'Bearer '+userToken
  config.headers = {
    Authorization: authorization,
  }

  return config  
}, (error) => {
  return Promise.reject(error);
})

goLanguageRepositoryApi.interceptors.response.use((response) => {
  return response
}, (error:Error|AxiosError) => {
  // whatever you want to do with the error
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response?.data as ApiErrorResponseData
    const message:string = data.message
    if(message){
      Notify.create({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: message
      })
    }
  }
  else{
    Notify.create({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '伺服器錯誤'
    })
  }
  return Promise.reject(error);
});
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$goLanguageRepositoryApi = goLanguageRepositoryApi;
});

export { axios, api, goLanguageRepositoryApi };
