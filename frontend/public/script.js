/**
 * Set the initial values of min_value and max_value
 */
function initialize() {
  // Initialize min and max values
  document.getElementById("country_name") = "NULL";

  // Hide the loader in the beginning
  let loader = document.getElementById("loader");
  loader.style.display = "none";
}

initialize();

/**
 * Handle the click event on Submit (Generate) button
 */
document.getElementById("submit").onclick = function () {
  submit();
};

/**
 * An async function to send the request to the backend.
 */
async function submit() {
  console.log("In submit!");

  // Set the mouse cursor to hourglass
  document.body.style.cursor = "wait";

  // Accessing the div that has random value
  let search_Value_element = document.getElementById("search_Value");
  let flag_element = document.getElementById("flag");
  let confirmed_element = document.getElementById("Confirmed_Value");
  let deaths_element = document.getElementById("Deaths_Value");
  let recovered_element = document.getElementById("Recovered_Value");

  search_Value_element.innerHTML = "Please wait...";

  // Show the loader element (spinning wheels)
  let loader = document.getElementById("loader");
  loader.style.display = "inline-block";

  try {
    // Get the min/max values from the user
    let country_name = document.getElementById("country_name").value;

    // Address of your backend
    let request = 'http://127.0.0.1:7000/?country_name='+country_name;
    console.log("request: ", request);

    // Send an HTTP GET request to the backend
    const data = await axios.get(request);

    console.log("data.data: ", JSON.stringify(data.data, null, 2));

    // Display the random value
    search_Value_element.innerHTML =
      "The country you look for is: " + data.data.countryName.country;
    flag_element.src = data.data.countryName.flag;
    confirmed_element.innerHTML =
      "Total confirmed: " + data.data.countryName.confirmed;
    deaths_element.innerHTML =
      "Total deaths: " + data.data.countryName.deaths;
    recovered_element.innerHTML =
      "Total recovered: " + data.data.countryName.recovered;

  } catch (error) {
    console.log("error: ", error);
  }

  // Set the cursor back to default
  document.body.style.cursor = "default";

  // Hide loader animation
  loader.style.display = "none";
}
