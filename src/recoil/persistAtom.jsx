import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({
    key: 'user',
    storage: localStorage,
})

export default persistAtom;