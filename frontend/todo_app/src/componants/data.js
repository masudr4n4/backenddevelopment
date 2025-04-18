export let WINNER_COMB = [
    [
        {row:0,col:0},//header top row
        {row:0,col:1},
        {row:0,col:2}
    ],
    [
        {row:0,col:0},//left side first col
        {row:1,col:0},
        {row:2,col:0}
    ],
    [
        {row:2,col:0},//bottom side last row
        {row:2,col:1},
        {row:2,col:2}

    ],
    [
        {row:0,col:2},//right side last col
        {row:1,col:2},
        {row:2,col:2}
    ],
    [
        {row:0,col:1},//middle row horizontal
        {row:1,col:1},
        {row:2,col:1}
    ],
    [
        {row:1,col:0},//middle row vertical
        {row:1,col:1},
        {row:1,col:2}
    ],
    [
        {row:0,col:0},//cross top left to bottom right
        {row:1,col:1},
        {row:2,col:2}
    ],
    [
        {row:0,col:2},//cross top right to bottom left
        {row:1,col:1},
        {row:2,col:0}
    ]
]