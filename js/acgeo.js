async function getGeoloc() {
  var xhttp = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");

  return new Promise((resolve) => {
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve({
            ok: true,
            statusCode: xhttp.status,
            latitude: this.getResponseHeader("x-wb-lat") /*47.142445 ou 46.035478*/,
            longitude: this.getResponseHeader("x-wb-lon") /*-1.681401 ou 4.083858*/,
          });
        } else {
          resolve({
            ok: false,
            statusCode: xhttp.status,
            message: xhttp.statusText,
          });
        }
      }
    };
    xhttp.open("GET", "https://cdn.lib.getjad.io/geoloc/cloudflare", true);
    xhttp.send();
  });
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

async function getShowtimes(radius = "40000") {
  var from = new Date().toISOString().split("T")[0];
  var to = new Date().addDays(3).toISOString().split("T")[0];

  var { ok, statusCode, message, latitude, longitude } = await getGeoloc();

  if (ok && latitude && longitude) {
    if (window.fetch) {
      try {
        var req = await fetch("https://www.allocine.fr/_/showtimes-media/", {
          method: "POST",
          body: `action=showtimes&movieId=${movieId}&latitude=${latitude}&longitude=${longitude}&from=${from}&to=${to}&radius=${radius}`,
          mode: "cors",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        });

        if (req.status === 200) {
          data = await req.json();
          return { data, ok: true, statusCode: req.status };
        } else {
          return { ok: false, statusCode: req.status, message: data.message };
        }
      } catch (e) {
        return { ok: false, message: e.message };
      }
    } else {
      var xhttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

      return new Promise((resolve) => {
        try {
          xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
              if (xhttp.status === 200) {
                resolve({
                  data: JSON.parse(xhttp.response),
                  ok: true,
                  statusCode: xhttp.status,
                });
              } else {
                resolve({ ok: false, statusCode: xhttp.status });
              }
            }
          };

          xhttp.open("post", "https://www.allocine.fr/_/showtimes-media/");
          xhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
          xhttp.timeout = 5000;
          xhttp.send(
            `action=showtimes&movieId=${movieId}&latitude=${latitude}&longitude=${longitude}&from=${from}&to=${to}&radius=${radius}`
          );
        } catch (e) {
          resolve({ ok: false, message: e.message });
        }
      });
    }
  } else {
    console.error(statusCode + ": " + message);
    throw Error(statusCode + ": " + message);
  }
}
