import axios from "axios";

const form = document.querySelector("form")!;
const input = document.getElementById("address")! as HTMLInputElement;
const KEY = process.env.GOOGLE_API_KEY;
type GoogleResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO RESULTS";
};
declare var google: any;

const searchAddressHandler = (e: Event) => {
  e.preventDefault();
  const enteredAddress = input.value;
  console.log(enteredAddress);

  axios
    .get<GoogleResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${KEY}`
    )
    .then((response) => {
      console.log(response);
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch data");
      }
      const coords = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 8,
          center: coords,
        }
      );
      9;
      new google.maps.Marker({
        position: coords,
        map: map,
      });
    })
    .catch((e: Event) => {
      console.log(e);
    });
};

form.addEventListener("submit", searchAddressHandler);
