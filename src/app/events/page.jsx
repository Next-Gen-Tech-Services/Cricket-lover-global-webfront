import React from 'react';
import EventList from './_component/events1';
import EventPage from './_component/events2';
import News from '../home/_component/news';

function Event() {
    return (
        <div>
            <EventList/>
            <News/>
            {/* <EventPage/> */}
            
        </div>
    );
}

export default Event;