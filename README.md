# Orbit budget

A private household budget that runs entirely on your phone. Statements, payslips and
every number you enter stay in the phone's own storage; nothing is sent anywhere.

## Put it on your phones (once, about 15 minutes)

1. Create a free account at github.com.
2. New repository, name it `orbit`, set it to Public (only this app code goes there,
   never your data).
3. "uploading an existing file": drag in everything from this folder
   (index.html, sw.js, manifest.webmanifest, README.md and the lib and icons folders). Commit.
4. Settings > Pages > Branch: main, folder: / (root) > Save.
   After a minute it shows your address, like https://yourname.github.io/orbit/
5. On each iPhone, open that address in Safari, tap Share > Add to Home Screen.
   Open it from the home screen once while online. After that it works offline.

Always use the home-screen icon, not a Safari tab: iPhone keeps their storage separate.

## Updating
Upload the new files over the old ones. Your data is untouched; the app picks up
the new version the next time you open it twice.
