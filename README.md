# Steps to adapt for another campaign

1. Create 2 video background assets :

   - Both should be 1080x1920
   - `/assets/videos/template.mp4` is the video that is playing in the default case :
     - it should have an exactly 3s full screen intro
     - for the next (unlimited) period, the video should leave a 850px tall blank space for the showtimes, starting from the bottom
     - when the video is over, the screen could remain on. It will statically show the last frame of the video (don't leave it useless)
   - `/assets/videos/backup.mp4` is the video that is playing when an error prevents the showtimes to load
     - it should have the same 3s full screen intro
     - the rest of the time is free (can be static)

2. In the `ìndex.html` file, line 8, change the movieId (string) value to the id of the expected movie.

   - For example :
        ```
        const movieId = "318031"
        ```
