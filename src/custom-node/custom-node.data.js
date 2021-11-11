module.exports = {
    links: [
        {
            source: 0,
            target: 2,
        },
        {
            source: 0,
            target: 3,
        },
        {
            source: 0,
            target: 4,
        },
        {
            source: 3,
            target: 4,
        },
    ],
    nodes: [
        {
            id: 0,
            name: "1 person",
            gender: "female",
            hasCar: false,
            hasBike: false,
        },
        {
            id: 2,
            name: "2 person",
            gender: "male",
            hasCar: false,
            hasBike: true,
        },
        {
            id: 3,
            name: "3 person",
            gender: "male",
            hasCar: true,
            hasBike: true,
        },
        {
            id: 4,
            name: "Melanie",
            gender: "female",
            hasCar: true,
            hasBike: false,
        },
    ],
};
