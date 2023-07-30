import React,{useState, useRef} from 'react'
import { StyleSearchBar, MagnifierImg, SearchBoxStyle } from './style';
import Magnifier from "../../assets/svg/magnifier.svg";
// import { requestSearch } from '../../../apis/index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { UserState } from '../../recoil/userState';
import { BaseUrl } from '../../privateKey';
import { postRefreshToken } from '../../instance/apis';

const SearchBar = () => {

    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [isSuccess, setIsSuccess] = useState(true);
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(UserState);
    const [alertShown, setAlertShown] = useState(false);

    const input = useRef();

    const shouldSendHeader = !!user;

    const axiosConfig = {
        headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
      };


    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        if(search.trim() !== "") {
        axios
            .get(`${BaseUrl}/question/search/${search}`, axiosConfig)
            .then((res) => {
                if(!alertShown){
                    setAlertShown(true);
                    if (res.data.status === 40003) {
                      if (res.data.message === "엑세스 토큰의 유효기간이 만료되었습니다.") {
                        const originRequest = res.config;
                        // 리프레시 토큰 api
                        return postRefreshToken().then((refreshTokenResponse) => {
                          // 리프레시 토큰 요청이 성공할 때
                          if (refreshTokenResponse.data.status === 20001) {
                            const newAccessToken = refreshTokenResponse.data.data.access_token;
                            localStorage.setItem('accessToken', refreshTokenResponse.data.data.access_token);
                            localStorage.setItem('refreshToken', refreshTokenResponse.data.data.refresh_token);
                            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`; // 수정: headers.common을 사용하여 모든 요청에 적용
                            // 진행중이던 요청 이어서하기
                            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(originRequest);
                          }
                          // 리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
                          if (refreshTokenResponse.data.status === 40004) {
                            alert('로그인 만료, 다시 로그인해주세요.');
                            setUser(null);
                            navigate('/login');
                            setAlertShown(true);
                            throw new Error('로그인 만료, 다시 로그인해주세요.');
                          }}
                          )}
                        }}
                    return res;
                  })
                  .then((res) => {
                    // 성공적으로 처리된 응답
                    setResult(res.data.data);
                    navigate("/search", {
                        state: {
                          content: search,
                          searchResult: res.data.data,
                        },
                      });
                      setSearch("");
                    return Promise.resolve(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => {
                    setAlertShown(false); // 경고창이 띄워진 후에 1초 뒤에 false로 변경
                  });
    }}
    const onKeyPressSearch = (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      };

    return (
        <>
            <SearchBoxStyle>
                <StyleSearchBar
                    type="text"
                    ref={input}
                    value={search}
                    onChange={onChangeSearch}
                    onKeyPress={onKeyPressSearch}
                    onSubmit={(e)=>{
                        e.preventDefault();
                        handleSearch();
                    }}
                    placeholder="검색어를 입력하세요">
                </StyleSearchBar>
                <MagnifierImg src={Magnifier}></MagnifierImg>
            </SearchBoxStyle>
            {search !== "" && isSuccess && result.length > 0 }
            
        </>
    );
};

export default SearchBar