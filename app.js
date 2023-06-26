if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js") // it register the service worker
    .then((res) => console.log("service worker register", res))
    .catch((err) => console.log("service worker not register", err));
}

// Check if the API is supported
if ('setAppBadge' in navigator) {
  navigator.setAppBadge(2).catch((error) => {
      // Code to handle an error
  });
}
function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Hi there! it's already granted");
    
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
      } else {
        const notification = new Notification("ok thank you");
      }
    });
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
// it helps to identify the permission is granted or not
// Notification.requestPermission().then(function (result) {
//   console.log(result);
// });

// const options = {
// 	body: "Your code submission has received 3 new review comments.",
// 	data: {
// 	  url: "https://example.com/review/12345",
// 	  status: "open",
// 	},
//   };

//   const n = new Notification("New review activity", options);

//   console.log(n.data); // Logs the data object
// it helps to get a toast to notified about new notiification

function reloadPage() {
  location.reload();
}

function showUpdateModal() {
  const updateModal = new bootstrap.Modal(
    document.getElementById("updateModal")
  );
  const updateButton = document.getElementById("updateButton");

  updateModal.show();

  updateButton.addEventListener("click", () => {
    reloadPage();
  });
}

navigator.serviceWorker.addEventListener("controllerchange", () => {
  showUpdateModal();
});
