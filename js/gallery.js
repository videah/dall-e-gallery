window.onload = function () {
    async function loadPrompts() {
        const resp = await fetch("/photos/prompts.json");
        return await resp.json();
    }

    loadPrompts().then(prompts => {
        var image_count = 252;
        var images = [...Array(image_count).keys()]
        images.shift();

        var grid = document.getElementById("grid");
        let button = document.getElementById("load-button");

        function loadSomeImages() {
            for (let i = 0; i < 10; i++) {
                if (images.length === 0) {
                    if (button !== null) {
                        button.remove();
                    }
                } else {
                    const random_index = Math.floor(Math.random() * images.length);
                    const image_index = images[random_index];
                    images = images.filter(item => item !== image_index);

                    let div = document.createElement("div");
                    div.classList.add("grid-tile")

                    let img = document.createElement("img");
                    img.dataset.prompt = prompts[image_index]
                    img.dataset.zoomable = "true";
                    img.width = 1024;
                    img.height = 1024;
                    img.src = "photos/" + image_index + ".png";

                    let span = document.createElement("span");
                    span.textContent = prompts[image_index];

                    div.appendChild(img);
                    div.appendChild(span);
                    grid.appendChild(div);
                }
            }
        }

        loadSomeImages();

        const zoom = mediumZoom("[data-zoomable]");

        button.addEventListener("click", function () {
            loadSomeImages();
            zoom.detach();
            zoom.attach(
                document.querySelectorAll("[data-zoomable]"),
            );
        });
    })
}