const topImage = document.querySelector("#topImage");
const bottomImage = document.querySelector("#bottomImage");
const startHeader = document.querySelector("#startHeader");
const startButton = document.querySelector("#startButton");
const imagesArray = [topImage, bottomImage];

export function startApp() {
    //We start by stop showing the button
    startButton.classList.add("d-none");

    imagesArray.forEach((image) => {
        //With the array we had made earlier, we take out the CSS Class to maintain each image in its position, so they be able
        //to do their animations
        image.classList.remove("keep-position");

        //We add each animation class depending the image
        if (image.id === "topImage") {
            image.classList.add("go-up");
        }

        if (image.id === "bottomImage") {
            image.classList.add("go-down");
        }
    });

    //When the images contains their respective animation classes, we set a timer of 3 seconds to remove the animation
    //So they dont keep doing the same animation again and again
    //and add their classes to keep them in their new positions after the animations, so we be able to apply them
    //the inverse animations (sending them back to their original positions)
    if (
        topImage.classList.contains("go-up") &&
        bottomImage.classList.contains("go-down")
    ) {
        setTimeout(() => {
            imagesArray.forEach((image) => {
                if (image.id === "topImage") {
                    //We remove the animations
                    image.classList.remove("go-up");
                    //We add this class so they keep the new position after the animation
                    image.classList.add("keep-up");
                }

                if (image.id === "bottomImage") {
                    image.classList.remove("go-down");
                    image.classList.add("keep-down");
                }
            });
        }, 3000);

        //After the animations, we stop showing the header in which the images and the button are
        setTimeout(() => {
            startHeader.classList.add("d-none");
        }, 4000);
    }
}

export function endApp() {
    //We show again the header
    startHeader.classList.remove("d-none");

    //After remove the d-none class from the header, we use againt the array we had made before
    if (!startHeader.classList.contains("d-none")) {
        imagesArray.forEach((image) => {
            if (image.id === "topImage") {
                //We add the animation to send them back to their original position
                image.classList.add("go-up-reverse");

                //We set a timer of 6 secs, because this is the total duration of the animation
                setTimeout(() => {
                    //After 6 secs, we remove the keep-up/down class so the elements dont go back after the animations
                    image.classList.remove("keep-up");
                    //After 6 secs, we remove the animation so they dont repeat again and againt
                    image.classList.remove("go-up-reverse");
                }, 6000);

                //After 0.5 sec, we add the keep-position class so the elements keep their original position
                setTimeout(() => {
                    image.classList.add("keep-position");
                }, 6500);
            }

            if (image.id === "bottomImage") {
                image.classList.add("go-down-reverse");

                setTimeout(() => {
                    image.classList.remove("keep-down");
                    image.classList.remove("go-down-reverse");
                }, 6000);

                setTimeout(() => {
                    image.classList.add("keep-position");
                    startButton.classList.remove("d-none");
                }, 6500);
            }
        });
    }
}
