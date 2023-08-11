import { getCountryFromURL } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


type CountryMetadataType = {
    name: { common: string, official: string, nativeName: object },
    population: number,
    region: string,
    subregion: string[],
    borders?: { name: string, cca3: string }[],
    capital: string,
    tld: string[],
    currencies: { [k: string]: { name: string, symbol: string } }[]
    languages: { [k: string]: string }[]
    flags: {
        svg: string
    }
}

const BASE_URL = 'https://restcountries.com/v3.1';

export const load: PageServerLoad = async ({ params }) => {
    let { country } = params;

    // convert + delimited country name to space delimited name  - e.g. south+korea ==> south korea
    country = getCountryFromURL(country)

    const response = await fetch(`${BASE_URL}/alpha/${country}?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`, {
        method: "GET",
        headers: {
            "Application-type": "text/json"
        }
    })

    if (response.statusText !== "OK") {
        throw error(404, params.country)
    }

    // API responses with an array of one or more responses to check for partial text search
    const countryDetail = (await response.json()) as CountryMetadataType;


    if (countryDetail.borders) {
        const borderURLs = countryDetail.borders?.map(code => `${BASE_URL}/alpha/${code}?fields=name,cca3`);
        const allBorderInfo = await Promise.allSettled(
            borderURLs.map(url => fetch(url).then(res => res.json())))
            .then(responses => {
                return responses.map(r => r.status === "fulfilled" ? r.value : null)
            })
        countryDetail.borders = allBorderInfo.filter(el => !!el).map(el => ({ name: el.name.common, cca3: el.cca3 }));
    }

    return {
        countryDetail
    };
};


