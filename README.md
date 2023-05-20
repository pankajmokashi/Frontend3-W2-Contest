# Frontend3-W2-Contest

Step 1: User Interface (UI)
  Create a web page with the following elements:
  1.  Display area to show the user's current timezone using their latitude and longitude (obtained using the Geolocation API)
  2.  Input field for the user to enter an address
  3.  Button to trigger the timezone retrieval based on the entered address
  4.  Display area to show the timezone corresponding to the entered address

Step 2: Retrieve Timezone by Address
  1.  When the user enters an address and clicks the button, perform the following steps:
  2.  Validate the entered address.
  3.  Use a geocoding API (e.g., [Geoapify Geocoding API](https://www.geoapify.com/geocoding-api)) to convert the address into latitude and longitude coordinates.
  4.  If the geocoding API returns valid coordinates, use them to fetch the corresponding timezone using the Geoapify Timezone API.
  5.  Display the retrieved timezone in the designated area.

Relevant Links
Figma Link- https://www.figma.com/file/CSwRxPkdiFzE0H9hqbZiOm/Untitled?node-id=0%3A1&t=PGLrcIv4Ch80kUit-1

Deployed link - https://pankajmokashi.github.io/Frontend3-W2-Contest/
