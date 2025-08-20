document.addEventListener('DOMContentLoaded', () => {
    const canvasEl = document.getElementById('meme-canvas');
    if (!canvasEl) return; // Don't run if canvas doesn't exist

    // Fabric.js Canvas Setup
    const canvas = new fabric.Canvas('meme-canvas', {
        backgroundColor: '#1a1a1a'
    });

    // Adjust canvas size to fit container
    function resizeCanvas() {
        const container = document.querySelector('.md\\:col-span-2 > div');
        const width = container.offsetWidth - 16; // account for padding
        const height = width * 0.75; // Maintain 4:3 aspect ratio
        canvas.setDimensions({ width: width, height: height });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    // --- Meme Maker Functionality ---
    const imageUpload = document.getElementById('image-upload');
    const textInput = document.getElementById('text-input');
    const addTextBtn = document.getElementById('add-text-btn');
    const downloadBtn = document.getElementById('download-btn');

    // 1. Image Upload
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (f) => {
            const data = f.target.result;
            fabric.Image.fromURL(data, (img) => {
                canvas.clear();
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height,
                });
            });
        };
        reader.readAsDataURL(file);
    });

    // 2. Add Text
    addTextBtn.addEventListener('click', () => {
        if (textInput.value === '') return;
        const text = new fabric.IText(textInput.value, {
            left: canvas.width / 2,
            top: 40,
            originX: 'center',
            fontFamily: 'Orbitron',
            fontSize: 40,
            fill: '#FFFF00',
            stroke: '#000',
            strokeWidth: 2,
            paintFirst: 'stroke',
            cornerColor: '#39FF14',
            cornerStrokeColor: '#000',
            borderColor: '#39FF14',
            transparentCorners: false,
            cornerSize: 12,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        textInput.value = '';
    });

    // 3. Download Meme
    downloadBtn.addEventListener('click', () => {
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1.0
        });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'tatsuki-meme.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
