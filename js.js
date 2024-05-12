const movingImage = document.getElementById('movingImage');
        let moveUp = true;

        function moveImage() {
            const top = parseInt(window.getComputedStyle(movingImage).top);

            if (moveUp) {
                movingImage.style.top = top - 5 + 'px';
            } else {
                movingImage.style.top = top + 5+ 'px';
            }

            if (top <= -30) {
                moveUp = false;
            } else if (top >= 30) {
                moveUp = true;
            }
        }

        const moveInterval = setInterval(moveImage, 50);

        window.addEventListener('beforeunload', () => {
            clearInterval(moveInterval);
        });