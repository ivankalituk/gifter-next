"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="913924371455-887ehm4755o1rnmdnfur3cc2abm5ub3a.apps.googleusercontent.com">
      {children}
      </GoogleOAuthProvider>
    </Provider>)
}
