let icons = ["2️⃣", "1️⃣", "✅"];

export const titleUpdater = () => {
  if (document.title.includes("2️⃣")) {
    document.title = `${icons[1]} Scoredle`;
  } else if (document.title.includes("1️⃣")) {
    document.title = `${icons[2]} Scoredle`;
  }
};
