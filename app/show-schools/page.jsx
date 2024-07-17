// 'use client';
import SchoolCard from '@/components/SchoolCard';
import Link from 'next/link';

const getSchools = async () => {
  const sampleSchoolData = [
    {
      id: 1,
      name: 'RLB',
      city: 'Lucknow',
      address: 'Puraniya',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT00Pu2xDYhG7EiZYPTz-YOcj10R4qI6Z_GYw&s',
    },
    {
      id: 2,
      name: 'RLB 2',
      city: 'Lucknow',
      address: 'Munshi Puliya',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBvaFVo1ZclKd_28hE7_VYsXJazFTPDToHg&s',
    },
    {
      id: 3,
      name: 'RLB 3',
      city: 'Lucknow',
      address: 'Vikas Nager',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xrCJ_hoTAZ0speseZT_mslgtGuR5OXwfrQ&s',
    },
    {
      id: 4,
      name: 'RLB 4',
      city: 'Lucknow',
      address: 'Indira Nagar',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbB05pCu__X45eu0WsEghCUdcnu4D3eWcAd_H8UrUAgNvBHu05YKocToj8WkoElbTzjTY&usqp=CAU',
    },
    {
      id: 5,
      name: 'RLB 5',
      city: 'Lucknow',
      address: 'Lekhraj',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEOuWaNOGzRGi1l7W6jwUhJeF_ikWDihbq7jQ-2m7a8Q3gzXG5w-Wt5UfGBgZF9PDwMyQ&usqp=CAU',
    },
  ];
  try {
    const res = await fetch('http://localhost:3000/api/schools');
    if (!res.ok) throw new Error('Failed to fetch school data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { sampleSchoolData };
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
