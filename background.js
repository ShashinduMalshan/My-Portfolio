function createSpiralGalaxy() {
            const container = document.getElementById('bg-spiral');
            container.innerHTML = '';

            // Create spiral arms
            const numArms = 6; // Increased for richer effect
            for (let i = 0; i < numArms; i++) {
                const arm = document.createElement('div');
                arm.classList.add('spiral-arm');
                arm.style.transform = `translateX(-50%) rotate(${i * (360 / numArms)}deg)`;
                arm.style.animationDelay = `-${i * 5}s`;
                container.appendChild(arm);
            }

            // Create twinkling stars
            const numStars = 50;
            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.width = star.style.height = (Math.random() * 3 + 2) + 'px';
                star.style.animationDelay = Math.random() * 3 + 's';
                container.appendChild(star);
            }
        }

        // Initialize spiral galaxy
        createSpiralGalaxy();

        // Handle window resize
        window.addEventListener('resize', createSpiralGalaxy);