    document.addEventListener('DOMContentLoaded', () => {
          if (window.innerWidth < 768) {
              const carousel = document.getElementById('carousel');
              const myProjectHeader = document.getElementById('projectsBody');
              const cards = carousel.querySelectorAll('.projectCards');
              let baseDuration = 20; // Default rotation duration in seconds
              let isPaused = false;
              let lastWheelEvent = 0;
              const debounceDelay = 100; // Debounce delay in ms
              let rotationAngle = 0; // Track carousel rotation
              let lastTime = performance.now();

              function updateRotation() {
                  if (!isPaused) {
                      carousel.style.animation = `rotate ${baseDuration}s linear infinite`;
                  }
              }

              function updateOpacities() {
                  if (isPaused) {
                      cards.forEach(card => card.style.opacity = 1); // Full opacity when paused
                      return;
                  }

                  const now = performance.now();
                  const deltaTime = (now - lastTime) / 1000; // Time in seconds
                  lastTime = now;

                  // Update rotation angle based on animation speed
                  rotationAngle += (360 / baseDuration) * deltaTime;
                  rotationAngle %= 360; // Keep within 0-360

                  cards.forEach((card, index) => {
                      // Card's base angle from initial transform (0, 72, 144, 216, 288)
                      const baseAngle = index * 72;
                      // Effective angle = carousel rotation + card's base angle
                      let effectiveAngle = (rotationAngle + baseAngle) % 360;
                      if (effectiveAngle > 180) effectiveAngle -= 360; // Map to -180 to 180

                      // Interpolate opacity: 1 at 0°, 0.8 at ±180°
                      const opacity = 1 - (0.2 * Math.abs(effectiveAngle) / 180);
                      card.style.opacity = opacity.toFixed(2);
                  });

                  if (!isPaused) {
                      requestAnimationFrame(updateOpacities);
                  }
              }


              // Pause rotation on hover
              cards.forEach(card => {
                  card.addEventListener('mouseenter', () => {
                      isPaused = true;
                      carousel.style.animationPlayState = 'paused';
                      updateOpacities(); // Set full opacity immediately
                  });
                  card.addEventListener('mouseleave', () => {
                      isPaused = false;
                      updateRotation();
                      lastTime = performance.now();
                      requestAnimationFrame(updateOpacities);
                  });

                  myProjectHeader.addEventListener('wheel', (e) => {
                      e.preventDefault(); // ✅ Prevent page scroll when using the mouse wheel

                      const now = Date.now();
                      if (now - lastWheelEvent < debounceDelay) return;
                      lastWheelEvent = now;

                      if (e.deltaY < 0) {
                          // ✅ Mouse wheel up → increase speed (reduce duration)
                          baseDuration = Math.max(2, baseDuration - 1);
                          updateRotation();


                          console.log("up")
                      } else if (e.deltaY > 0) {
                          // ✅ Mouse wheel down → decrease speed (increase duration)
                          baseDuration = Math.min(40, baseDuration + 1);
                          updateRotation();

                          console.log("down")
                      }

                      updateRotation();
                  }, {passive: false}); // 👈 important to allow e.preventDefault()


              });


              document.addEventListener('keydown', (e) => {
                  e.preventDefault();
                  if (e.key === 'ArrowUp') {
                      baseDuration = Math.max(1, baseDuration - 0.5); // speed up
                      updateRotation();
                  } else if (e.key === 'ArrowDown') {
                      baseDuration = Math.min(40, baseDuration + 0.5); // slow down
                      updateRotation();
                  }
              });

              // Initialize rotation and opacity updates
              updateRotation();
              lastTime = performance.now();
              requestAnimationFrame(updateOpacities);


              let touchStartY = 0;

              carousel.addEventListener('touchstart', (e) => {
                  touchStartY = e.touches[0].clientY;
              });

              carousel.addEventListener('touchend', (e) => {
                  const touchEndY = e.changedTouches[0].clientY;
                  const deltaY = touchStartY - touchEndY;

                  if (Math.abs(deltaY) > 20) {
                      const direction = Math.sign(deltaY); // 1 = swipe up, -1 = swipe down
                      // Adjust speed using direction
                  }
              });
          }
    });
