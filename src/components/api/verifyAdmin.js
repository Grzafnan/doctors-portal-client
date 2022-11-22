import axios from "axios"
import { useEffect, useState } from "react"

export const VerifyAdmin = email => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (email) {
      axios.get(`https://doctors-portal-server-beige.vercel.app/users/admin/${email}`)
        .then(res => {
          // console.log(res)
          setIsAdmin(res?.data?.isAdmin)
          setIsAdminLoading(false)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [email]);

  return [isAdmin, isAdminLoading]
}