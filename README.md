# Context

This is a POC of a DCO creative for the Displayce DSP

Displayce is a DOOH DSP allowing its users to buy inventory on a number of Point of Diffusions (screens in public places)

> [!NOTE]
> - **POC:** Proof of concept
> - **DCO:** Dynamic creative optimisation
> - **DOOH:** Digital out of home
> - **DSP:** Demand Side Platform

# Displayce Specifications

Technical documentation from Displayce is available [here](https://helpdesk.displayce.com/fr/knowledge/cat%C3%A9gories/guide-de-la-dco-avec-displayce).
Links to zip packages are broken in the documentation but an example package can be found [in this repo](sources/6409d1f2c56d7.zip)


# Steps to adapt for another campaign

## 1- Videos specifications

We will need two **mp4 videos** of the same **1080x1920 format**

### template.mp4

- [`/assets/videos/template.mp4`](/assets/videos/template.mp4) is the video that is playing in the default case:
- It should have an exactly 3s full screen intro
- For the next (unlimited) period, the video should leave a 850px tall blank space for the showtimes, starting from the bottom

### backup.mp4

- [`/assets/videos/backup.mp4`](/assets/videos/backup.mp4) is the video that is playing when an error prevents the showtimes to load
- It should have the same 3s full screen intro
- The rest of the time is free (can be static)

> [!TIP]
> When the video is over, the screen will remain on. 
> It will statically show the last frame of the video
> Consider this last frame as a static image. 
> Don't leave it black, design it appropriately

## 2- Showtimes API settings

### Change the movieId (string) value to the id of the expected movie

The value to change is in the [`ìndex.html`](ìndex.html#L8) file, at line 8:

  > **For example:**
  > ```
  > const movieId = "318031"
  > ```

## 3- Check

### Visually check the DOOH creative locally

  - Open [`index.html`](index.html) in a browser (ideally from VS Code's Live Server)
  - Open DevTools (right click > Inspect)
  - Click the desktop/mobile icon to active mobile device mode in the left upper corner of the DevTool window
  - At the top of the website window, in the field "Dimensions:" chose "Responsive"
  - Set the width to 1080 and the height to 1920

### Simulate other geolocations

Editing the [`/js/acgeo.js`](/js/acgeo.js#L13-L14) at lines 13 & 14:

> [!CAUTION]
> Don't forget to switch it back after your test

  - Change:
    ```
    latitude: this.getResponseHeader("x-wb-lat"),
    longitude: this.getResponseHeader("x-wb-lon"),
    ```
  - To any deciman value
    For example:
    > For the wonderful town of Bouaye (44):
    > ```
    > latitude: 47.142445,
    > longitude: -1.681401,
    > ```

    > For the incredible city of Roanne (42):
    > ```
    > latitude: 46.035478,
    > longitude: 4.083858,
    > ```

# To do 

- [x] 95% done
- [ ] Create meaningful backup video for the example
- [ ] Find way to generate QR Code without third party tool
- [ ] Log errors & cause to be able to quickly identify and fix issues (ex. GCP Pub/Sub + Datastudio ?)
- [ ] Store geolocation in localStorage. If value is present, will avoid calling JAd's geoloc API uselessly