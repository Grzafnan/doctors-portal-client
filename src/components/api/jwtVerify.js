import axios from "axios"
import { useEffect, useState } from "react";

export const JwtVerify = (email) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (email) {
      axios.get(`https://doctors-portal-server-beige.vercel.app/jwt?email=${email}`)
        .then(res => {
          // console.log(res);
          if (res?.data?.success) {
            localStorage.setItem('AccessToken', res?.data?.token)
            setToken(res?.data?.token)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [email])

  return [token];
}