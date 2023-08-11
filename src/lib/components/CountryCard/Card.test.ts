import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/svelte';
import type { CountryCardProps } from './Card.types';
import Card from './Card.svelte';
import { formatPopulation, getDetailURL } from '$lib/utils';

beforeEach(cleanup);

const testProps: CountryCardProps[] = [
	{
		flagURL: 'https://flagcdn.com/ni.svg',
		country: 'Nicaragua',
		population: 6624554,
		region: 'Americas',
		capital: 'Managua',
		cca3: 'NIC'
	},
	{
		flagURL: 'https://flagcdn.com/pr.svg',
		country: 'Puerto Rico',
		population: 3194034,
		region: 'Americas',
		capital: 'San Juan',
		cca3: 'PRC'
	},
	{
		flagURL: 'https://flagcdn.com/la.svg',
		country: 'Laos',
		population: 7275556,
		region: 'Asia',
		capital: 'Vientiane',
		cca3: 'LAO'
	},
	{
		flagURL: 'https://flagcdn.com/jo.svg',
		country: 'Jordan',
		population: 10203140,
		region: 'Asia',
		capital: 'Amman',
		cca3: 'JOR'
	},
	{
		flagURL: 'https://flagcdn.com/md.svg',
		country: 'Moldova',
		population: 2617820,
		region: 'Europe',
		capital: 'Chișinău',
		cca3: 'MOL'
	},
	{
		flagURL: 'https://flagcdn.com/st.svg',
		country: 'São Tomé and Príncipe',
		population: 219161,
		region: 'Africa',
		capital: 'São Tomé',
		cca3: 'STP'
	},
	{
		flagURL: 'https://flagcdn.com/nu.svg',
		country: 'Niue',
		population: 1470,
		region: 'Oceania',
		capital: 'Alofi',
		cca3: 'NIU'
	}
];

describe(Card.name, () => {
	const { getByRole, getByLabelText } = screen;
	testProps.forEach((props) => {
		it('should render the card element', () => {
			render(Card, { ...props });
			const cardEl = getByRole('link', { name: 'country-card' });
			expect(cardEl).not.toBeNull();
			expect(cardEl.tagName).toBe('A');
			expect(cardEl.classList.contains('bg-dark-text')).toBe(true);
			expect(cardEl.classList.contains('dark:bg-dark-el')).toBe(true);
			expect(cardEl.getAttribute('href')).toMatch(getDetailURL(props.cca3));
		});
		it('should render flag with alt text', () => {
			render(Card, { ...props });
			const flagEl = getByRole('img', { name: 'flag-image' });
			expect(flagEl).not.toBeNull();
			expect(flagEl.classList.contains('object-cover')).toBe(true);
			expect(flagEl.getAttribute('src')).toBe(props.flagURL);
			expect(flagEl.getAttribute('alt')).toBe(`Official flag of ${props.country}`);
		});
		it('should render the country official name as a heading text', () => {
			render(Card, { ...props });
			const headingEl = getByRole('heading', { level: 2 });
			expect(headingEl).not.toBeNull();
			expect(headingEl.textContent).toBe(props.country);
		});
		it("should render the country's population", () => {
			render(Card, { ...props });
			const populationEl = getByLabelText('population');
			expect(populationEl).not.toBeNull();
			expect(populationEl.tagName).toBe('SPAN');
			expect(populationEl.textContent).toBe(formatPopulation(props.population));
		});
		it("should render the country's region", () => {
			render(Card, { ...props });
			const regionEl = getByLabelText('region');
			expect(regionEl).not.toBeNull();
			expect(regionEl.tagName).toBe('SPAN');
			expect(regionEl.textContent).toBe(props.region);
		});
		it("should render the country's capital", () => {
			render(Card, { ...props });
			const capitalEl = getByLabelText('capital');
			expect(capitalEl).not.toBeNull();
			expect(capitalEl.tagName).toBe('SPAN');
			expect(capitalEl.textContent).toBe(props.capital);
		});
	});
});
