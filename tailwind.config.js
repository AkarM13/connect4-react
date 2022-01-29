module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      gridTemplateColumns: {
        prefix: "1fr 4fr",
        suffix: "4fr 1fr",
      },
      fontFamily: {
        body: ["Oxygen", "sans-serif"],
      },
      container: {
        center: true,
      },
      boxShadow: {
        card: "1px 2px 15px rgba(0, 0, 0, 0.05)",
        sidebarNavigation: "3px 0px 4px rgba(0, 0, 0, 0.1)",
        dateButton: "inset 0px -2px 0px #F2F2F2;",
        rowBorder: "inset 0px -2px 0px #F2F2F2",
      },
      colors: {
        primary: "#356DF3",
        primaryHover: "#333",
        secondary: "#1F2226",
        textColor: "#160D26",
        description: "#4E5058",
        buttonBorder: "#F6F6F6",
        dropdownHover: "#F5F4F6",
        connectYellow: "#fffb00",
        connectRed: "#f83813",
        secondaryBackground: "#EFEFEF",
        secondaryBackgroundHover: "#E6E6E6",
        inputBorder: "#EAEAEA",
        borderColor: "#C4CDD5",
        lightGray: "#FCFCFD",
      },
    },
  },
  variants: {
    extend: {},
  },
};
