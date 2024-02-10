import { BASE_URL } from "../constant";

export const fetchAllCharacters = (page = 0) =>
fetch(`${BASE_URL}character?page=` + page).then((res) => res.json());

export const fetchLocationCharacters = (locationNumber = 0) =>
fetch(`${BASE_URL}location/` + locationNumber).then((res) => res.json())