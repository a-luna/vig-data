import type { MlbSeason } from '$lib/api/types';

export const allSeasonsMockData: Partial<MlbSeason>[] = [
	{ year: 2017, start_date: '2017-04-02', end_date: '2017-10-01', asg_date: '2017-07-11' },
	{ year: 2018, start_date: '2018-03-29', end_date: '2018-10-01', asg_date: '2018-07-17' },
	{ year: 2019, start_date: '2019-03-28', end_date: '2019-09-29', asg_date: '2019-07-09' },
	{ year: 2020, start_date: '2020-07-23', end_date: '2020-09-27', asg_date: '0001-01-01' },
	{ year: 2021, start_date: '2021-04-01', end_date: '2021-10-03', asg_date: '2021-07-13' }
];
