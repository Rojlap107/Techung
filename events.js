// Tour Events Data (fallback; will be overridden by JSON if available)
const tourEvents = [
    {
        date: "2026-04-01",
        venue: "Not Fixed",
        location: "India",
        time: "8:00 PM",
        details: "I am planning a India Tour next year. Once there are more details, I will update here."
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