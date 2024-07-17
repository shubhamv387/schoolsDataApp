const SchoolCard = ({ school }) => {
  return (
    <div className='bg-gray-800 w-full max-w-96 text-white rounded-lg overflow-hidden shadow-md flex flex-col'>
      <img
        src={`/uploads/${school.image}`}
        alt={school.name}
        className='h-56 w-full object-cover'
      />
      <div className='p-4'>
        <h3 className='text-xl font-semibold mb-2'>{school.name}</h3>
        <div className='flex items-center text-white text-sm mb-2'>
          <p className='text-zinc-300'>{school.city}</p>
        </div>
        <p className='text-zinc-300'>{school.address}</p>
      </div>
    </div>
  );
};

export default SchoolCard;
