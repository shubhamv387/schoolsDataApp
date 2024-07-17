// 'use client';
import SchoolCard from '@/components/SchoolCard';
import Link from 'next/link';

const getSchools = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/schools`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch school data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { schools: [] };
  }
};

const ShowSchools = async () => {
  const { schools } = await getSchools();

  return (
    <>
      <Link
        href={'/add-school'}
        className='text-center max-w-40 mt-4 rounded-md bg-blue-700 px-5 py-2 ring-1 ring-blue-700 text-white transition hover:bg-blue-600 focus:outline-none sm:mt-0 disabled:bg-blue-400'
      >
        Add School
      </Link>
      <div className='container px-2.5 md:px-3 mx-auto mt-8 grid place-content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {schools.length > 0 ? (
          schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))
        ) : (
          <p className='text-center col-span-4 mt-5 text-3xl'>No data found!</p>
        )}
      </div>
    </>
  );
};

export default ShowSchools;
