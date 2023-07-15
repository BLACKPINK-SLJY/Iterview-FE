import { atom } from 'recoil';
import persistAtom from './persistAtom';

export const QuestionState = atom({
    key: "QuestionState",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const ClickedState = atom({
    key: "ClickedState",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const ScrabedState = atom({
    key: "ScrabedState",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const AnsweredState = atom({
    key: "AnsweredState",
    default: false,
    effects_UNSTABLE: [persistAtom],
})