# scoredle

A way to record, track, and compare friends and families wordle and worldle scores.

- created using `npm create vite@latest`

[![Netlify Status](https://api.netlify.com/api/v1/badges/18e481ae-2948-4d07-8443-01942760b1b6/deploy-status)](https://app.netlify.com/sites/scoredle/deploys)

## Todos

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

```javascript
/*
  #Worldle #44 X/6 (96%)
  🟩🟩🟩🟩⬛↙️
  🟩🟩🟩🟨⬛➡️
  🟩🟩🟩🟩⬛⬇️
  🟩🟩🟩🟩🟨↙️
  🟩🟩🟩🟩🟨⬇️
  🟩🟩🟩🟩🟨↗️
*/
```

`🟩 green square emoji ❎`

`🟨 yellow square emoji 🆚`

`⬛ black square emoji`

`⬜ white square emoji`

```javascript
// 0 = gray box, 1 = yellow box, 2 = green box
[
  {
    date: "Sun Feb 27 2022",
    scores: [
      {
        name: "Al",
        worldleScore: [],
        score: [
          [0, 0, 1, 1, 2],
          [1, 1, 1, 1, 2],
          [0, 1, 2, 1, 0],
          [2, 2, 2, 2, 2],
        ],
        wordle: "#235",
        worldle: "#14",
      },
    ],
    wordle: "#235",
    worldle: "#14",
  },
];
```

```json
[
  {
    "user": "user_a",
    "dontShowUsers": []
  },
  {
    "user": "user_b",
    "dontShowUsers": ["user_a"]
  }
]
```

## Netlify how to

`netlify dev`
