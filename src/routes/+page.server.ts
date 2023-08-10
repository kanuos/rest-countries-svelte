import type { PageServerLoad } from "./$types"


// A loose schema describing the incoming country element
export type CountryResponseType = {
    name: { common: string },
    flags: { svg: string },
    capital: string[]
    region: string
    population: number
}

export const load: PageServerLoad = async () => {
    // requesting REST Countries API as a Proxy API
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region");
    const countryList = await response.json() as CountryResponseType[];

    // stores all the unique regions for the filtering purposes
    const regions = new Set<string>();

    countryList.forEach((el: { region: string }) => {
        regions.add(el.region)
    })

    return {
        countryList : countryList.sort((a,b) => a.name.common.localeCompare(b.name.common)),
        regions: [...regions]
    }
}