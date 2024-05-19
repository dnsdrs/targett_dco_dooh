# Context

This is a POC of a DCO creative for the Displayce DSP

Displayce is a DOOH DSP allowing its users to buy inventory on a number of Point of Diffusions (screens in public places)

## Definitions :

- POC : Proof of concept
- DCO : Dynamic creative optimisation
- DOOH : Digital out of home
- DSP : Demand Side Platform

# Displayce Specifications

Technical specifications from Displayce are available here : https://helpdesk.displayce.com/fr/knowledge/cat%C3%A9gories/guide-de-la-dco-avec-displayce

# Steps to adapt for another campaign

## 1- Videos specifications

*Create 2 video background assets :*

  - Both should be 1080x1920
  - `/assets/videos/template.mp4` is the video that is playing in the default case :
    - it should have an exactly 3s full screen intro
    - for the next (unlimited) period, the video should leave a 850px tall blank space for the showtimes, starting from the bottom
    - when the video is over, the screen could remain on. It will statically show the last frame of the video (don't leave it useless)
  - `/assets/videos/backup.mp4` is the video that is playing when an error prevents the showtimes to load
    - it should have the same 3s full screen intro
    - the rest of the time is free (can be static)

## 2- Showtimes API settings

*In the `ìndex.html` file, line 8, change the movieId (string) value to the id of the expected movie.*

  - For example :
    ```
    const movieId = "318031"
    ```

## 3- Check

*Visually check the DOOH creative locally*

  - Open `index.html` in a browser (ideally from VS Code's Live Server)
  - Open DevTools (right click > Inspect)
  - Click the desktop/mobile icon to active mobile device mode in the left upper corner of the DevTool window
  - At the top of the website window, in the field "Dimensions:" chose "Responsive"
  - Set the width to 1080 and the height to 1920

*Simulate other geolocations, by editing the `/js/acgeo.js` at lines 13 & 14 :*

  - Change :
    ```
    latitude: this.getResponseHeader("x-wb-lat"),
    longitude: this.getResponseHeader("x-wb-lon"),
    ```
  - To, for example :
    ```
    latitude: 47.142445,
    longitude: -1.681401,
    ```
    (For the wonderful town of Bouaye (44)

    ```
    latitude: 46.035478,
    longitude: 4.083858,
    ```
    (For the incredible city of Roanne (42)

  - Or any decimal value

  > ⚠️ Don't forget to switch it back after your test

# To do 

- [x] 95% done
- [ ] Create meaningful backup video for the example
- [ ] Find way to generate QR Code without third party tool
- [ ] Log errors & cause to be able to quickly (ex. GCP Pub/Sub + Datastudio ?)
- [ ] Store geolocation in localstorage if it exists to avoid calling JAd's geoloc API uselessly