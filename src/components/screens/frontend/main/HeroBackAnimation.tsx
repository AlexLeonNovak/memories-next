'use client';

import React from 'react';
import './css/hero.css';
import { isMobile } from 'react-device-detect';

const NUMBER_OF_ROWS = 2;
const NUMBER_OF_CELLS = 7;

export const HeroBackAnimation = () => {
    let suqareCounter = 0;
    const rows = [];
    for (let rowCounter = 1; rowCounter <= NUMBER_OF_ROWS; rowCounter++) {
        const cells = [];
        for (
            let cellCounter = 1;
            cellCounter <= NUMBER_OF_CELLS;
            cellCounter++
        ) {
            suqareCounter++;
            cells.push(
                <div
                    key={`${rowCounter.toString()}_${cellCounter.toString()}`}
                    className={`hero-square hero-square-${suqareCounter}`}
                    style={{
                        backgroundImage: `url('/hero-images/${rowCounter}_${cellCounter}.jpg')`,
                    }}
                ></div>
            );
        }
        rows.push(
            <div key={rowCounter.toString()} className="hero-square-line">
                {cells}
            </div>
        );
    }

    return <div className="hero-square-lines">{rows}</div>;
};
