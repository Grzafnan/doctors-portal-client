import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import SpinnerSmall from '../../Spinner/SpinnerSmall';

const AllUsers = () => {

  const { data: users, refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get(`https://doctors-portal-server-beige.vercel.app/users`)
      .then(res => {
        const data = res?.data?.data
        return data;
      })
  })

  // console.log(users);
  // console.log(localStorage.getItem('AccessToken'));

  const handleMakeAdmin = id => {
    // console.log(id);

    fetch(`https://doctors-portal-server-beige.vercel.app/users/admin/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('AccessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data.modifiedCount > 0) {
          toast.success('Successfully make a admin.')
          refetch();
        }
      })
      .catch(err => {
        console.log(err.name, err.message);
        toast.error(err?.response?.data?.message)
      })
  }

  // console.log(users);


  const handleDeleteUser = id => {
    console.log(id);
    axios.delete(`https://doctors-portal-server-beige.vercel.app/users/${id}`)
      .then(res => {
        // console.log(res?.data?.result?.acknowledged);
        if (res?.data?.result?.acknowledged) {
          toast.success('Successfully deleted user.!')
          refetch();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <>
      {
        isLoading ? (
          <SpinnerSmall />
        )
          :
          (
            <>
              <div className='container mx-auto px-6 md:px-6 lg:px-10'>
                <div className='flex justify-between items-center'>
                  <h3 className="text-2xl font-semibold text-center lg:text-start text-accent">
                    All Users
                  </h3>
                  <button className='btn btn-accent btn-outline'>
                    MAY 10, 2022
                  </button>
                </div>

                <div className='mt-5 mb-10'>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Admin</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          users?.length > 0 ? (
                            <>
                              {
                                users?.map((user, idx) => <tr
                                  key={user?._id}
                                >
                                  <th>{idx + 1}</th>
                                  <td>{user?.name}</td>
                                  <td>{user?.email}</td>
                                  <td>
                                    {
                                      user?.role === "Admin" ?
                                        <>
                                          <span className='text-white bg-green-700 px-3 py-[2px] rounded-md font-semibold'>Admin</span>
                                        </>
                                        :
                                        <>
                                          <button
                                            onClick={() => handleMakeAdmin(user?._id)}
                                            className='btn btn-xs btn-primary font-semibold '>
                                            Make Admin
                                          </button>
                                        </>
                                    }
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => handleDeleteUser(user?._id)}
                                      className='btn btn-xs btn-error text-white font-semibold rounded-md'>
                                      Delete
                                    </button>
                                  </td>
                                </tr>)
                              }
                            </>
                          )
                            : (
                              <>
                                <tr>
                                  <td></td>
                                  <td className='text-red-600 font-semibold'>No Users</td>
                                  <td></td>
                                </tr>
                              </>
                            )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )

      }
    </>
  );
};

export default AllUsers;