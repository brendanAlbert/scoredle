import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { guid } from "../../helpers/helpers";
import { DirectionNumberToCharacterMap } from "../../constants/constants";

function WorldleScoreGrid({ worldleScore }) {
  const getArrow = (number) => {
    switch (number) {
      case 3:
      case 4:
        return downArrow();
      case 5:
      case 6:
        return downRightArrow();
      case 7:
      case 8:
        return rightArrow();
      case 9:
      case 10:
        return upRightArrow();
      case 11:
      case 12:
        return upArrow();
      case 13:
      case 14:
        return upLeftArrow();
      case 15:
      case 16:
        return leftArrow();
      case 17:
      case 18:
        return downLeftArrow();
      case 19:
        return partyIcon();
    }
  };

  const upArrow = () => (
    <img
      alt="⬆"
      height={"14px"}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURVJnev///22MqnGRsFNrgmJ+mGiGolt1jVJoflJpfoCkxHuevllyinaYt5GuyMvY45+60bvP4LDF1TJ3l68AAAAKdFJOUwH///+a///a2kU0s+//AAADWUlEQVRYw6WYi2KDIAxFKwitCoj8/8cu4RkErHaXVHlcj6HMbfJ6FS3z+5Hm5dURUJQSStwVOJVqWcuMCPlQyKtRyxspjG/mgTbOkPUmpEUJyZi2x/5IzmrGpFALyUcybR5iUIfRQEo5IYdri/1Q9sg7yKeu7NHl61bzTJoD50DtPmItf0olN5MxkGafEM7LHj/L4uwwpRlWa3XH4X7CuMOtsHqY0hsn5v4hnNwbZwYJWRdRNkWpVY26P14EKcHcZlx5AAW5fHQkTG7X/VH4MzD7mRl7JePcF4OfG4A2Y6OzvsC3jNmnaTfnfkNa8LAk0JWAg6Trpw5B8KiuY8/qJi9nxqY1ZwSe1ayriSUHHCIHSCsZI04sJSMvs665YmIzc6bJkjHiRKWM9Lb2tdmJyI5sq/4GMpQDX/jAtxXQ1rNsYcG+kygIWtt6LicOkPJQiFgqUM3B2BoOkDZiyOYEYjg135GFDTd15HQxFDM8awV0ku5yCqnyBpBgWt/mdEkafo34jHgzps00lGlJASQQFEoKbfYxaDfUiqELKJJiXHIiqYoIgvVHpW4olxz8Iag5/k9bAm06i3/hAEnXoiCir5yGxCKIURJ30w25KiECwuKD2+mWLN7cJ8Aj6BNBgaOfgMIFVUbQ9h9/yt/7efX2siKcpwuwGkAKQaEnoqLYefl2zsqozjfmZGoDNaCB4D/AD2Q0Jt0GCfWBjEag66lRYwD5jPqlB4L+xlhAjIVxjFLrgAIkwdKBgNASxEnjDIpDvJyDqoxq8QGoK5lBcuD4H0iWcwOSX0G0lFMP1POKCDqR0knKM+h0x+LMIEbenfx48LSgOJRtIUhG9W3GGZWblKhBXfWmJqv04wug8iD1ADR4k0wgcRckfgGJfkaiYywgIdsC0c+oNVYZCRLp3AH5K08fAvI5hfADsdWCwrAkbm/vTY1WT6BDtB6ZQbOKpFPgOKvf8HhjEykhNcM7vxrtY8Bq0KJKf66EKiCW1xK+7WZ2xU6vl+RUDDAzeDuexyndkYwze13N7e7GjQq7Gv9MScWEXv5b+h/pkzZHPEn9nM+nbNcgCbeo/D5VHU2DdigPohtIgdRi1GWH53yW09ZYkEhHEeuiaqlzS3V22T7qsT7djb8FWI9UUf4AqISVp3QH5KkAAAAASUVORK5CYII="
    ></img>
  );

  const upRightArrow = () => (
    <img
      alt="↗"
      height={"14px"}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURVJnemiGov///26Nq1NrgmqJpmJ+mFt1jVJoflJpfnqdvXSWtZWxycbW5FlyioOmxLfL3KW/1Ono59tXtS8AAAAKdFJOUwH///+a9f/a2kV+A/deAAADY0lEQVRYw6WYiXqrIBCFw8WPRJDFvP/D3llYBkUakwMSZfk5Q0pbeTya1uV5S8v6GAgoIZhgPhX0DOHMWhdEqJtCXo9an0jRzsbtY0XrNLKegrQGo7S2W/K3lDartTJhFX7AzV0Mo8BV9cSc3X+lXZAW4FjgpO9IFkgLGeK4UvJpoGFlJ4oOLS3AiekHRSChpScuUNoT5pP2PyDYDt+demJkYGi/UtrnonawBLFRZPtP4tggMrvtG1dt+WraRHkSjYPCYWxP5Wz9sd/zddQ+3iV7LqzLoBs77GLXCVDE3Ar8jFtOMfJTza073TQQ9+Riqw8TD2Ua7sogzaCj/Hsiv3V9q6MByaZ/MyXbcSagP0jexjoIbvnrh9hQWAGN+YKKNAVRn8gfroKYy6iarJ86yt2op3QkKOXTpamjOkY4YpNcZBYpTUCxjXHdGlnbWPUuTR0VMch0oIOuojuCDIPuk7wc4j4CbTdAENsI5bBLfF+CXIuMQYpAztGFBWVOFxwA8RjO+KeNQXWgbRzK76u9JnrhVqugJtucXfohRy0I6ajZLDTU+3r3y7k70ED2PdlrZ9DrAqRnnN6Rro70Xc4/r8+hBQSdUpxyCMQ9sVAlNEHKTXM/EJouEIwMHL3AES5STbkYclISjnTrjP/+vcBRtlQb9EVcSau9d1SGaQKxI6mxHzShUgPlvpoiKyBdPYHshR/S3qi6zt+DSmWccUp0qR8zAtmLuEonjq4DqQpqtcpdrXMbhZ78Fail0a/WhFOVDhRdkkMESFaf/yx6VRCaeGp/x/JMVSaDjISfST5PpOpF0iWr6ki8XlHXdIpLFZYWzPbRHElDynSeUp1A2GkYuszZUZbv4pJ2WzjyBTAQKJxApm2Fz94kC2hA8plj7oI4H0ie6sxxksGbbQFljKkJo3sndao3o2dzdlQM0K1To/rKaoV0hE88Qbmrlcf6Q2EOobWmlk7Vx/Z6g6AldJbyFIfhRhoyB7/ICQu889MilZOKhpJSxwfV1QFifax5kYycrp++GBCrZ2pVXiJ4Oy6xTaXMwJMwtNB5Rvj8jGZ8cBP4VGP5jRSyoQet0m+kVzkc+Z4U0NCrHdcgiY6zbmbiBHmA9DVJ+slHYyxTStM/ltLIVlrn8ynbK9zWa3jwtwLrljrKf+GFlFUtyqzCAAAAAElFTkSuQmCC"
    ></img>
  );

  const rightArrow = () => (
    <img
      alt="➡"
      height={"14px"}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURVJnemaCn////32iwlNrgmF9l2qJpVt1jVJoflJpfpq0ysnY5W+PrVlyioqqx3mcu7fL3HSWtajB1S+ZqrcAAAAKdFJOUwH///+a///a2kU0s+//AAADZklEQVRYw6WYi6KCIAyGxRymchHe/2EPGxcHasnpBxEY+xqIlQ7DoWWauzQtw4UCRYOG5wpj9Zm1TKFfoOTDhFkEVo1a5kCR0lmzrmalYq2q5tSzGutkgMHMSIsGIZVd961L+2qVFKCXI56Acb2YiHIBlWMijvXbv+TtQZogckJE+751JCqQBBMFBDSvqG1/rjQWZwcY0iSkM/sPMk4KDGmm6+X3mP1jf59LvHYzzcy9/E96OZzbJJQzv4GMU2Fus1C4n1EeMxXnI1d8XaXCWCVmWiKTR/9TtEjzcYfx1N5qR3G66eiuS6ColR2GnXmztdG5gF7ms8Le+2R+taBXOsqAfN7GcQutSxsDKfv6ogAat/Xenhb7GWgcV/sZFDbkF5KNoHuSS/voGyhFNI7+eqCNoOcRjeNuP0REoE8oe4DGzdoL+wEKZsw3yR2gsA0CqTJbPrXYtpaX7NhHTnLMGEseUepzV1IcFDaUqz/RWhVBMoNs/j5ptY2V1sMhCn9Ihhm/+2PbmcbjTt5VKPz2zyA0OGfGh9qRRD7kV4GC6Tlo3Bz5JL8D5LDZERFuKBe98MxA1K06QGEbKJcvchWR64uItoGrQUIlUldESMp+SvwEGn0FeuN/LEepN6LgEx1lASGlF7SRDwUQQO9h1gjCplK2g7NnJ5VAMSLVG9GanRyBdADpBApt08spEREIpOwF2ZojIYJySFLd/LE93R4Vh/4iZ1BK+fq5dBnjEqituVxldEpnUDAyqVSK+huyYlDjABU/VY9IaA7a09CSq4iSR7FI1lQVyAs+LNWaiG7FpmauxooCEk9Br+uRvaDN3nAyCNqnOszphDmBNgW8W8ahWILOICELIFU5Ewi08T5WkfQgiSAdn0Hp2ZKXMjcI5AWwrsqeIyKQPCBtnSLyUJuziMZBH+W8hca74hXQNxIcI+Sl+SmIO30BAR8CvMi5jICjN1kiaEIQ5C5RqpUHsDOIxo5LpKfwzB9DAlFSrOe+9szssRMDCs/+S55bNbby5+lciUsUno7j3ACgfIBo6kWi2I5+4uiJ3mekVbrVmVh9bpzZQCH1vO45v/+JAQ20Svonzju/HPmFxDiJ9B+URo7mL5AiSUObm5auO3QdT3o1FgV1blqgKxvq4i3bW3frffnibwmsLlWUP/HUk2F0tAebAAAAAElFTkSuQmCC"
    ></img>
  );

  const downRightArrow = () => (
    <img
      alt="↘"
      height={"14px"}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURVJnelZvhlJpflNrgmSBnX2hwWuKp2B7lXSVtP///5KvycfW5LfL3KS/1FhwiOHg3tm2KO0AAAAEdFJOUwHaRZoW5XADAAADb0lEQVRIx42Wv0/bQBTHr/AP9JfKFkEZ2CpaVeqGhHqyO3Wz5LqtUCXr8MACtXpbpto6tSBmTyyNFKEitioUuiFUBBmRUEoG6MDmrUO6tO+9uzg+iNN+c+ecXz7+nO0Md4xhxh7eGpo7k6zIdE3KOJauCx0aHMxAnj8qmEvOw1A4oaCDQ4dQCMfhvG6osQkuks2h8QVf1jPOcPHhaHdo9pqCr5AormQgTeGiasqJflQyu9/S8DZAT6K13aO9CmZv91S8hdneRZ+P946Oq9JOFyfZuJMcj0wznGU3xFr7+KxdKWqfpjfZTPS62213q3LWPUlX2ONoqzsynfQpu6sAGsV11Bt2D/+RzuaI+AYirrO1ib2jh2YEIVNQXBN0guuiBpmCoLEZNDDbGzCyAwUyeY1At6CX/faC4tRrQIcjmpTXz3aWbTQ8KwF0VYZAlIHqWtQ8vKeS6LrqiolEw1RoisqiYaoUTJElAlVSummCBiYjKqn+nJSgJPE93+uL+ip/IWt5XuIlSkO+B9xOAW004TxJegAlPlxvTDD2X2YlFRQWsqzl4+UJQcr3YajKKh9FWQuFZjqAAFOrJZVCUdZSUPbNdCpReFpS+Qqfo5VgWYl5NhEpTamPA9Wv9YxMdPH7ZTYhYIiUUocDFb2Q77os+hClpMr6JgM5BVRSZdpECW1odajJhtLUVn2JBlAUpUq31FYdUC0lqI9AE4e2CYpRakxF0iXLhBUy1RyRFoks1YEuEhSJNKIOEUu2ScAP/JxNxDigLoStOhBUXjxntVj0KcBS8eKqSbgEkQM6VkTPMmGMqZT17BrkXoWe9f4DKouyfSqFBDkVIgNpkwMJcb0T3BJl+1gLjQkWQ1gCoeL0bAgXR0dDXHDhwNIZhrYIIAxHSDocPtR2bOhTSKkjxFFD7ZW1jH3lOhIgXKVNkzwuAmu5o6d7TlBYUENT16bRISgezbgAzf0b+ske5HHswhhRGMQu9JjHvLhU1i/YVC6xhA0Z+LjcoOYx89tsPJexWzy4a8IHpzKfZWP5Je14JP0o9cbH7ICoWM9hizF3KXEvFEspY8O4mqNvCffN8KYkbpWIM/umWBbfeEuM5pN0qg9yMIJLJc3G4CVcSjtuaZxf6E1WLZdVqefnZls3ned5fXjyfLCpq+UVGWz8GLs/egv5F8yZ6Ww7mIeUAAAAAElFTkSuQmCC"
    ></img>
  );

  const downArrow = () => (
    <img
      alt="⬇"
      height={"14px"}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURVJnemmHpP///26Nq2WBnWB8ln2hwVZvhlJpflNrgniaupm0y1lyiXOVs6zD1MrZ5bvP4ImqyOTn6rnLMnkAAAAKdFJOUwH////////aRZqMPyiGAAADbUlEQVRYw62Yi3asIAxFpYAvxBH//2NvAgECAjPT3uAD5bA5UdpZOE051m35KrZ1agRQDu1D0a7ZuWqg28eTtW6HVhDi81AC9PooUeuigSHt7IwxLm75bPjtqJmtBJxeGGk9wIvczfX6Kk6zS7B1JNIKdqT9FoNxGXCl9BrzQjsn3KYStnxu3I+XrxNNUXab9pzrglYvqc+xsPvx8rqQpLeQmM/r14HZ+eQ2Ja07AT0Qn4OW01mp0NKC7+scxzVqwXe3YGYwfc4/BUwoyA0y2x2/zdyZKjogt2NumJkr1Kx6F/EAxzkPoAVAtgSxuH+KuDsys1vRAOULV4FexnUceZAEEA+Tq7Uj14nkaO4IXpWjMUh+DLpdWzhnR+14OJpdW1iBksrF+gMU29IWhASSzFE5ZAPUdiQfoDLqt9bT2QjqkT50tNPMlvavIOtByoMarP0J2ls6DgIBavw57rDVIBLtJIrHEjRHGJ4CZ36CqDUIZrrgoMxntpqOWpYIJCLoEQ1HrbBWEMj+FxD+Gn0Kagvx98g7AhArYYODbYFsoaUeAYSOrA09rc00ONQgS+3FZvcCtGdU0jZA1B61VCsc5ZApapC/GdrLHi3QzH696r9+9os3FyMHkOJ8ef58FCfvI1UAgaVQ8FD/E2rHPacesIkEiiR8AO4TkInj+i4BdGRQOJj3HOe7pMEZSLIXIt6SjPDS9H6FOhLIMpa4xpwrjRyHDiAtcgONMCRdspb3QfVULKdlLYe3H0CYm2AU2G13Ety2UIfMEgjbBG2gElLtHdK9Y7PXpMJABJAERFJ7Yt6zSgDSlo4QRUE11ZyYplw/RS0DVYF+TY8j6SnkFVcNkuWC7PH3e6rGgBzUWe+pajpdHaHSBNKddiWK6fQSvQEZiEqq+CKUZK/ulmUrK/rwIFrNqojKUKXzxLytFkzBqxwkyi3VEgk4SjUgYY3MHPHe7EJpmk5OU5/cHKuqTK0X2k8nM9LoBBqrzH0POeRoewMCEizHxgIAbbDmx9z6xStH7RoNwdp/DblhD9p1WUv6nsY/Ilgd+9weIw1M1JWQ2RRyq0PpQah0CjWf2eQt1Z6GT4VaE+oIhiZ6Sl9HMh2e0ETJHb9BUF7sc82XpB4nZPcLFHY6lrX6NFaEPprRuN34yrYcX0f7w9/6p8+H/wDTKYt9DZYdEwAAAABJRU5ErkJggg=="
    ></img>
  );

  const downLeftArrow = () => (
    <img
      alt="↙"
      height={"14px"}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURVJnenygwGB7lXOUslNrgmSBnGuJplt1jVJoflJpfv///46sx6K90sbW5LfL3Fdwh+Tj4U4wJ98AAAAKdFJOUwH///+a///a2kU0s+//AAADPUlEQVRYw62Yi4KjIAxFhUisFdH//9rllRAQbJ3uhWqBcLjx0RmdpqJ1Xh5pXqeOPOXQD3VcWet8aOOFBrOM2BvR5u4QbvRRo9ZFh0BQ2wMpCEC9rJLjvaCybied8sspO4ScVZ5kCmkNdmBz+3NtEEyt7AcB7P4nWQAkT7NOnD84comk55RY4Djndhe10za3SXtduS+SgqXZhOPzg/xxMsHSEg3ZZtRe4u1lG/a+BEtLykzZ0JZybYelELm1iaRibrMB2GxfjipjBaastAH43Bbjr2f7k7aY2xJuDJsK14dFMSjIlrvIppat7y0r91Z21aChbPerFKf27U1/vk/biVWqgJrSayjPeQfSNbqAWJvYyi7ieFI1mMZAgLYasimywqjEIU/kNQ1GkL8g2xU6Yk7PEzmCW0TL6ZD8ld1z9ImTsquEX6bWcC6esiOsQfZswy6clhR+bS8gcCEM7vy0JGCQnwYSJEnQ5bx3ngHCEcRWLi4uyM0xh4p0JDjRUfYEQz9l7bCpHDHdvZkEtxwulSPqI0cxuzGnhBdH4c8aKdAdnxilxn5iqKJ5/l+JBComBeh9djmOVlRsDDGBsO+or12EsqULCD6CdjmfhCk18wDkoKcIejUgdLcc/C+gASeAXhGEIuAGlDgILQ4FCJDKGOQwM2R4KgySQ+6egx2OTO2jI4cIg+KvxwA6NMqYAcihWA4vjo7gSNf/0/dBm0kczBTM39JjgD6iIyNXMH3QKTAocDk1Bn105H8LmAKFdnEkOkdn7awnD1L7AuRJBvt6CBqTCsh8BRqRDINMfJBL5Q6USKLSnAIqz4m3IH/ualLaEUgnLMZHUbPd/0KmIOQpGB9ICVSN+ifAUprqFEUZU1LT7EjQPd93+FJVzVtTKIYa2dFBo1jGb8RRZStBP4lBP5J0BM3/BzRP6/FzbgG0TmvKzbO4VkH5U/Xrqj9m5p+OY26CI0+76DRNJ5VwVYTMppSbriZzEZcQjzVhkXPENwjZEl975dOs3qzANRma8lHSZSneNzLyG9vNR2gSyXVmXm4TI3naiMSI9Ph1FtkRnJTd8UfMa21ejUXpRyWo85btdTzWq/vib/WsR6oo/wCgCoqdgWmtYAAAAABJRU5ErkJggg=="
    ></img>
  );

  const leftArrow = () => (
    <img
      alt="⬅"
      height={"14px"}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTG2Mqf///3+jw09mfWJ9l2eFoVZvhlNqf1NrgnmcvI+uyXOUs1lyisbX5bfL3J63y6jB1eHm6iys5/gAAAAKdFJOUwD///8k///aT5rh60feAAADY0lEQVRYw6WYCYKDIAxFi5SogIre/7ATSMDgMiPjJ2WJ8EysXeTzKfoOY9+kcfh+zkLKZBo1IeuA+Y5IgVYZMNNYRTX0EaO8dajwzJz1KsJ6EdQwGVDKhmVu0hKsUhjUUHF8K4ZQXpC+vcFw1vlfWi2SerpOowEfOUuylniiBevBjCkxyitpXlqUZs8pu5jciBy9/F+rQ9IYrxDE92tdo29Z0yGeIfqllQdWWoHvHeBVGgwGtL6S9gpzi5m5dyDKrce3zIVXwnsc+k+vMshVVYG7Mi5WYzII6BPGCrkKrlbIruOB9KnjiLR7JV0i0m5HaX5llw7bTCO9T7gExYiQlOX4lV1L120ujdw+4aA9onshJ4F+VYnoluS2LoL0IxDcgixxEGT/4PwOsoE4f4Pihw1B6WpbnSphhUMgMllxiyt9AVl9KjZ0nQBl716J/g7SyS3Nr10N4jm6rqgVEdEphOauAll7MaeMJUgcw3C05HSb9VS8t7IU1gWI5LauAl1/e+zz8YsNQfgNWZP8gUOwVLjhQeB1XoKSzydvuOBcaqF1mDEUUHLRdXjM6Va+VDkiSKTMWbrHWvgdiD9sGUQk38RJERFLgEjV7fMgIpaMiOLZWjjdyqnUoCjdxOkWdRVRcoT2iOIyAk34Z43GaOtbULRYVNjaQLTK7CDPTtBbC4g4Cv8of+L/WcXjVNutBcQRRVD6R5spqfP0ZlqAl4AAMYTa4+29bbOw/JptXgBVRFI1abOUA1t5Fd2CAKobavNxxvl0+/QMOs8B+eVGIGIVuwWVY9SRt8FVRCB4EpQKGbdm/wRvCtRhihIOCQLpLmWWoPpQPmOqwTDISIicvpwiOsxgHhRQ8oBo+LluySDpV6JHfTMJkETxQrw/QgZJv+zK1KZfnkGNK6DfHkknBt2TjMHb4C+QuQaZumfU6sA8jiiXtIS7jDJm990UGRFTJO684mxU7SCBKWeBM8XcuBJonHJuhZAbOTzkwg3XiBjxWX2irQwwosmo7N0PgehkQ8SAj6Kc2/lk5hjQMdR8NswMH9jH6W5zBZ7utcTMPntujwVnUNqLGJtJlwF90lWaXnF4SyMlN73gyO2af6MqTtyIIhTChNUj4S69qH44bI2xTDbRNQd37kWN34vNumadN+vebx/+AJJ+jiLoJkJRAAAAAElFTkSuQmCC"
    ></img>
  );

  const upLeftArrow = () => (
    <img
      alt="↖"
      height={"14px"}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA/UExURUdwTGSAm////22MqU9mfWiGomF8llZvhlNqf1NrgnmdvJGtxn6jw3WXtsbX5VlyinGSsJ+60brN3a7F2Ovp6OQHRZwAAAAKdFJOUwD///8k///aT5rh60feAAADX0lEQVRYw6WYCYKDIAxFzVBwRRB7/7NOCFtwm1EDbpA8fqhtlabJ9un69pb13afZG1KMQgNW+Y6OQOepUxlkbTCf3igACfKOAYAyfaWqaxUyhB3GGzZYgTDVMlGdASnEsLj5lrllEEKC6SqOHm9iCDVqRvq0IKxe5ke2aiuhDfPUK0kcR/WOHu+/IEn1lJjCvBb32BbMTvnkevy0pvU5aB3x0+v9DPnE1hfmk8NZ6hQKegVaJyswtx7wk19eGd4D0DeY2fAahLk1rUigh7hxwS+LB8n0DVvGpzYkRdOmYwrbvh7blBWRVy7T1eDTUSmKgo20je57YY7cNrUo4rb+XJmbDiwrqkjuNmfSUZHmoOEKNNdjppDboHk4FMRBw39AjvQMpyCh0cFX2p2DHHcrBSv+IiVQhGA9BeH8lNGmEBL3HJRNn4Bc5RUxU4wRgCD/y/83yOkSl48pxN4AjRtBld0BfT0p++kzRXrwlXZnc+RJ0YOOafOHCPI3UuHYMxCRUugQS9j5/8im9X+P3E7vo++YHAddG/6xEUhwkj2/swvpJehnPibZCmSpansFSpqib8RwkA19/ngJ8iRy9o505uM4yKZ2Ky5BRNKx6hiyB9m/QUiq3MkkgQwIcQxy7vh+2pH8k2TjH0NZjyigVRyr25L8c2RQ5EECr0NNwU6IM9Igir8v+BgZQd5ic4p1osJuSYnBQUqGGNqEDKFroKfLXXax2wYnVUDZQqST9fXBPPGYBJJb0MquT7LTJUgeg1afF2uRh5ocD4EI8rMdKm5y+hInNpyQZtbPQVJQkXFPTulcHpDm2BsqB2VKOGZgOlmPOJlWKYrD55GqE6g0zQJkUStqRal5Z7ENXMURlb9KoH+9OKbs5t17JoAhEJN0+d7pTjj+NsqgulBgrLktkGh+UksqiisCXqGcy9wJsH5dgaQhK1AaAHaDVVLBbqXDRlE0CVvbtKjDfpVBJIkao4h8BC6L9fF+CIr6AHpjXlGP7+ost4cgRHT4KvpWEk0RvrBTbnEB5VkxPrMm5BbXZIAt0FQLNYov00C5plPKrCFJJq3qhJqDoEhl3cVDRU4flzQCiBuov6wIDjPUxOSMemgmJZZIyrzn+IUo84BlCNN2m6Wxh9Z/Dhbrbtt+se798uEviKag/SUm9HQAAAAASUVORK5CYII="
    ></img>
  );

  const partyIcon = () => (
    <img
      alt="🎉"
      height={"14px"}
      src="data:image/png;base64,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"
    ></img>
  );

  //   <img
  //     alt="⬆"
  //     class="imga"
  //     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURUdwTAB52AAAAP7//4S/7Xomjc4AAAABdFJOUwBA5thmAAAAYUlEQVRIx2NgGJRAiQAYGEWCeMCoIporEnEkQpGzCWFFIsbGjgQVORsbmxBSBDQI1ShsipxBikzwKwIbhGIUFkXOEEUmhILA2JiIcBpVNKpoVNEgVTRa2A8pRYOvrTLoAABAjLQZHwtAWgAAAABJRU5ErkJggg=="
  //   ></img>
  return (
    <div key={guid()}>
      {worldleScore &&
        worldleScore.map((scorearray) => (
          <Grid
            container
            key={guid()}
            //   justifyContent="center"
            spacing={0.25}
            //   direction="row"

            style={{
              display: "flex",
              justifyContent: "baseline",
              alignItems: "baseline",
            }}
          >
            <Grid
              sx={{
                mt: "1px",
                display: "inline-flex",
                gap: "1px",
                direction: "row",
              }}
              key={guid()}
              item
            >
              {scorearray.map((colorNumber) =>
                colorNumber < 3 ? (
                  <Paper
                    key={guid()}
                    sx={{
                      borderRadius: 0,
                      height: 15,
                      width: 15,
                      backgroundColor: () => {
                        return colorNumber == 0
                          ? "#C4C4C4"
                          : colorNumber == 1
                          ? "#f1c40f"
                          : colorNumber == 2
                          ? "#2ecc71"
                          : null;
                      },
                    }}
                  />
                ) : (
                  //   <span
                  //     style={{
                  //       paddingLeft: "4px",
                  //       height: "10px",
                  //       color: "#fff",
                  //     }}
                  //   >
                  //     {DirectionNumberToCharacterMap[colorNumber]}
                  //   </span>
                  getArrow(colorNumber)
                )
              )}
            </Grid>
          </Grid>
        ))}
    </div>
  );
}

export default WorldleScoreGrid;
