// in order to correct calculations better to store all values in integer instead of decimals and format it using Intl.NumberFormat
export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100);
}

export const getUniqueValues = (data, type) => {
    // use dynamic values as index
    let unique = data.map((item) => item[type]);
    // instead of getting array of arrays get all elements in same level
    if (type === 'colors') {
        unique = unique.flat()
    }
    // get array with unique values and 'all' element
    return ['all', ...new Set(unique)]
}
