# scoredle

A way to record, track, and compare friends and families wordle and worldle scores.

- created using `npm create vite@latest`

[![Netlify Status](https://api.netlify.com/api/v1/badges/18e481ae-2948-4d07-8443-01942760b1b6/deploy-status)](https://app.netlify.com/sites/scoredle/deploys)

```javascript
/*
    Wordle #230 3/6

    ⬛🟨⬛🟨⬛
    🟨🟩⬛🟩🟨
    🟩🟩🟩🟩🟩

    🟨⬛⬛⬛⬛
    ⬛⬛⬛⬛⬛
    🟩🟩⬛🟩⬛
    🟩🟩🟩🟩🟩
*/
```

`🟩 green square emoji ❎`

`🟨 yellow square emoji 🆚`

`⬛ black square emoji`

```javascript
// 0 = gray box, 1 = yellow box, 2 = green box
[
  {
    date: "Sun Feb 27 2022",
    scores: [
      {
        name: "Al",
        score: [
          [0, 0, 1, 1, 2],
          [1, 1, 1, 1, 2],
          [0, 1, 2, 1, 0],
          [2, 2, 2, 2, 2],
        ],
      },
    ],
    wordle: "#235",
  },
];
```

```json
[
  {
    "user": "user_a",
    "feed": [
      { "name": "user_b", "show": true },
      { "name": "user_c", "show": false }
    ]
  },
  {
    "user": "user_b",
    "feed": [
      { "name": "user_a", "show": true },
      { "name": "user_c", "show": false }
    ]
  },
  {
    "user": "user_c",
    "feed": [
      { "name": "user_a", "show": true },
      { "name": "user_b", "show": false }
    ]
  }
]
```

## Netlify how to

`netlify dev`
