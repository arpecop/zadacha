import { atom } from 'recoil'

export const loggedInUserData = atom({
  key: 'loggedInUser',
  default: {
    sub: null,
    email_verified: null,
    phone_number_verified: null,
    email: null,
    username: null,
    token: null,
  },
})

export const modal = atom({
  key: 'modal',
  default: false,
})
