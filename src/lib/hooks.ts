import { setCredentials } from "@/lib/features/auth/authSlice"
import { AppDispatch, AppStore, RootState } from "@/lib/store"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

// Custom hook to check if user is signed in
export function useAuth({ needSignIn }: { needSignIn: boolean }) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      const signedInUser = localStorage.getItem("signedInNextNetShopUser")

      if (signedInUser) {
        const data = JSON.parse(signedInUser)
        dispatch(setCredentials(data))
      } else if (needSignIn) {
        redirect("/signin")
      }
    }
  }, [dispatch, user, needSignIn])

  return user
}
