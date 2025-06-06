import formateDate from '../../Doctors/formateDate'

const Appointments = ({ appointments }) => {
    return (
        <table className='w-full text-left text-sm text-gray-600 border-collapse border border-gray-200'>
            <thead className='bg-gray-100 text-gray-700 uppercase text-xs'>
                <tr>
                    <th scope='col' className='px-6 py-3 border border-gray-200'>Patient</th>
                    <th scope='col' className='px-6 py-3 border border-gray-200'>Gender</th>
                    <th scope='col' className='px-6 py-3 border border-gray-200'>Payment Status</th>
                    <th scope='col' className='px-6 py-3 border border-gray-200'>Booked On</th>
                </tr>
            </thead>

            <tbody>
                {appointments?.map(item => (
                    <tr key={item._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                        <th
                            scope='row'
                            className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap border border-gray-200'
                        >
                            <img
                                src={item?.user?.photo || '/default-avatar.png'}
                                alt={item?.user?.name || 'User'}
                                className='w-10 h-10 rounded-full object-cover'
                            />
                            <div className='pl-3'>
                                <div className='text-base font-semibold'>{item?.user?.name || 'N/A'}</div>
                                <div className='text-xs text-gray-500'>{item?.user?.email || 'N/A'}</div>
                            </div>
                        </th>

                        <td className='px-6 py-4 border border-gray-200 capitalize'>{item?.user?.gender || 'N/A'}</td>

                        <td className='px-6 py-4 border border-gray-200'>
                            {item.isPaid ? (
                                <div className='flex items-center text-green-600 font-semibold'>
                                    <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
                                    Paid
                                </div>
                            ) : (
                                <div className='flex items-center text-red-600 font-semibold'>
                                    <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>
                                    Unpaid
                                </div>
                            )}
                        </td>

                        <td className='px-6 py-4 border border-gray-200'>{formateDate(item.createdAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Appointments;