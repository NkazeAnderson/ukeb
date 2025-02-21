document.addEventListener('DOMContentLoaded', function () {
    window.AddToHomeScreenInstance = window.AddToHomeScreen({
     appName: 'MetroBank UK',                                   // Name of the app.
                                                            // Required.
     appIconUrl: 'apple-touch-icon.png',                    // App icon link (square, at least 40 x 40 pixels).
                                                            // Required.
     assetUrl: 'https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@2.991/dist/assets/img/', 
     maxModalDisplayCount: 2,                              // If set, the modal will only show this many times.
                                                            // [Optional] Default: -1 (no limit).  (Debugging: Use this.clearModalDisplayCount() to reset the count)
     displayOptions:{ showMobile: true, showDesktop: true }, // show on mobile/desktop [Optional] Default: show everywhere
     allowClose: true, // allow the user to close the modal by tapping outside of it [Optional. Default: true]
   
   });
   
    ret = window.AddToHomeScreenInstance.show('en');        // show "add-to-homescreen" instructions to user, or do nothing if already added to homescreen
                                                            // [optional] language.  If left blank, then language is auto-decided from (1) URL param locale='..' (e.g. /?locale=es) (2) Browser language settings
   });