/**
 * this function converts a country name into a slug string
 * eg. United States of America ==> united+states+of+america
 * @param countryName string
 * @returns string
 */
export function getDetailURL(countryName: string): string {
    return `/detail/${countryName.toLowerCase().split(' ').join('+')}`
}

/**
 * this function converts a url slug parameter into a country name
 * eg. united+states+of+america ==>  united states of america
 * @param countryName string
 * @returns string
 */
export function getCountryFromURL(urlParam: string): string {
    return urlParam.split('+').join(' ')
}


/**
 * This function converts a numer value into a comma separated stringified value
 * e.g - 123456789 ==> "123,456,789"
 * @param population number
 * @returns string
 */
export function formatPopulation(population: number): string {
    return new Intl.NumberFormat('en-US', {
        signDisplay: 'never',
        maximumSignificantDigits: 3,
        useGrouping: true
    }).format(population);
}