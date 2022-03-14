export const iconUpdater = () => {
  const iconElement = document.querySelector("link[rel~='icon']");

  let value = iconElement.href;

  if (value.includes("/src/tabicons/2scoresleft.svg")) {
    iconElement.href = "/src/tabicons/1scoreleft.svg";
  }

  if (value.includes("/src/tabicons/1scoreleft.svg")) {
    iconElement.href = "/src/tabicons/scoredle.svg";
  }
};
