import { atom } from 'recoil';
import persistAtom from './persistAtom';

export const UserState = atom({
    key: "UserState",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
})