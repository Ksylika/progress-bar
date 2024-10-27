import {ProgressBar} from "./progressBar/progressBar.js";

/** Test function that creates Progress bar and uses its methods. */
function progressBarAppInit() {
    try {
        const root = document.querySelector("#progressBarApp");
        
        const progressBar = new ProgressBar(root);
        } catch (error) {
            console.log(error);
        }
}

progressBarAppInit()