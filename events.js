// Tour Events Data
const tourEvents = [
    {
        date: "2025-01-15",
        venue: "New York Cultural Center",
        location: "New York, NY",
        time: "8:00 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-02-22",
        venue: "Tibetan Community Center",
        location: "San Francisco, CA", 
        time: "7:30 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-03-10",
        venue: "World Music Festival",
        location: "Los Angeles, CA",
        time: "6:00 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-04-18",
        venue: "Carnegie Hall",
        location: "New York, NY",
        time: "8:00 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-05-25",
        venue: "Buddhist Temple",
        location: "Seattle, WA",
        time: "7:00 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-06-12",
        venue: "Cultural Arts Center",
        location: "Chicago, IL",
        time: "7:30 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-07-30",
        venue: "Rubin Museum",
        location: "New York, NY",
        time: "6:30 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-08-15",
        venue: "Dharma Center",
        location: "Boulder, CO",
        time: "7:00 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-09-20",
        venue: "Tibet House",
        location: "New York, NY",
        time: "7:30 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-10-08",
        venue: "Potala Cultural Center",
        location: "Minneapolis, MN",
        time: "6:00 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-11-12",
        venue: "Himalayan Cultural Festival",
        location: "Portland, OR",
        time: "8:00 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-11-25",
        venue: "Buddhist Meditation Center",
        location: "Austin, TX",
        time: "7:00 PM",
        ticketUrl: "#"
    },
    {
        date: "2025-12-18",
        venue: "Winter Solstice Concert",
        location: "Santa Fe, NM",
        time: "6:30 PM",
        ticketUrl: "#"
    }
];

// Function to get upcoming events (sorted by date)
function getUpcomingEvents(limit = null) {
    const today = new Date();
    const upcoming = tourEvents
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