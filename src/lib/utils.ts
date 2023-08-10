import type { CountryResponseType } from "../routes/proxy+page.server";
import type { CountryCardProps } from "./components/CountryCard/Card.types";

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

/**
 * This function takes a list  of Server Response from REST Countries morphed as a custom type, 
 * a string region and a string search keyword and filters the list first with the keyword and then with the region name
 * The output is  modified as an array of objects that satisfies the Card component props
 * @param list CountryResponseType[]
 * @param region string
 * @param keyword string
 * @returns CountryCardProps[]
 */
export function getFilteredList(list: CountryResponseType[], region: string, keyword: string): CountryCardProps[] {

    return (keyword.trim().length === 0
        ? list
        : list.filter((el) =>
            el.name.common.toLowerCase().includes(keyword.toLowerCase())
        )
    ).filter((el) => (region.trim().length > 0 ? el.region === region : el)).map(({ region, population, capital, name, flags }) => ({
        capital: capital.join(","),
        country: name.common,
        flagURL: flags.svg,
        population,
        region
    }));
}