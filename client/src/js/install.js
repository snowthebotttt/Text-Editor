const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default prompt
  event.preventDefault();

  // Save the event for later use
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    // Show the prompt to install the PWA
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("PWA installation accepted");
    } else {
      console.log("PWA installation rejected");
    }

    // Reset the deferredPrompt variable
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = "none";
  }
});

window.addEventListener("appinstalled", (event) => {
  console.log("PWA installed successfully");
});
