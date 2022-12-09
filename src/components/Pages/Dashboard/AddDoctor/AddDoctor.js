import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import Spinner from '../../../Spinner/Spinner';
import uploadImage from '../../../../assets/icons/Group 83.svg'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const AddDoctor = () => {
  const [files, setFiles] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { data: specialties, isLoading } = useQuery({
    queryKey: ['specialty'],
    queryFn: () => axios.get('https://doctors-portal-server-beige.vercel.app/appointment-specialty')
      .then(res => {
        if (res?.data?.success) {
          const data = res?.data?.data;
          return data;
        }
      })
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });



  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);


  const thumbs = files.map(file => (
    <div className=' border-2 w-full h-full p-2 rounded-md' key={file.name}>
      <div className='flex w-1/4 overflow-hidden min-w-0'>
        <img
          src={file.preview}
          alt=''
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));



  const handleRegister = data => {
    const formData = new FormData();
    formData.append('image', files[0]);

    axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, formData)
      .then(res => {
        if (res?.data?.success) {
          // console.log(res?.data?.data?.image?.url);
          // setImageUrl(res?.data?.data?.image?.url);
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: res?.data?.data?.image?.url
          }

          axios.post(`https://doctors-portal-server-beige.vercel.app/doctors`, doctor, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('AccessToken')}`
            }
          })
            .then(res => {
              if (res?.data?.data?.acknowledged) {
                reset();
                setFiles([])
                toast.success(`${data.name} is added successfully!`);
                navigate('/dashboard/manage-doctors');
              }
            })
            .catch(err => {
              console.log(err);
              toast.error("Can't added !!")
            });
        }
      })
      .catch(err => {
        console.log(err);
      })
  };




  // console.log(files[0]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container mx-auto min-h-screen bg-[#F1F5F9] px-6 md:px-6 lg:px-10'>
      <h2 className='text-2xl font-bold pt-11 pb-7'>Add A New Doctor</h2>
      <div className='md:w-4/6 lg:w-2/4 p-12 bg-white rounded-[10px]'>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full">
            <label className='text-sm font-semibold mb-1'>Name</label>
            <input {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              type='text'
              className="w-full inline-block py-3 border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.name?.type === 'required' && <p className='text-red-600 text-sm'>Name is required</p>}
          </div>
          <div className="form-control w-full my-2">
            <label className='text-sm font-semibold mb-1'>Email</label>
            <input {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
              type='email'
              aria-invalid={errors.email ? "true" : "false"}
              className="w-full inline-block py-3 border-[1px] border-accent pl-3 rounded-[10px]" />
            {errors.email && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full">
            <label className='text-sm font-semibold mb-1'> Specialty</label>
            <select {...register("specialty", { required: true })}
              className="w-full text-sm font-semibold inline-block py-3 border-[1px] border-accent pl-3 rounded-[10px]"
              defaultValue={'Select'}
            >
              <option disabled value='Select'>Please Select a Specialty</option>
              {
                specialties?.map(specialty => <option
                  key={specialty?._id}
                  value={specialty?.name}>
                  {specialty?.name}
                </option>)
              }
            </select>
          </div>
          <div>
            <div {...getRootProps({ className: 'border-dashed border-2 w-full py-9 mt-11 rounded-lg cursor-pointer' })}>
              <input {...getInputProps()} />
              <p className='text-base text-center text-base-300 mb-1' >Upload Your Photo</p>
              <div className='flex justify-center'>
                <img src={uploadImage} alt="uploadImageIcons" />
              </div>

            </div>

            <aside
              className='flex flex-wrap mt-4'
            >
              {thumbs}
            </aside>
          </div>
          <input className='w-full btn text-white btn-accent mt-8' type="submit" value='Add A Doctor' />
        </form>
      </div >
    </div >
  );
};

export default AddDoctor;