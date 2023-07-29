import axios from "axios";
import { BaseUrl } from '../privateKey';

//토큰이 필요한 api요청을 보내는 axios인스턴스
export const privateApi = axios.create({
    baseURL: BaseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  
  //refresh token api
  export async function postRefreshToken() {
    const res = await axios.post(`${BaseUrl}/refresh`, {
        refresh_token: localStorage.getItem('refreshToken'),
    });
    return res;
  }
  
  //토큰을 함께보내는 privateApi에 interceptor를 적용합니다
// export const RefresfFunc = (setUser, navigate, res) => {
//   // 200번대 응답이 올때 처리
//     if (res.data.status === 40003) {
//       if (res.data.message === "엑세스 토큰의 유효기간이 만료되었습니다.") {
//         const originRequest = res.config;
//         //리프레시 토큰 api
//         return postRefreshToken().then((refreshTokenResponse) => {
//           //리프레시 토큰 요청이 성공할 때
//           if (refreshTokenResponse.status === 20001) {
//             const newAccessToken = refreshTokenResponse.data.data.access_token;
//             localStorage.setItem('accessToken', refreshTokenResponse.data.data.access_token);
//             localStorage.setItem('refreshToken', refreshTokenResponse.data.data.refresh_token);
//             axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//             //진행중이던 요청 이어서하기
//             originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             return axios(originRequest);
//           //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
//           }
//           if (refreshTokenResponse.status === 40004) {
//             alert('로그인 만료, 다시 로그인해주세요.');
//             setUser(null);
//             navigate('/login');
//             throw new Error('로그인 만료, 다시 로그인해주세요.');
//           }
//       })}
//     return res;
//   }}