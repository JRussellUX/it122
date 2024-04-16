const holidays = [
    {
        name: 'Christmas',
        season: 'Winter',
        feeling: 'Jolly',
        colors: 'Red, Green'
        
    },
    {
        name: 'Halloween',
        season: 'Fall',
        feeling: 'Spooky',
        colors: 'Black, Orange'
    },
    {
        name: 'Valentines Day',
        season: 'Winter',
        feeling: 'Romantic',
        colors: 'Pink, Red'
    },
    {
        name: 'Independence Day',
        season: 'Summer',
        feeling: 'Patriotic',
        colors: 'Red, White, Blue'
    },
    {
        name: 'New Years',
        season: 'Winter',
        feeling: 'Festive',
        colors: 'Black, Gold'
    }
    
];

function getAll() {
    return holidays;
}

function getItem(name) {
    for (let i=0; i< holidays.length; i++) {
        if(name === holidays[i].name){
            return holidays[i];
        }

    }

    return undefined;
}

export { getAll, getItem };


    