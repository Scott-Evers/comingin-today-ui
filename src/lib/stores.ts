import type { User as UserType } from "firebase/auth";
import type { OrganizationUser } from "./OrganizationUsers";
import { writable, Writable, readable, get } from "svelte/store";


export const User: Writable<UserType> = writable()

export const DateFocus = writable(new Date())


