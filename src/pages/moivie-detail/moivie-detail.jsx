import React from 'react';
import Detail from '../../modules/detail/detail';
import ShowTimes from '../../modules/show-times/show-times';

export default function MovieDetail() {
    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 px-5 bg-light">
                        <Detail />
                    </div>
                    <div className="col-12 mt-5 py-5 px-5 bg-light">
                        <ShowTimes />
                    </div>
                </div>
            </div>
        </div >
    )
}
