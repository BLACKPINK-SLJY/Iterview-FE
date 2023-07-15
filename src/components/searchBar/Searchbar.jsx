import React,{useState, useRef} from 'react'
import { StyleSearchBar, MagnifierImg, SearchBoxStyle } from './style';
import Magnifier from "../../assets/svg/magnifier.svg";
// import { requestSearch } from '../../../apis/index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { UserState } from '../../recoil/userState';

const SearchBar = () => {

    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [isSuccess, setIsSuccess] = useState(true);
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(UserState);

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
            .get(`http://15.165.104.225/question/search/${search}`, axiosConfig)
            .then((res) => {
                console.log(res.data);
                setResult(res.data.data);
                navigate("/search", {
                    state: {
                      content: search,
                      searchResult: res.data.data,
                    },
                  });
                  setSearch("");
            })}
    }
    const onKeyPressSearch = (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      };

    return (
        <>
            <SearchBoxStyle>
                <StyleSearchBar
                    type="search"
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