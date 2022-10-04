import { AuthTokenType } from "@Storage/types"
import { createContext } from "react"

export const AuthContext = createContext<AuthTokenType | null>(null)