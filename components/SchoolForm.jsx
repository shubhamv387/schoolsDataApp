import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const SchoolForm = () => {
  const router = useRouter()
  const imageInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formattedValue, setFormattedValue] = useState('')

  const formatNumber = (value) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '')

    // Format the value based on the length
    if (!numericValue.length) return ''
    else if (numericValue.length <= 2) {
      return `+91 ${numericValue}`
    } else if (numericValue.length <= 6) {
      return `+91 (${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`
    } else if (numericValue.length <= 10) {
      return `+91 (${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`
    } else {
      return `+91 (${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6, 10)}`
    }
  }

  const handleChange = (e) => {
    const value = e.target.value

    // Update the raw value without any formatting
    const raw = value.length >= 2 ? value.replace(/\D/g, '').slice(2, 12) : value.replace(/\D/g, '') // Limit to 10 digits

    // Format the value and update the state
    const formatted = formatNumber(raw)
    setFormattedValue(formatted)

    // Update the form value and trigger validation
    setValue('contact', raw, { shouldValidate: true })
    trigger('contact')
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    setError,
    trigger,
    formState: { errors },
  } = useForm()

  const handleImageChange = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      setValue('image', files)
      clearErrors('image')
    } else {
      setValue('image', '')
      setError('image', { message: 'Image is required' })
    }
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const formData = new FormData()
    Object.keys(data).forEach((key) => formData.append(key, data[key]))
    formData.append('file', data.image[0])

    try {
      const response = await axios.post('http://localhost:3000/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success(response.data.message)
      router.push('/show-schools')
      router.refresh()

      reset()
    } catch (error) {
      console.log(error)

      const err = error.response?.data?.message || error.message || 'Something went wrong!'
      toast.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full max-w-3xl bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Add School Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-1 gap-x-4 md:grid-cols-2'>
          <div className='mb-4 md:col-span-2'>
            <label className='block text-sm  mb-2' htmlFor='name'>
              School name
            </label>
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'At least 2 character' },
              })}
              autoComplete='off'
              onBlur={() => trigger('name')}
              onKeyUp={() => trigger('name')}
              className={`shadow appearance-none bg-transparent border ${
                errors.name ? 'border-red-400 focus:focus:border-red-400' : 'border-slate-500 focus:border-slate-100'
              } rounded w-full py-2 px-3 leading-tight focus:outline-none transition-colors focus:shadow-outline`}
              name='name'
              type='text'
              placeholder='School Name'
            />
            {errors.name && <p className='text-red-400 text-sm mt-1'>{errors.name.message}</p>}
          </div>

          <div className='mb-4'>
            <label className='block text-sm  mb-2' htmlFor='email_id'>
              Email ID
            </label>
            <input
              {...register('email_id', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              autoComplete='off'
              onBlur={() => trigger('email_id')}
              onKeyUp={() => trigger('email_id')}
              className={`shadow appearance-none bg-transparent border ${
                errors.email_id
                  ? 'border-red-400 focus:focus:border-red-400'
                  : 'border-slate-500 focus:border-slate-100'
              } rounded w-full py-2 px-3 leading-tight focus:outline-none transition-colors focus:shadow-outline`}
              name='email_id'
              type='email'
              placeholder='Email Address'
            />
            {errors.email_id && <p className='text-red-400 text-sm mt-1'>{errors.email_id.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm  mb-2' htmlFor='address'>
              Address
            </label>
            <input
              {...register('address', {
                required: 'Address is required',
                minLength: { value: 3, message: 'Address must be at least 3 characters' },
                maxLength: { value: 100, message: 'Address must be at most 100 characters' },
                pattern: {
                  value: /^[A-Za-z0-9\s,'-]*$/,
                  message: 'Address can only contain letters, numbers, spaces, commas, apostrophes, and hyphens',
                },
              })}
              autoComplete='off'
              onBlur={() => trigger('address')}
              onKeyUp={() => trigger('address')}
              className={`shadow appearance-none bg-transparent border ${
                errors.address ? 'border-red-400 focus:focus:border-red-400' : 'border-slate-500 focus:border-slate-100'
              } rounded w-full py-2 px-3 leading-tight focus:outline-none transition-colors focus:shadow-outline`}
              name='address'
              type='text'
              placeholder='Address'
            />
            {errors.address && <p className='text-red-400 text-sm mt-1'>{errors.address.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm  mb-2' htmlFor='city'>
              City
            </label>
            <input
              {...register('city', {
                required: 'City is required',
                minLength: {
                  value: 2,
                  message: 'At least 2 character',
                },
              })}
              autoComplete='off'
              onBlur={() => trigger('city')}
              onKeyUp={() => trigger('city')}
              className={`shadow appearance-none bg-transparent border ${
                errors.city ? 'border-red-400 focus:focus:border-red-400' : 'border-slate-500 focus:border-slate-100'
              } rounded w-full py-2 px-3 leading-tight focus:outline-none transition-colors focus:shadow-outline`}
              name='city'
              type='text'
              placeholder='City'
            />
            {errors.city && <p className='text-red-400 text-sm mt-1'>{errors.city.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm  mb-2' htmlFor='state'>
              State
            </label>
            <input
              {...register('state', {
                required: 'State is required',
                minLength: {
                  value: 2,
                  message: 'At least 2 character',
                },
              })}
              autoComplete='off'
              onBlur={() => trigger('state')}
              onKeyUp={() => trigger('state')}
              className={`shadow appearance-none bg-transparent border ${
                errors.state ? 'border-red-400 focus:focus:border-red-400' : 'border-slate-500 focus:border-slate-100'
              } rounded w-full py-2 px-3 leading-tight focus:outline-none transition-colors focus:shadow-outline`}
              name='state'
              type='text'
              placeholder='State'
            />
            {errors.state && <p className='text-red-400 text-sm mt-1'>{errors.state.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm  mb-2' htmlFor='image'>
              Image
            </label>

            <input
              {...register('image', { required: 'Image is required' })}
              onBlur={() => trigger('image')}
              ref={imageInputRef}
              className={`shadow appearance-none bg-transparent border ${
                errors.image ? 'border-red-400 focus:focus:border-red-400' : 'border-slate-500 focus:border-slate-100'
              } rounded w-full py-1.5 px-3 leading-tight focus:outline-none transition-colors focus:shadow-outline`}
              name='image'
              id='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
            />
            {errors.image && <p className='text-red-400 text-sm mt-1'>{errors.image.message}</p>}
          </div>

          <div className='mb-6'>
            <label className='block text-sm  mb-2' htmlFor='contact'>
              Contact
            </label>
            <input
              {...register('contact', {
                required: 'Contact number is required',
                minLength: {
                  value: 10,
                  message: 'Number must have 10 digits',
                },
                pattern: {
                  value: /^[6-9]\d{9}/,
                  message: 'First digit should be between 6 to 9',
                },

                onChange: handleChange,
              })}
              autoComplete='off'
              value={formattedValue}
              onBlur={() => trigger('contact')}
              className={`shadow appearance-none bg-transparent border ${
                errors.contact ? 'border-red-400 focus:border-red-400' : 'border-slate-500 focus:border-slate-100'
              } rounded w-full py-2 px-3 leading-tight focus:outline-none transition-colors focus:shadow-outline`}
              name='contact'
              type='text'
              placeholder='Contact Number'
            />
            {errors.contact && <p className='text-red-400 text-sm mt-1'>{errors.contact.message}</p>}
          </div>

          <div className='flex items-center justify-between self-end transition-all'>
            <button
              className={`${
                isLoading ? 'bg-blue-300 hover:bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'
              } w-full text-white font-semibold py-2 px-4 rounded focus:outline-none transition-colors focus:shadow-outline`}
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SchoolForm
