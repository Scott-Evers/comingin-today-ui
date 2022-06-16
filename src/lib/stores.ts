import type { User as UserType } from "firebase/auth";
import { writable, Writable } from "svelte/store";
import type { Orgs, User as UserObjType } from './fb_types'


export const User: Writable<UserType> = writable()
export const UserObj: Writable<UserObjType> = writable()
export const CurrentUserOrgs: Writable<Orgs> = writable()

export const DateFocus = writable(new Date())


