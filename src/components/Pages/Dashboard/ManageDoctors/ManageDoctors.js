import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { VerifyAdmin } from '../../../api/verifyAdmin';
import Spinner from '../../../Spinner/Spinner';
import Swal from 'sweetalert2'

const ManageDoctors = () => {
  const { user } = useContext(AuthContext);

  const [isAdmin] = VerifyAdmin(user?.email);

  const { data: doctors, refetch, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => axios.get(`https://doctors-portal-server-beige.vercel.app/doctors`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('AccessToken')}`
      }
    })
      .then(res => {
        // console.log(res?.data?.data);
        const data = res?.data?.data;
        return data;
      })
      .catch(err => {
        console.log(err.name, err.message);
      })
  });


  const handleDeleteDoctor = id => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-sm btn-success',
        cancelButton: 'btn btn-sm btn-error mr-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (isAdmin) {
          axios.delete(`https://doctors-portal-server-beige.vercel.app/doctors/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('AccessToken')}`
            }
          })
            .then(res => {
              if (res?.data?.result?.acknowledged) {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Doctor has been deleted.',
                  'success'
                )
                // toast.success(`Successfully deleted doctor by ${id}.`)
                refetch();
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container mx-auto px-6 md:px-6 lg:px-10'>
      <h1 className='text-2xl font-bold pt-11 pb-7'>Manage Doctors {doctors?.length}</h1>

      <div className='mt-5 mb-10'>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>specialty</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                doctors?.length > 0 ? (
                  <>
                    {
                      doctors?.map((doctor, idx) => <tr
                        key={doctor?._id}
                      >
                        <th>{idx + 1}</th>
                        <td>
                          <img className='w-10 h-10 rounded-full' src={doctor?.image} alt={doctor?.name} />
                        </td>
                        <td>{doctor?.name}</td>
                        <td>{doctor?.email}</td>
                        <td>{doctor?.specialty}</td>
                        <td>
                          {/* {
                            user?.role === "Admin" && */}
                          <button
                            onClick={() => handleDeleteDoctor(doctor?._id)}
                            className='btn btn-xs btn-error text-white font-semibold rounded-md'>
                            Delete
                          </button>

                          {/* } */}
                        </td>
                      </tr>)
                    }
                  </>
                )
                  : (
                    <>
                      <tr>
                        <td></td>
                        <td className='text-red-600 font-semibold'>No Doctor</td>
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
  );
};

export default ManageDoctors;