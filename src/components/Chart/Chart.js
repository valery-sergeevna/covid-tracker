import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../api/';

import styles from './Chart.module.css';

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {

        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchAPI();

    }, [dailyData]);


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
                            }]
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

                        },
                        ],

                    }}
                />) : null
    )


    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    );
};

export default Chart;