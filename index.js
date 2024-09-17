import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

// retrieving colors data using fetch:
const fetchColors = async ({ name, hex, compName, compHex }) => {
  // fetch data from API:
  const response = await fetch(COLORS);

  if(!response.ok) {
    throw Error('Error: Looks like something went wrong. Failed to fetch colors.');
  }

  const colors = await response.json();

  let filteredColors = colors;

  // filter by name
  if(name) {
    filteredColors = filteredColors.filter(function (color) {
      return color.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  // filter by HEX CODE (WITHOUT #)
  if(hex) {
    filteredColors = filteredColors.filter(function (color) {
      return color.hex.toLowerCase() === hex.toLowerCase();
    });
  }

  // filter by complementary color (ignore case)
if(compName) {
  filteredColors = filteredColors.filter(function (color) {
    return color.complementaryColor && color.complementaryColor.name.toLowerCase().includes(compName.toLowerCase());
  });
}

  // filter by complementary color hex code (WITHOUT #)
  if(compHex) {
    filteredColors = filteredColors.filter(function (color) {
      return color.complementaryColor && color.complementaryColor.hex.toLowerCase() === compHex.toLowerCase();
    });
  }

  // return filteresed colors:
  return filteredColors;
};

// Leave this here
export default fetchColors;
