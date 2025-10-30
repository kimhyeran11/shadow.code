document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const drawingLayer = document.getElementById('drawing-layer');
    const verticalGuide = document.querySelector('.vertical-guide');
    const horizontalGuide = document.querySelector('.horizontal-guide');
    const playButton = document.getElementById('play-animation');
    
    const ctx = drawingLayer.getContext('2d');

    const storyData = {
        '1': { background: '', decorations: [], drawing: [] }, 
        '2': { background: '', decorations: [], drawing: [] },
        '3': { background: '', decorations: [], drawing: [] },
        '4': { background: '', decorations: [], drawing: [] },
        '5': { background: '', decorations: [], drawing: [] },
        '6': { background: '', decorations: [], drawing: [] },
        '7': { background: '', decorations: [], drawing: [] },
        '8': { background: '', decorations: [], drawing: [] },
    };
    let currentScene = 1;

    let isAnimating = false; 

    let isDrawing = false;
    let currentMode = 'draw';
    
    const initialActiveSwatch = document.querySelector('.color-swatch.active');
    let currentColor = initialActiveSwatch ? initialActiveSwatch.dataset.color : '#7B7B7B';
    let currentSize = initialActiveSwatch ? parseInt(initialActiveSwatch.dataset.size) : 15;

    // 캔버스 크기 초기 설정
    function resizeCanvas() {
        drawingLayer.width = canvas.offsetWidth;
        drawingLayer.height = canvas.offsetHeight;
        redrawDrawing();
    }
    window.addEventListener('resize', resizeCanvas);


    // --- 그리기/지우개 로직 ---
    function startDrawing(e) {
        if (isAnimating) return; 
        if (!e.target.closest('#drawing-layer')) return;
        isDrawing = true;
        
        const rect = drawingLayer.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        const newPath = {
            mode: currentMode,
            color: currentColor,
            size: currentSize,
            points: [{ x: startX, y: startY }],
            scene: currentScene
        };
        storyData[currentScene].drawing.push(newPath);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        
        const rect = drawingLayer.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        const currentPath = storyData[currentScene].drawing[storyData[currentScene].drawing.length - 1];
        if (currentPath) {
            currentPath.points.push({ x: currentX, y: currentY });
        }
        
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = currentSize;

        if (currentMode === 'draw') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        } else if (currentMode === 'erase') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)'; 
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        }
    }

    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
            updateThumbnail(currentScene);
        }
    }

    function redrawDrawing() {
        ctx.clearRect(0, 0, drawingLayer.width, drawingLayer.height);

        storyData[currentScene].drawing.forEach(path => {
            if (path.points.length < 2) return;

            ctx.beginPath();
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = path.size;
            
            if (path.mode === 'draw') {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = path.color;
            } else if (path.mode === 'erase') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.strokeStyle = 'rgba(0,0,0,1)';
            }

            ctx.moveTo(path.points[0].x, path.points[0].y);
            for (let i = 1; i < path.points.length; i++) {
                ctx.lineTo(path.points[i].x, path.points[i].y);
            }
            ctx.stroke();
            ctx.closePath();
        });
    }

    drawingLayer.addEventListener('mousedown', startDrawing);
    drawingLayer.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);

    // 색상/지우개 버튼 이벤트 리스너
    document.querySelectorAll('.color-palette button').forEach(button => {
        button.addEventListener('click', (e) => {
            if (isAnimating) return;

            document.querySelectorAll('.color-palette button').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');

            currentMode = e.currentTarget.dataset.mode;
            
            const newSize = parseInt(e.currentTarget.dataset.size);
            if (!isNaN(newSize)) {
                currentSize = newSize;
            } else {
                currentSize = currentMode === 'draw' ? 15 : 35;
            }

            if (currentMode === 'draw') {
                currentColor = e.currentTarget.dataset.color;
            } 
        });
    });

    // --- 데코레이션 로직 ---
    document.querySelectorAll('.asset-item[data-type="decoration"]').forEach(item => {
        item.addEventListener('click', () => {
            if (isAnimating) return;

            if (storyData[currentScene].decorations.length >= 3) {
                alert("캔버스에는 최대 3개의 이미지만 추가할 수 있습니다.");
                return; 
            }

            const canvasImageSrc = item.dataset.canvasSrc || item.src;
            let initialWidth = 150; 
            let initialHeight = 150; 

            if (canvasImageSrc.includes('나비.png')) {
                initialWidth = 120;
                initialHeight = 120;
            }
            else if (canvasImageSrc.includes('사각형.png')) {
                initialWidth = 180;
                initialHeight = 180;
            }

            const newDeco = {
                id: 'deco-' + Date.now(),
                src: canvasImageSrc,
                width: initialWidth, 
                height: initialHeight,
                x: (canvas.offsetWidth / 2) - (initialWidth / 2),
                y: (canvas.offsetHeight / 2) - (initialHeight / 2),
                rotation: 0,
                scaleX: 1,
            };
            storyData[currentScene].decorations.push(newDeco);
            renderScene(currentScene);
        });
    });

    function renderScene(sceneNumber) {
        if (isAnimating) return; 

        const data = storyData[sceneNumber];
        canvas.style.backgroundImage = data.background ? `url(${data.background})` : 'none';
        
        Array.from(canvas.querySelectorAll('.decoration-item')).forEach(child => {
            child.remove();
        });
        
        data.decorations.forEach(createDecorationElement);

        resizeCanvas();
        redrawDrawing();
        
        updateThumbnail(sceneNumber);
    }
    
    function createDecorationElement(decoData) { 
        const imgElement = document.createElement('img');
        imgElement.src = decoData.src;
        
        const decoElement = document.createElement('div');
        decoElement.id = decoData.id;
        decoElement.className = 'decoration-item';
        decoElement.style.width = `${decoData.width}px`;
        decoElement.style.height = `${decoData.height}px`;
        decoElement.style.left = `${decoData.x}px`;
        decoElement.style.top = `${decoData.y}px`;
        decoElement.style.transform = `rotate(${decoData.rotation}deg)`;

        decoElement.appendChild(imgElement);

        decoElement.innerHTML += `
            <span class="handle tl"></span>
            <span class="handle tr"></span>
            <span class="handle bl"></span>
            <span class="handle br"></span>
            <span class="handle rotator"></span>
            <div class="controls">
                <button class="flip"><img src="img/좌우반전.png" alt="반전"></button>
                <button class="delete"><img src="img/휴지통.png" alt="삭제"></button>
            </div>
        `;
        
        canvas.appendChild(decoElement);
        makeInteractive(decoElement);
        
        decoElement.querySelector('img').style.transform = `scaleX(${decoData.scaleX})`;
    }

    function makeInteractive(element) {
        const decoData = storyData[currentScene].decorations.find(d => d.id === element.id);

        element.addEventListener('mousedown', (e) => {
             if (isAnimating) return; 
            document.querySelectorAll('.decoration-item').forEach(el => el.classList.remove('selected'));
            element.classList.add('selected');
            e.stopPropagation();
        });
        
        element.querySelectorAll('.handle:not(.rotator)').forEach(handle => {
            handle.onmousedown = (e) => { if (isAnimating) return; /* ... (resize logic) ... */ };
        });
        
        element.querySelector('.rotator').onmousedown = (e) => { 
            if (isAnimating) return; 
            // ... (rotation logic) ... 
        };

        element.querySelector('.flip').addEventListener('click', (e) => {
            if (isAnimating) return; 
            e.stopPropagation();
            decoData.scaleX *= -1;
            element.querySelector('img').style.transform = `scaleX(${decoData.scaleX})`;
            updateThumbnail(currentScene);
        });
        
        element.querySelector('.delete').addEventListener('click', (e) => {
            if (isAnimating) return; 
            e.stopPropagation();
            const index = storyData[currentScene].decorations.findIndex(d => d.id === element.id);
            if (index > -1) {
                storyData[currentScene].decorations.splice(index, 1);
                element.remove();
                updateThumbnail(currentScene);
            }
        });
    }

    // --- 타임라인 로직 ---
    const scenes = document.querySelectorAll('.scene');

    scenes.forEach(scene => {
        scene.addEventListener('click', () => {
            if (isAnimating) return;

            scenes.forEach(s => s.classList.remove('active'));
            scene.classList.add('active');
            currentScene = scene.dataset.scene;
            renderScene(currentScene);
        });
    });
    
    function updateThumbnail(sceneNumber) {
        const sceneElement = document.querySelector(`.scene[data-scene="${sceneNumber}"]`);
        if (!sceneElement) return;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = drawingLayer.width;
        tempCanvas.height = drawingLayer.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(drawingLayer, 0, 0);

        sceneElement.style.backgroundImage = `url(${tempCanvas.toDataURL()})`;
        sceneElement.style.backgroundSize = 'cover';
        sceneElement.style.backgroundPosition = 'center';
    }

    document.querySelectorAll('.scene').forEach(scene => {
        updateThumbnail(scene.dataset.scene);
    });
    
    // 초기 설정
    resizeCanvas();
    renderScene(currentScene); 
    
    
    // --- 애니메이션 로직 ---
    const animationColors = ['#7B7B7B', '#7E84E4', '#F88586']; 
    const animationDuration = 3000; 

    function updateDecorationPosition(element, x, y) {
        const centerX = x - (element.offsetWidth / 2);
        const centerY = y - (element.offsetHeight / 2);
        element.style.left = centerX + 'px';
        element.style.top = centerY + 'px';
    }

    // 단일 데코레이션 아이템을 경로를 따라 애니메이션하는 함수
    function animateDecoration(decoElement, path, duration) {
        return new Promise(resolve => {
            const totalPoints = path.points.length;
            if (totalPoints < 2) {
                return resolve();
            }

            const startTime = performance.now();
            
            decoElement.style.zIndex = 200; 

            function step(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                const maxIndex = totalPoints - 1;
                
                // ⭐ 최종 수정된 오류 해결 로직: Math.round()를 사용하여 인덱스 계산의 정확성을 높임
                let currentPointIndex = Math.min(Math.round(progress * maxIndex), maxIndex); 
                
                // progress가 1일 때 마지막 인덱스를 강제하여 종료 지점을 보장
                if (progress === 1) {
                    currentPointIndex = maxIndex;
                }
                
                const currentPoint = path.points[currentPointIndex]; 
                
                if (!currentPoint || typeof currentPoint.x === 'undefined') {
                    console.error("애니메이션 경로 데이터 오류 발생! (Point is undefined)");
                    decoElement.style.zIndex = 10;
                    return resolve(); 
                }
                
                updateDecorationPosition(decoElement, currentPoint.x, currentPoint.y);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    decoElement.style.zIndex = 10; 
                    resolve();
                }
            }
            requestAnimationFrame(step);
        });
    }

    async function startAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        playButton.disabled = true;
        playButton.textContent = '⏸ 재생 중...';

        document.querySelectorAll('.decoration-item').forEach(el => el.classList.remove('selected'));

        const currentData = storyData[currentScene];
        const decorations = currentData.decorations;
        const decorationElements = Array.from(canvas.querySelectorAll('.decoration-item'));

        if (decorations.length === 0) {
            alert("움직일 이미지를 추가해주세요.");
            isAnimating = false;
            playButton.disabled = false;
            playButton.textContent = '▶ 재생하기';
            return;
        }

        let animationExecuted = false;

        // 비동기 애니메이션을 순차적으로 실행
        for (let i = 0; i < decorations.length && i < animationColors.length; i++) {
            const decoData = decorations[i];
            const decoElement = decorationElements.find(el => el.id === decoData.id);
            const pathColor = animationColors[i].toUpperCase();

            // 해당 색상으로 그려진 경로를 찾습니다.
            const animationPath = currentData.drawing.find(p => p.mode === 'draw' && p.color.toUpperCase() === pathColor);
            
            if (decoElement && animationPath && animationPath.points.length >= 2) {
                await animateDecoration(decoElement, animationPath, animationDuration);
                animationExecuted = true;
            } else if (decoElement) {
                console.warn(`${decoData.id}는 ${pathColor} 경로가 없거나 너무 짧아 움직이지 않습니다.`);
            }
        }
        
        if (!animationExecuted) {
            alert("애니메이션을 실행할 유효한 이미지(최대 3개)와 경로(해당 색상으로 그린 선)가 없습니다.");
        }

        isAnimating = false;
        playButton.disabled = false;
        playButton.textContent = '▶ 재생하기';
    }

    // 재생 버튼에 이벤트 리스너 추가
    playButton.addEventListener('click', startAnimation);
});