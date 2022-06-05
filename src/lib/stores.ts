import type { User as UserType } from "firebase/auth";
import { writable, Writable } from "svelte/store";


export const User: Writable<UserType> = writable()

export const DateFocus = writable(new Date())


