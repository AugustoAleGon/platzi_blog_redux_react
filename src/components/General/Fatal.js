import React from 'react';

const Fatal = (props) => (
    <h2 className="center red">
        {props.error}
    </h2>
);

export default Fatal;