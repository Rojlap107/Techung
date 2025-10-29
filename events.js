// Tour Events Data (fallback; will be overridden by JSON if available)
const tourEvents = [
    {
        date: "2025-10-31",
        venue: "ནང་མ་དང་སྟོད་གཞས། Nangma and Toeshey",
        location: "Mani Lhakhang, Kalimpong, India",
        time: "16:00",
        details: "Big news, everyone! I am coming to Kalimpong this October. <br>Your energy and support mean everything, and I promise this tour will be unforgettable!<br><img src='img/events/kalimpong-event-2025.jpg' alt='Kalimpong Event' style='max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;'>"
    },
    {
        date: "2025-11-01",
        venue: "ནང་མ་དང་སྟོད་གཞས། Nangma and Toeshey",
        location: "Sambhota Tibetan School, Darjeeling, India",
        time: "16:00",
        details: "Big news, everyone! I am coming to Darjeeling this November. <br>Your energy and support mean everything, and I promise this tour will be unforgettable!<br><img src='img/events/darjeeling-event-2025.jpg' alt='Darjeeling Event' style='max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;'>"
    },
    {
        date: "2025-11-02",
        venue: "ནང་མ་དང་སྟོད་གཞས། Nangma and Toeshey",
        location: "Cholka Sum Hall, Gangtok, India",
        time: "16:00",
        details: "Big news, everyone! I am coming to Gangtok this November. <br>Your energy and support mean everything, and I promise this tour will be unforgettable!<br><img src='img/events/gangtok-event-2025.jpg' alt='Gangtok Event' style='max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;'>"
    },
    {
        date: "2025-11-15",
        venue: "ནང་མ་དང་སྟོད་གཞས། Nangma and Toeshey",
        location: "TIPA Hall, Dharamsala, India",
        time: "17:30",
        details: "Big news, everyone! I am coming to Dharamsala this November. <br>Your energy and support mean everything, and I promise this tour will be unforgettable!<br><img src='img/events/dharamsala-event-2025.jpg' alt='Dharamsala Event' style='max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;'>"
    },
    {
        date: "2025-10-25",
        venue: "Techung Boby DeVito",
        location: "Temple Road, Mcloed Ganj, Dharamsala (opposite to Ropeway, near parking ground)",
        time: "17:00",
        details: "<img src='img/events/khadhok-event-2025.jpg' alt='Dharamsala Event' style='max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;'>"
    },
    {
        date: "2025-11-03",
        venue: "ནང་མ་དང་སྟོད་གཞས། Nangma and Toeshey",
        location: "Rumtek Dharma, Chakra Centre, Sikkim",
        time: "14:00",
        details: "<img src='img/events/sikkim-event-2025.jpg' alt='Sikkim Event' style='max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;'>"
    },
    {
        date: "2025-11-05",
        venue: "ནང་མ་དང་སྟོད་གཞས། Nangma and Toeshey",
        location: "Kalachakra Monastery Ground, Salugara",
        time: "16:00",
        details: "<img src='img/events/salugara-event-2025.jpg' alt='Salugara Event' style='max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;'>"
    },
];

// Prefetch tours JSON to override fallback when available
let _tourCache = null;
(function prefetchTours() {
    try {
        fetch('data/tours.json?_=' + Date.now())
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(json => { if (Array.isArray(json)) { _tourCache = json; } })
            .catch(() => {});
    } catch (e) {}
})();

// Function to get upcoming events (sorted by date)
function getUpcomingEvents(limit = null) {
    const source = (Array.isArray(_tourCache) && _tourCache.length > 0) ? _tourCache : tourEvents;
    const today = new Date();
    const upcoming = source
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return limit ? upcoming.slice(0, limit) : upcoming;
}

// Function to get past events (sorted by date, most recent first)
function getPastEvents(limit = null) {
    const source = (Array.isArray(_tourCache) && _tourCache.length > 0) ? _tourCache : tourEvents;
    const today = new Date();
    const past = source
        .filter(event => new Date(event.date) < today)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return limit ? past.slice(0, limit) : past;
}

// Function to format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    return {
        month: months[date.getMonth()],
        day: date.getDate().toString().padStart(2, '0'),
        year: date.getFullYear()
    };
}

// Function to format date for tour page
function formatDateFull(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}