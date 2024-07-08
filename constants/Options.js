export const SelectTravelersList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole travel in exploration',
        icon: '✈️',
        people: 'One Person'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Two travelers in tandem',
        icon: '🧑‍🤝‍🧑',
        people: 'Two People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adventurers',
        icon: '🏠',
        people: 'Three to Five People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '⛵',
        people: 'Five to Ten People'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💴'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: '💸'
    }
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days and {totalNights} Night for {traveler} with a {budget} budget with a Flight details, Flight price with booking URL, Hotels options list with hotel name, hotel address , approximate price , hotel image URL, geo coordinates, rating, descriptions and places to visit nearby with place name, place details, Place image URL, Geo coordinates, approximate ticket pricing, Time to travel to each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format.'