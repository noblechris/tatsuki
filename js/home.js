document.addEventListener('DOMContentLoaded', () => {
    // Audio Player
    const audioButton = document.getElementById('audio-toggle');
    if (audioButton) {
        const sound = new Howl({
            src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'], // Placeholder audio
            loop: true,
            volume: 0.5,
        });

        let isPlaying = false;

        audioButton.addEventListener('click', () => {
            if (isPlaying) {
                sound.pause();
                audioButton.textContent = 'Play';
            } else {
                sound.play();
                audioButton.textContent = 'Pause';
            }
            isPlaying = !isPlaying;
        });
    }

    // Three.js 3D Element
    try {
        const container = document.getElementById('threejs-container');
        if (!container) return; // Don't run if the container doesn't exist

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.innerHTML = ''; // Clear the "Loading..." text
        container.appendChild(renderer.domElement);

        // 3D Object (Icosahedron)
        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x39FF14, // Neon Green
            emissive: 0x2D1B4E,
            roughness: 0.4,
            metalness: 0.8,
            wireframe: true
        });
        const icosahedron = new THREE.Mesh(geometry, material);
        scene.add(icosahedron);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x2D1B4E, 2);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xFFFF00, 1.5, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x39FF14, 1.5, 100);
        pointLight2.position.set(-5, -5, -5);
        scene.add(pointLight2);

        camera.position.z = 5;

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            icosahedron.rotation.x += 0.002;
            icosahedron.rotation.y += 0.002;
            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        animate();
    } catch (error) {
        console.error("Three.js initialization failed:", error);
        const container = document.getElementById('threejs-container');
        if (container) {
            container.innerHTML = '<p class="text-red-500">Could not load 3D model.</p>';
        }
    }
});
