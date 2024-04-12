const holidays = [
    {
        key: 'christmas',
        name: 'Christmas',
        season: 'Winter',
        feeling: 'Jolly',
        colors: 'Red, Green'
        
    },
    {
        key: 'halloween',
        name: 'Halloween',
        season: 'Fall',
        feeling: 'Spooky',
        colors: 'Black, Orange'
    },
    {
        key: 'valentines',
        name: 'Valentines Day',
        season: 'Winter',
        feeling: 'Romantic',
        colors: 'Pink, Red'
    },
    {
        key: 'independence',
        name: 'Independence Day',
        season: 'Summer',
        feeling: 'Patriotic',
        colors: 'Red, White, Blue'
    },
    {
        key: 'newyears',
        name: 'New Years',
        season: 'Winter',
        feeling: 'Festive',
        colors: 'Black, Gold'
    }
    
];

function getAll() {
    return holidays;
}

function getItem(key) {
    for (let i=0; i< holidays.length; i++) {
        if(key === holidays[i].key){
            return holidays[i];
        }

    }

    return undefined;
}

export { getAll, getItem };


    