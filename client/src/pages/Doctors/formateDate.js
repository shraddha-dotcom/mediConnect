
const formateDate = (dateString) => {
    if (!dateString) return 'Invalid Date';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
}

export default formateDate
