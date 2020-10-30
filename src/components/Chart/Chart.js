import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../api/';

import styles from './Chart.module.css';

const Chart = ({ data, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {

        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchAPI();

    }, []);

    const barChart = (
        data.confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                            data: [data.confirmed.value, data.recovered.value, data.deaths.value],
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                }}
            />
        ) : null
    );

    const lineChart = (
        dailyData.length
            ? (
                <Line
                    options={{
                        scales: {
                            xAxes: [{
                                ticks: {
                                    maxRotation: 90,
                                    minRotation: 90
                                }
                            }],
                        },
                        legend: {
                            display: true,
                            labels: {
                                fontSize: 14
                            }
                        }
                    }}
                    data={{
                        labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),

                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            backgroundColor: 'rgba(0, 0, 255, 0.2)',
                            fill: true,
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
                            fill: true,

                        }, {
                            data: dailyData.map((data) => data.recovered),
                            label: 'Recovered',
                            borderColor: 'green',
                            backgroundColor: 'rgba(0, 255, 0, 0.5)',
                            fill: true,
                        },
                        ],
                    }}
                />) : null
    )


    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;