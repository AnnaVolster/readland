import React, { useState } from 'react';
import '../style/pagginationNumber.css'; // Добавьте стили для Header

const PagginationNumber = () => {
            return (
        <div className='frame-11w'>
            <button className='button'>
                <div className='button-base'>
                    <div className='arrow-left'>
                        <div className='icon' />
                    </div>
                    <span className='text-12'>Назад</span>
                </div>
            </button>
            <div className='pagination-numbers'>
                <div className='pagination-number-base'>
                    <button className='content'>
                        <span className='number'>1</span>
                    </button>
                </div>
                <div className='pagination-number-base-13'>
                    <div className='content-14'>
                        <span className='number-15'>2</span>
                    </div>
                </div>
                <div className='pagination-number-base-16'>
                    <div className='content-17'>
                        <span className='number-18'>3</span>
                    </div>
                </div>
                <div className='pagination-number-base-19'>
                    <div className='content-1a'>
                        <span className='number-1b'>...</span>
                    </div>
                </div>
                <div className='pagination-number-base-1c'>
                    <div className='content-1d'>
                        <span className='number-1e'>8</span>
                    </div>
                </div>
                <div className='pagination-number-base-1f'>
                    <div className='content-20'>
                        <span className='number-21'>9</span>
                    </div>
                </div>
                <div className='pagination-number-base-22'>
                    <div className='content-23'>
                        <span className='number-24'>10</span>
                    </div>
                </div>
            </div>
            <button className='button-25'>
                <div className='button-base-26'>
                    <span className='text-forward'>Вперед</span>
                    <div className='arrow-right'>
                        <div className='icon-27' />
                    </div>
                </div>
            </button>
        </div>
    );
};

export default PagginationNumber;
