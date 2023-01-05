module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      primary : '#243c5a', 
      secondary : {
        100: '#243c5a',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}


