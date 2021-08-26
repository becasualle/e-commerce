// in order to correct calculations better to store all values in integer instead of decimals and format it using Intl.NumberFormat
export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100);
}

export const getUniqueValues = () => { }
