'use client'
import Link from 'next/link'
import SchoolForm from '@/components/SchoolForm'

const AddSchool = () => {
  return (
    <div className='w-full flex flex-col gap-5'>
      <Link
        href={'/show-schools'}
        className='rounded-md w-fit hover:bg-blue-700 px-5 py-2 ring-1 hover:ring-blue-700 hover:text-white transition  focus:outline-none '
      >
        Go Back
      </Link>

      <SchoolForm />
    </div>
  )
}

export default AddSchool
