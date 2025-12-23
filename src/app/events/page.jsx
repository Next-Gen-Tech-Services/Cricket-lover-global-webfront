"use client";
import React from 'react';
import News from '../home/_component/news';
import ProtectedRoute from '@/component/protectroute';
import EventPage from './_component/events1';
import EventList from './_component/events2';
import { usePageSEO } from "@/utils/useSEO";
import { pageMetadata } from "../configs/seo.config";


function Event() {
    usePageSEO({
        title: pageMetadata.events.title,
        description: pageMetadata.events.description,
        keywords: pageMetadata.events.keywords,
    });

    return (
        <ProtectedRoute>
            {/* <EventList/> */}
            <EventPage />
            <News/>
            </ProtectedRoute>
           
            
       
    );
}

export default Event;