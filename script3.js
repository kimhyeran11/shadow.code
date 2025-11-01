// ⭐ [추가] Index Code의 내러티브 데이터 및 헬퍼 함수 ⭐

// 애니메이션에서 제외될 파일 목록 (하드코딩된 정적 배경 요소)
const EXCLUDED_ANIMATION_FILES = [
    '성1.png',
    '가로등1-2.png',
    '분수대.png',
    '배.png',
    '집1.png',
    '쌍가로등1-2.png',
    '의자.png',
    '가로수.png'
].map(name => name.toLowerCase());


// URL 인코딩(한글) 문제를 해결한 헬퍼 함수
function getFilenameFromUrl(url) {
    if (!url) return null;
    let filename = '';
    try {
        const path = new URL(url).pathname;
        filename = path.substring(path.lastIndexOf('/') + 1);
    } catch (e) {
        const lastSlashIndex = url.lastIndexOf('/');
        if (lastSlashIndex !== -1) {
            filename = url.substring(lastSlashIndex + 1);
        } else {
            filename = url;
        }
    }

    filename = filename.replace(/['"]/g, '');
    try {
        return decodeURIComponent(filename);
    } catch (e) {
        return filename;
    }
}

// 파일이 제외 목록에 포함되는지 확인하는 헬퍼 함수
function isExcludedFile(url) {
    if (!url) return false;
    const filename = getFilenameFromUrl(url).toLowerCase();
    // 파일명만 확인하여 제외 대상인지 판단
    return EXCLUDED_ANIMATION_FILES.includes(filename);
}

// 엔딩 분기를 결정하는 헬퍼 함수
function getEndingType(backgroundUrl) {
    if (!backgroundUrl || backgroundUrl === 'none') return 'happy';
    const filename = getFilenameFromUrl(backgroundUrl);
    if (filename === '밤.png' || filename === '비.png' || filename === '나무.png') {
        return 'sad';
    }
    return 'happy';
}

// 8개 장면에 대한 "AI" 내러티브 데이터 (Index Code에서 복사)
const narrativeData = {
    '1': {
        question: "1장: 가면 속의 만남\n로미오와 줄리엣이 처음 만난 장소는 어디일까요?",
        backgroundText: {
            '낮.png': "몬태규가의 로미오가 한낮의 거리를 걷다가",
            '밤.png': "몬태규가의 로미오가 달빛 아래를 걷다가",
            '비.png': "비 내리는 오후, 몬태규가의 로미오가",
            '눈.png': "함박눈 내리던 어느 날, 몬태규가의 로미오가",
            '계단.png': "몬태규가의 로미오가 웅장한 계단이 있는 곳을 지나다가",
            '도시.png': "도심 한가운데에서 몬태규가의 로미오가",
            '나무.png': "숲속에서 길을 잃은 몬태규가의 로미오가",
            'default': "몬태규가의 로미오가 길을 걷다가"
        },
        decorationText: {
            '집': " 외딴 오두막에서 여행 중이던 캐풀렛가의 줄리엣을 만납니다.",
            '성': " 성을 산책 중이던 캐풀렛가의 줄리엣을 만납니다.",
            '가로등': " 환한 가로등 아래에서 캐풀렛가의 줄리엣을 만납니다.",
            '가로수': " 푸른 가로수가 있는 길에서 캐풀렛가의 줄리엣을 만납니다.",
            '의자': " 벤치에 앉아 쉬고 있던 캐풀렛가의 줄리엣을 만납니다.",
            '배': " 강가에서 배를 타고 있던 캐풀렛가의 줄리엣을 만납니다.",
            'default': " 우연히 캐풀렛가의 줄리엣을 만납니다."
        },
        finalText: {
            'default': "둘은 첫눈에 반하지만, 원수의 자식임을 알고 절망합니다."
        }
    },
    '2': {
        question: "2장: 달빛 아래 맹세\n로미오가 줄리엣의 고백을 엿들은 곳은 어디인가요?",
        backgroundText: {
            '낮.png': "아직 해가 지지 않은 낮이지만, 줄리엣을 잊지 못한 로미오가",
            '밤.png': "달빛이 비추는 밤, 줄리엣을 잊지 못한 로미오가",
            '비.png': "차가운 비가 내리는 밤, 로미오가",
            '눈.png': "소리 없이 눈이 내리는 밤, 로미오가",
            '계단.png': "그녀의 방으로 이어지는 계단 아래로 로미오가",
            '도시.png': "도시가 잠든 고요한 밤, 로미오가",
            '나무.png': "숲처럼 우거진 정원 나무 그늘 아래로 로미오가",
            'default': "줄리엣을 잊지 못한 로미오가 그녀를 찾아"
        },
        decorationText: {
            '집': " 그녀의 집 발코니를 올려다봅니다.",
            '성': " 그녀의 성 발코니를 올려다봅니다.",
            '가로등': " 희미한 가로등 불빛이 비추는 발코니를 올려다봅니다.",
            '가로수': " 정원의 가로수 뒤에 숨어 그녀의 발코니를 올려다봅니다.",
            '의자': " 발코니 아래 벤치에 앉아 그녀를 기다립니다.",
            '배': " 강 건너편에서 배를 타고 그녀의 방을 올려다봅니다.",
            'default': " 그녀의 방 발코니를 올려다봅니다."
        },
        finalText: {
            'default': "줄리엣의 사랑 고백을 듣게 되며 두 사람은 영원한 사랑을 약속합니다."
        }
    },
    '3': {
        question: "3장: 성스러운 비밀\n두 사람의 비밀 결혼식은 어디서 열렸나요?",
        backgroundText: {
            '낮.png': "다음 날 낮, 두 사람은 조력자를 찾아가",
            '밤.png': "다음 날 어두운 밤, 두 사람은 사람들의 눈을 피해",
            '비.png': "비가 내리는 날, 두 사람은 비밀을 감춘 채",
            '눈.png': "눈이 내리는 날, 두 사람은 순결한 맹세를 위해",
            '계단.png': "예배당의 계단을 올라, 두 사람은",
            '도시.png': "도시의 작은 예배당으로, 두 사람은",
            '나무.png': "숲속 작은 예배당으로, 두 사람은",
            'default': "두 사람은 조력자를 찾아가"
        },
        decorationText: {
            '집': " 작은 집과 같은 예배당 안에서 조력자의 주례로 결혼합니다.",
            '성': " 비록 성은 아니지만, 경건한 예배당 안에서 조력자의 주례로 결혼합니다.",
            '가로등': " 촛불이 가로등처럼 두 사람을 비추는 예배당 안에서 조력자의 주례로 결혼합니다.",
            '가로수': " 정원의 가로수 아래에서 소박한 결혼식을 올립니다.",
            '의자': " 벤치에 앉아 조용히 결혼 서약을 나눕니다.",
            '배': " 강가의 작은 배 위에서 비밀 결혼식을 올립니다.",
            'default': " 예배당 안에서 조력자의 주례로 결혼합니다."
        },
        finalText: {
            'happy': "조력자는 '화해'를 이끌 것이라 믿으며 이들의 결합을 돕고, 둘은 신성한 부부의 연을 맺습니다.",
            'sad': "조력자는 '불길한 예감 속에서' 이들의 결합을 돕고, 둘은 신성한 부부의 연을 맺습니다."
        }
    },
    '4': {
        question: "4장: 광장의 결투\n비극적인 결투가 벌어진 장소는 어디인가요?",
        backgroundText: {
            '낮.png': "결혼식 직후, 뜨거운 태양 아래",
            '밤.png': "결혼식 직후, 어두운 밤의 광장에서",
            '비.png': "결혼식 직후, 비 내리는 거리에서",
            '눈.png': "결혼식 직후, 눈 내리는 혼란 속에서",
            '계단.png': "결혼식 직후, 광장 계단에서",
            '도시.png': "결혼식 직후, 도시 광장 한복판에서",
            '나무.png': "결혼식 직후, 광장 옆 나무 그늘에서",
            'default': "결혼식 직후, 거리에서"
        },
        decorationText: {
            '집': " 사람들이 지켜보는 집들 앞에서, 줄리엣의 사촌이 로미오를 도발합니다.",
            '성': " 저 멀리 캐풀렛가의 성이 보이는 광장에서, 줄리엣의 사촌이 로미오를 도발합니다.",
            '가로등': " 가로등이 켜지기 시작한 거리에서, 줄리엣의 사촌이 로미오를 도발합니다.",
            '가로수': " 가로수가 늘어선 광장에서 줄리엣의 사촌이 로미오를 도발합니다.",
            '의자': " 벤치가 놓인 광장에서 줄리엣의 사촌이 로미오를 도발합니다.",
            '배': " 강가의 배 위에서 줄리엣의 사촌이 로미오를 도발합니다.",
            'default': " 줄리엣의 사촌이 로미오를 도발합니다."
        },
        finalText: {
            'default': "싸움을 말리던 로미오의 친구가 사촌의 칼에 다치게 됩니다."
        }
    },
    '5': {
        question: "5장: 슬픈 이별과 추방\n로미오와 줄리엣이 마지막 밤을 보낸 곳은 어디인가요?",
        backgroundText: {
            '낮.png': "친구를 다치게 한 죄로 추방 명령을 받고, 날이 밝기 전",
            '밤.png': "친구를 다치게 한 죄로 추방 전 마지막 밤,",
            '비.png': "친구를 다치게 한 죄로 추방당하는 슬픈 밤, 창밖에 비가 내립니다.",
            '눈.png': "친구를 다치게 한 죄로 추방당하는 차가운 밤, 눈이 내립니다.",
            '계단.png': "친구를 다치게 한 죄로 추방당하기 전, 마지막으로 그녀의 방 계단을 올라,",
            '도시.png': "친구를 다치게 한 죄로 추방당하기 전 밤, 도시가 잠든 사이,",
            '나무.png': "친구를 다치게 한 죄로 추방당하기 전 밤, 창밖 나무가 흔들립니다.",
            'default': "친구를 다치게 한 죄로 추방당하게 된 로미오."
        },
        decorationText: { // 키: alt 속성값
            '집': " 줄리엣의 집, 그녀의 방 안에서 두 사람은 마지막 밤을 보냅니다.",
            '성': " 줄리엣의 성, 그녀의 방 안에서 두 사람은 마지막 밤을 보냅니다.",
            '가로등': " 창밖 가로등 불빛이 꺼져갈 무렵, 두 사람은 마지막 밤을 보냅니다.",
            '가로수': " 창밖 가로수가 흔들리는 그녀의 방에서 두 사람은 마지막 밤을 보냅니다.",
            '의자': " 벤치에 앉아 서로를 위로하며 마지막 밤을 보냅니다.",
            '배': " 강가의 작은 배 위에서 서로를 위로하며 마지막 밤을 보냅니다.",
            'default': " 그녀의 방에서 두 사람은 마지막 밤을 보냅니다."
        },
        finalText: {
            'default': "부부로서의 첫날밤이자 마지막 밤을 눈물로 함께한 뒤, 로미오는 도시를 떠나며 슬픈 이별을 맞이합니다."
        }
    },
    '6': {
        question: "6장: 강요된 약속\n줄리엣이 강제로 결혼을 약속하게 된 장소는 어디인가요?",
        backgroundText: {
            '낮.png': "로미오가 떠난 낮,",
            '밤.png': "절망적인 밤,",
            '비.png': "줄리엣의 마음처럼 비가 내리던 날,",
            '눈.png': "차가운 눈처럼 냉혹한 날,",
            '계단.png': "저택의 계단 아래서,",
            '도시.png': "도시의 명망 높은 다른 귀족과",
            '나무.png': "정원의 나무를 보며 로미오를 그리워하던 중,",
            'default': "로미오가 떠난 후,"
        },
        decorationText: { // 키: alt 속성값
            '집': " 줄리엣의 집에서 부모님은 그녀를 다른 귀족과 강제로 결혼시키려 합니다.",
            '성': " 줄리엣의 성에서 부모님은 그녀를 다른 귀족과 강제로 결혼시키려 합니다.",
            '가로등': " 가로등이 켜진 저녁, 부모님은 그녀의 슬픔을 오해하고 다른 귀족과의 결혼을 밀어붙입니다.",
            '가로수': " 정원의 가로수 아래에서 부모님은 그녀를 다른 귀족과 강제로 결혼시키려 합니다.",
            '의자': " 벤치에 앉아 있던 줄리엣에게 부모님은 다른 귀족과의 결혼을 강요합니다.",
            '배': " 강가의 배 위에서 줄리엣은 다른 귀족과의 결혼을 강요받습니다.",
            'default': " 부모님은 그녀를 다른 귀족과 강제로 결혼시키려 합니다."
        },
        finalText: {
            'default': "가문의 명예를 위한 결혼 강요에, 줄리엣은 거부할 수 없는 현실 앞에 깊은 절망에 빠집니다."
        }
    },
    '7': {
        question: "7장: 위험한 계획\n줄리엣이 조력자에게 비약을 받은 곳은 어디인가요?",
        backgroundText: {
            '낮.png': "다음 날 낮, 줄리엣은 마지막 희망을 안고 조력자를 찾아가",
            '밤.png': "늦은 밤, 줄리엣은 몰래 조력자의 예배당으로",
            '비.png': "비를 맞으며, 그녀는 절박한 심정으로 조력자에게",
            '눈.png': "눈길을 헤치고, 줄리엣은 조력자의 방으로",
            '계단.png': "다시 찾은 예배당 계단을 올라, 조력자에게",
            '도시.png': "도시 외곽의 예배당으로, 조력자를 찾아",
            '나무.png': "숲속 예배당으로, 조력자를 만나러",
            'default': "마지막 희망을 안고 줄리엣은 조력자를 찾아가"
        },
        decorationText: { // 키: alt 속성값
            '집': " 조력자의 작은 집(방)에서, 그녀는 42시간 동안 잠드는 비약을 건네받습니다.",
            '성': " 성으로 돌아가기 전, 그녀는 42시간 동안 잠드는 비약을 건네받습니다.",
            '가로등': " 가로등도 없는 어두운 예배당 안에서, 그녀는 42시간 동안 잠드는 비약을 건네받습니다.",
            '가로수': " 예배당의 가로수 아래에서, 그녀는 42시간 동안 잠드는 비약을 건네받습니다.",
            '의자': " 벤치에 앉아 있던 줄리엣은 조력자에게 42시간 동안 잠드는 비약을 건네받습니다.",
            '배': " 강가의 작은 배 위에서 줄리엣은 조력자에게 42시간 동안 잠드는 비약을 건네받습니다.",
            'default': " 조력자의 방 안에서 그녀는 42시간 동안 잠드는 비약을 건네받습니다."
        },
        finalText: {
            'happy': "조력자는 '희망을 가지고' 이 계획을 알릴 편지를 로미오에게 급히 보냅니다.",
            'sad': "조력자는 '불길한 예감 속에서' 이들의 결합을 돕고, 둘은 신성한 부부의 연을 맺습니다."
        }
    },
    '8': {
        question: "8장: 운명의 갈림길 (최종장)\n두 연인의 마지막은 어떻게 될까요?",
        backgroundText: {
            '낮.png': "다행히 날이 밝아, 전령은 무사히 길을 떠나",
            '밤.png': "하지만 폭풍우가 몰아치는 밤이라, 전령은 길을 떠나지 못하고",
            '비.png': "하지만 쏟아지는 비 때문에 길이 막혀, 전령은 제때 도착하지 못하고",
            '눈.png': "다행히 눈이 그쳐, 전령은 로미오를 향해 출발하여",
            '계단.png': "신속한 전령 덕분에, 편지는 로미오에게 빠르게",
            '도시.png': "도시를 가로지른 전령 덕분에, 편지는 로미오에게 무사히",
            '나무.png': "하지만 숲속을 헤매던 전령이 길을 잃어, 편지는",
            'default': "운명의 편지는 로미오를 향해 출발했지만,"
        },
        decorationText: { // 키: alt 속성값
            '집': " 줄리엣이 잠든 가문의 무덤(집)에",
            '성': " 줄리엣이 잠든 '성'처럼 거대한 무덤에",
            '가로등': " 꺼진 '가로등'이 비추는 무덤에",
            '가로수': " 가로수가 늘어선 무덤에",
            '의자': " 벤치가 놓인 무덤에",
            '배': " 강가의 배 위에서 줄리엣이 잠든 무덤에",
            'default': " 줄리엣이 잠든 무덤에"
        },
        finalText: {
            'happy': " 편지를 전달받습니다. 로미오는 계획대로 그녀가 잠든 무덤으로 향하고, 깨어난 줄리엣과 재회합니다. 두 사람은 모두의 축복 속에 도시로 돌아와, 두 가문의 화해를 이끌어냅니다. (Happy Ending)",
            'sad': " 편지를 전달받지 못합니다. 줄리엣이 죽었다는 소식만 들은 로미오는 독약을 들고 무덤으로 달려옵니다. 그는 잠든 줄리엣 곁에서 숨을 거두고, 깨어난 줄리엣도 그를 따라 생을 마감합니다. 뒤늦게 두 가문은 화해합니다. (Sad Ending)"
        }
    }
};


// ---------------------------------------------------------------------------------
// 회전/크기 조절 헬퍼 함수
// ---------------------------------------------------------------------------------
function getRotatedCorners(rect, angle) {
    const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    const corners = {
        tl: { x: rect.left, y: rect.top }, tr: { x: rect.right, y: rect.top },
        bl: { x: rect.left, y: rect.bottom }, br: { x: rect.right, y: rect.bottom }
    };
    for (const key in corners) {
        corners[key] = rotatePoint(corners[key], center, angle);
    }
    return corners;
}

function rotatePoint(point, center, angle) {
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    const newX = center.x + dx * Math.cos(angle) - dy * Math.sin(angle);
    const newY = center.y + dx * Math.sin(angle) + dy * Math.cos(angle);
    return { x: newX, y: newY };
}
// ---------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------
// 텍스트 엘리먼트 동적 생성
// ---------------------------------------------------------------------------------
function createStoryTextElement(canvasElement) {
    const textContainer = document.createElement('div');
    textContainer.className = 'story-text-container narrative-text';

    const textP = document.createElement('p');
    textP.id = 'story-text';
    textContainer.appendChild(textP);
    canvasElement.appendChild(textContainer);
}

// ---------------------------------------------------------------------------------
// 내러티브 텍스트 생성 로직
// ---------------------------------------------------------------------------------
function generateNarrativeText(sceneNumber, sceneData) {
    const storyLogic = narrativeData[sceneNumber];
    if (!storyLogic) return "내러티브 데이터 없음";

    const currentBgUrl = sceneData.background;
    const currentBgFilename = getFilenameFromUrl(currentBgUrl);

    const storyTextContainer = document.querySelector('.story-text-container');
    if (storyTextContainer) {
        if (!currentBgFilename) {
            storyTextContainer.classList.add('default-text');
            storyTextContainer.classList.remove('narrative-text');
        } else {
            storyTextContainer.classList.remove('default-text');
            storyTextContainer.classList.add('narrative-text');
        }
    }


    if (!currentBgFilename) {
        return storyLogic.question;
    }

    let fullText = "";

    const bgKey = storyLogic.backgroundText.hasOwnProperty(currentBgFilename) ? currentBgFilename : 'default';
    fullText = storyLogic.backgroundText[bgKey];

    // 꾸미기 텍스트 반영 (가장 많이 등장하는 alt 값 사용)
    const decorations = sceneData.decorations;
    let selectedDecoAlt = 'default';

    if (decorations.length > 0) {
        const altCounts = {};
        let maxCount = 0;

        decorations.forEach(deco => {
            // isAnimatable: false이거나 EXCLUDED_ANIMATION_FILES에 포함되는 (정적) 요소만 카운트
            const isStatic = deco.isAnimatable === false || isExcludedFile(deco.src);
            if (!isStatic) return; // 움직이는 요소는 제외

            const alt = deco.alt || 'default'; // Index에서 alt가 넘어옴을 가정

            altCounts[alt] = (altCounts[alt] || 0) + 1;
            if (altCounts[alt] > maxCount) {
                maxCount = altCounts[alt];
                selectedDecoAlt = alt;
            }
        });

        if (!storyLogic.decorationText.hasOwnProperty(selectedDecoAlt)) {
             selectedDecoAlt = 'default';
        }
    }

    fullText += storyLogic.decorationText[selectedDecoAlt];

    // 결말 추가 로직
    const ending = getEndingType(currentBgUrl);
    const finalTextLogic = storyLogic.finalText;

    if (finalTextLogic[ending]) {
        fullText += "\n" + finalTextLogic[ending];
    } else {
        fullText += "\n" + finalTextLogic['default'];
    }

    return fullText;
}


// ---------------------------------------------------------------------------------

function initializeAppLogic() {
    // DOM 변수들을 초기화하여 스코프 오류 방지
    const canvas = document.getElementById('canvas');
    let playButton = document.getElementById('play-animation'); // let으로 선언

    // ⭐ [추가] 웹캠 트래킹 관련 변수 ⭐
    let isTracking = false;
    let shadowCharacter = null;
    let trackingTimer = null;
    let markerPosition = { x: canvas.offsetWidth / 2, y: canvas.offsetHeight / 2 };

    // ⭐ [핵심 가정] Index 페이지의 기준 크기 (960px x 540px 유지)
    const INDEX_CANVAS_WIDTH = 960;
    const INDEX_CANVAS_HEIGHT = 540;

    // 캔버스 크기를 참조합니다. (CSS에서 유동적으로 축소된 크기)
    const currentCanvasWidth = canvas.offsetWidth;
    const currentCanvasHeight = canvas.offsetHeight;

    if (currentCanvasWidth === 0 || currentCanvasHeight === 0) {
        console.error("캔버스 크기가 0입니다. 초기화를 건너킵니다.");
        return;
    }


    // ⭐ 크기 보정 비율 계산 및 안전 장치 적용 ⭐
    const ratioX = currentCanvasWidth / INDEX_CANVAS_WIDTH;
    const ratioY = currentCanvasHeight / INDEX_CANVAS_HEIGHT;

    // 텍스트 엘리먼트 동적 생성
    createStoryTextElement(canvas);

    // ⭐ [추가] 섀도우 캐릭터 동적 생성 ⭐
    shadowCharacter = document.createElement('div');
    shadowCharacter.id = 'shadowCharacter';
    canvas.appendChild(shadowCharacter);

    // -------------------------------------------------------------------------
    // --- 웹캠 트래킹 로직 ---
    // -------------------------------------------------------------------------

    function updateShadowCharacterPosition(x, y) {
        // 캔버스 좌표(px)를 기준으로 섀도우 캐릭터 위치 업데이트
        const posX = x - shadowCharacter.offsetWidth / 2;
        const posY = y - shadowCharacter.offsetHeight / 2;

        // CSS의 transform: translate를 사용하여 위치 업데이트 (transition 적용)
        shadowCharacter.style.transform = `translate(${posX}px, ${posY}px)`;

        // markerPosition 업데이트 (트래킹 데이터를 기반으로)
        markerPosition = { x: x, y: y };

        // isAnimatable 요소의 위치를 업데이트
        updateAnimatableElementsPosition(markerPosition);
    }

    function updateAnimatableElementsPosition(targetPos) {
        const animatableElements = Array.from(canvas.querySelectorAll('.decoration-item[data-is-animatable="true"]'));

        animatableElements.forEach(el => {
            const decoData = storyData[currentScene].decorations.find(d => d.id === el.id);
            if (!decoData) return;

            // 중앙 정렬을 고려하여 위치 설정
            const newX = targetPos.x - (decoData.width / 2);
            const newY = targetPos.y - (decoData.height / 2);

            el.style.left = newX + 'px';
            el.style.top = newY + 'px';

            // 데이터 업데이트
            decoData.x = newX;
            decoData.y = newY;
        });
    }

    function dummyTrackingSimulation() {
        // 실제 웹캠/ML 모델 대신 임시 시뮬레이션
        const centerX = canvas.offsetWidth / 2;
        const baseY = canvas.offsetHeight / 2;
        const time = Date.now() / 1000;

        // 좌우 100px, 상하 50px 움직임 시뮬레이션
        const simulatedX = centerX + Math.sin(time) * 100;
        const simulatedY = baseY + Math.cos(time * 0.5) * 50;

        updateShadowCharacterPosition(simulatedX, simulatedY);

        if (isTracking) {
            trackingTimer = requestAnimationFrame(dummyTrackingSimulation);
        }
    }

    function stopTracking() {
        if (!isTracking) return;
        isTracking = false;

        // 웹캠 스트림이 있다면 중지하는 로직이 여기에 들어가야 합니다. (stream.getTracks().forEach(track => track.stop());)

        canvas.classList.remove('tracking-active');
        playButton.classList.remove('animating');
        playButton.innerText = '트래킹 시작';
        playButton.disabled = false; // 버튼 활성화

        // 임시 시뮬레이션 중지
        cancelAnimationFrame(trackingTimer);
        trackingTimer = null;

        // 섀도우 캐릭터 숨김
        shadowCharacter.style.transform = 'translate(-9999px, -9999px)';

        updateThumbnail(currentScene);
        alert("웹캠 트래킹을 중지합니다.");
    }
    
    // ⭐ [추가된 핵심 함수] 웹캠 접근 및 트래킹 시작 로직
    function startWebcamAndTracking() {
        // HTML에 <video id="webcam-feed" autoplay></video> 태그가 있다고 가정합니다.
        const videoElement = document.getElementById('webcam-feed'); 

        // 버튼 상태를 먼저 변경하여 사용자에게 반응이 왔음을 알립니다.
        playButton.disabled = true; 
        playButton.innerText = '웹캠 요청 중...';

        // 1. 웹캠 접근을 시도합니다.
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            // 2. 성공 시 트래킹 시작 상태로 전환
            isTracking = true;
            
            if (videoElement) {
                videoElement.srcObject = stream;
            }
            
            // UI 업데이트 및 더미 트래킹 시작
            document.querySelectorAll('.decoration-item').forEach(el => el.classList.remove('selected'));
            canvas.classList.add('tracking-active');
            playButton.disabled = false;
            playButton.classList.add('animating');
            playButton.innerText = '트래킹 중지';
            
            // 트래킹 시뮬레이션 시작 (실제 ML 트래킹 로직이 들어갈 자리)
            dummyTrackingSimulation(); 

            alert("웹캠 접근 성공! 트래킹을 시작합니다.");

        })
        .catch(error => {
            // 3. 실패 시 오류 메시지 표시 및 상태 복구
            console.error("웹캠 접근 오류:", error.name, error.message);
            alert(`웹캠 접근 실패: ${error.name}. HTTPS 환경인지, 권한을 허용했는지 확인해 주세요.`);
            
            playButton.disabled = false;
            playButton.classList.remove('animating');
            playButton.innerText = '트래킹 시작';
        });
    }

    // -------------------------------------------------------------------------
    
    let storyData = {
        '1': { background: '', decorations: [] },
        '2': { background: '', decorations: [] },
        '3': { background: '', decorations: [] },
        '4': { background: '', decorations: [] },
        '5': { background: '', decorations: [] },
        '6': { background: '', decorations: [] },
        '7': { background: '', decorations: [] },
        '8': { background: '', decorations: [] },
    };
    let narrativeTexts = {};

    const savedData = localStorage.getItem('storyboardData');

    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);

            Object.keys(parsedData).forEach(key => {
                if (storyData[key]) {

                    // 1. Decoration 데이터 보정
                    const loadedDecorations = (parsedData[key].decorations || []).map(deco => {
                        // X, Y, Width, Height를 안전 보정된 비율로 적용
                        const newDeco = {
                            ...deco,
                            x: deco.x * ratioX,
                            y: deco.y * ratioY,
                            width: deco.width * ratioX,
                            height: deco.height * ratioY,
                        };
                        return newDeco;
                    });

                    storyData[key] = {
                        ...storyData[key],
                        background: parsedData[key].background || '',
                        decorations: loadedDecorations,
                    };
                    narrativeTexts[key] = generateNarrativeText(key, storyData[key]);
                }
            });
            console.log("스토리 데이터, 꾸미기 요소 및 애니메이션 경로 보정 완료.");
            // localStorage.removeItem('storyboardData');
        } catch (e) {
            console.error("로컬 스토리지 데이터 파싱 오류:", e);
        }
    }

    let currentScene = 1;
    let isAnimating = false;

    function resizeCanvas() {
        // 기능 없음
    }


    // -------------------------------------------------------------------------
    // --- 데코레이션 로직
    document.querySelectorAll('.asset-item[data-type="decoration"]').forEach(item => {
        item.addEventListener('click', () => {

            if (isTracking) {
                alert("트래킹 중에는 꾸미기 요소를 추가할 수 없습니다. 트래킹을 중지해 주세요.");
                return;
            }

            const canvasImageSrc = item.src;
            let initialWidth = 100, initialHeight = 100;

            const filename = getFilenameFromUrl(item.src).toLowerCase();
            if (filename === '나비.png') {
                initialWidth = 120;
                initialHeight = 120;
            } else if (filename === '사각형.png') {
                 initialWidth = 80;
                 initialHeight = 80;
            }

            // 모바일에서 추가되는 요소는 현재 화면 크기(canvas.offsetWidth)를 기준으로 중앙에 배치
            const newDeco = {
                id: 'deco-' + Date.now(),
                src: canvasImageSrc,
                alt: item.alt || 'decoration',
                width: initialWidth,
                height: initialHeight,
                x: (canvas.offsetWidth / 2) - (initialWidth / 2),
                y: (canvas.offsetHeight / 2) - (initialHeight / 2),
                rotation: 0,
                scaleX: 1,
                isAnimatable: true
            };
            storyData[currentScene].decorations.push(newDeco);
            renderScene(currentScene);
        });
    });


    // ⭐ [수정] renderScene 함수: 렌더링 안정화 ⭐
    function renderScene(sceneNumber) {
        if (isAnimating || isTracking) return;

        const data = storyData[sceneNumber];

        // 1. 배경 이미지 URL 설정
        const bgUrl = data.background.replace(/["']/g, '').trim();
        canvas.style.backgroundImage = bgUrl ? `url("${bgUrl}")` : 'none';

        // 2. 모든 데코 엘리먼트 제거
        Array.from(canvas.querySelectorAll('div[id^="deco-"]')).forEach(child => {
            child.remove();
        });

        // 3. 데코레이션 엘리먼트 생성 및 배치
        data.decorations.forEach(createDecorationElement);

        // 4. 내러티브 텍스트 업데이트
        updateNarrative();

        // 5. 썸네일 업데이트
        updateThumbnail(sceneNumber);
    }

    // ⭐ [핵심 수정] createDecorationElement: 정적 요소의 크기 보정을 허용하도록 수정 ⭐
    function createDecorationElement(decoData) {
        const imgElement = document.createElement('img');
        imgElement.src = decoData.src;
        imgElement.alt = decoData.alt || '';

        const decoElement = document.createElement('div');
        decoElement.id = decoData.id;

        const isExcludedByFilename = isExcludedFile(decoData.src);
        const isStaticElement = decoData.isAnimatable === false || isExcludedByFilename;

        decoElement.className = 'decoration-item';

        decoElement.dataset.isLocked = isStaticElement ? 'true' : 'false';
        decoElement.dataset.isAnimatable = !isStaticElement;

        // 보정된 decoData의 크기/위치(px) 값을 CSS에 직접 적용
        decoElement.style.width = `${decoData.width}px`;
        decoElement.style.height = `${decoData.height}px`;
        decoElement.style.left = `${decoData.x}px`;
        decoElement.style.top = `${decoData.y}px`;
        decoElement.style.transform = `rotate(${decoData.rotation}deg)`;

        // Z-Index 설정 유지
        decoElement.style.zIndex = isStaticElement ? 1 : 10;
        // 정적 요소는 포인터 이벤트를 막아 편집/드래그만 방지
        decoElement.style.pointerEvents = isStaticElement ? 'none' : 'auto';

        // 이미지 요소에 스타일 적용
        imgElement.style.transform = `scaleX(${decoData.scaleX})`;

        const controls = document.createElement('div');
        controls.className = 'controls';
        controls.innerHTML = `<button class="flip" title="좌우반전"><img src="img/좌우반전.png" alt="좌우반전"></button>
                              <button class="delete" title="삭제"><img src="img/휴지통.png" alt="삭제"></button>`;

        const handles = ['tl', 'tr', 'bl', 'br', 'rotator'].map(type => {
            const handle = document.createElement('div');
            handle.className = `handle ${type}`;
            return handle;
        });

        decoElement.append(imgElement, ...handles, controls);

        canvas.appendChild(decoElement);

        // makeInteractive 호출은 정적 요소가 아닐 때만 실행
        if (!isStaticElement) {
            makeInteractive(decoElement);
        } else {
            decoElement.classList.remove('selected');
        }
    }

    // ⭐ [핵심 수정] makeInteractive 함수: 트래킹 중 편집 방지 로직 및 Resize 버그 수정 ⭐
    function makeInteractive(element) {
        const dataArray = storyData[currentScene].decorations;
        const decoData = dataArray.find(d => d.id === element.id);

        if (!decoData) return;

        // --- 마우스 이벤트 핸들러 통합 ---

        // mousedown 리스너 (선택 로직)
        element.addEventListener('mousedown', (e) => {

            if (isTracking) {
                e.preventDefault();
                return;
            }

            const isHandle = e.target.closest('.handle');
            const isControl = e.target.closest('.controls');

            if (!element.classList.contains('selected')) {
                document.querySelectorAll('.decoration-item').forEach(el => el.classList.remove('selected'));
                element.classList.add('selected');
            }

            e.stopPropagation();

            // 드래그 시작 로직 (handle이나 control을 클릭하지 않은 경우)
            if (!isHandle && !isControl) {
                // z-index 최상위로 올림
                const textContainer = canvas.querySelector('.story-text-container');
                if (textContainer) {
                    canvas.insertBefore(element, textContainer);
                } else {
                    canvas.appendChild(element);
                }

                // 드래그 로직 시작
                let pos3 = e.clientX;
                let pos4 = e.clientY;

                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;

                function elementDrag(e_move) {
                    let pos1 = pos3 - e_move.clientX;
                    let pos2 = pos4 - e_move.clientY;
                    pos3 = e_move.clientX;
                    pos4 = e_move.clientY;
                    let newTop = element.offsetTop - pos2;
                    let newLeft = element.offsetLeft - pos1;

                    element.style.top = newTop + "px";
                    element.style.left = newLeft + "px";
                }

                function closeDragElement() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                    decoData.x = element.offsetLeft;
                    decoData.y = element.offsetTop;
                    updateThumbnail(currentScene);
                }
            }
        });

        // --- 크기 조절 (Resize) 로직 (수정 완료) ---
        element.querySelectorAll('.handle:not(.rotator)').forEach(handle => {
            handle.onmousedown = (e) => {
                if (isTracking) { e.preventDefault(); return; }
                initResize(e);
            }
        });

        function initResize(e) {
            e.preventDefault();
            e.stopPropagation();
            const handleType = e.target.classList[1];
            const rect = element.getBoundingClientRect();
            const angleRad = decoData.rotation * (Math.PI / 180);
            const aspectRatio = decoData.width / decoData.height;
            const corners = getRotatedCorners(rect, angleRad);
            const oppositeCornerMap = { tl: 'br', tr: 'bl', bl: 'tr', br: 'tl' };
            const pivot = corners[oppositeCornerMap[handleType]];
            const isLeft = handleType.includes('l');
            const isTop = handleType.includes('t');

            document.onmousemove = (e_move) => {
                // ⭐ [버그 수정] e.clientY 대신 e_move.clientY를 사용하도록 수정 ⭐
                const mouseVector = { x: e_move.clientX - pivot.x, y: e_move.clientY - pivot.y };
                const rotatedMouseVector = {
                    x: mouseVector.x * Math.cos(-angleRad) - mouseVector.y * Math.sin(-angleRad),
                    y: mouseVector.x * Math.sin(-angleRad) + mouseVector.y * Math.cos(-angleRad)
                };
                let newWidth, newHeight;
                if (Math.abs(rotatedMouseVector.x) / aspectRatio > Math.abs(rotatedMouseVector.y)) {
                    newWidth = Math.abs(rotatedMouseVector.x);
                    newHeight = newWidth / aspectRatio;
                } else {
                    newHeight = Math.abs(rotatedMouseVector.y);
                    newWidth = newHeight * aspectRatio;
                }
                if (newWidth < 20) return;
                const signX = isLeft ? -1 : 1, signY = isTop ? -1 : 1;
                const localCenter = { x: (signX * newWidth) / 2, y: (signY * newHeight) / 2 };
                const rotatedCenterVector = {
                    x: localCenter.x * Math.cos(angleRad) - localCenter.y * Math.sin(angleRad),
                    y: localCenter.x * Math.sin(angleRad) + localCenter.y * Math.cos(angleRad)
                };
                const newGlobalCenter = { x: pivot.x + rotatedCenterVector.x, y: pivot.y + rotatedCenterVector.y };
                const canvasRect = canvas.getBoundingClientRect();
                const finalLeft = newGlobalCenter.x - (newWidth / 2) - canvasRect.left;
                const finalTop = newGlobalCenter.y - (newHeight / 2) - canvasRect.top;

                // DOM 요소에 스타일 적용
                element.style.width = newWidth + 'px';
                element.style.height = newHeight + 'px';
                element.style.left = finalLeft + 'px';
                element.style.top = finalTop + 'px';
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                // 최종 데이터 업데이트
                decoData.width = parseFloat(element.style.width);
                decoData.height = parseFloat(element.style.height);
                decoData.x = element.offsetLeft;
                decoData.y = element.offsetTop;
                updateThumbnail(currentScene);
            };
        }

        // --- 회전 (Rotate) 로직 (트래킹 중단 추가) ---
        const rotator = element.querySelector('.rotator');
        rotator.onmousedown = function(e) {
            if (isTracking) { e.preventDefault(); return; }
            e.preventDefault(); e.stopPropagation();
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2, centerY = rect.top + rect.height / 2;
            const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
            const startRotation = decoData.rotation;

            document.onmousemove = function(e_move) {
                const currentAngle = Math.atan2(e_move.clientY - centerY, e_move.clientX - centerX) * (180 / Math.PI);
                let newRotation = startRotation + (currentAngle - startAngle);
                const snapThreshold = 6;
                const snappedAngle = Math.round(newRotation / 90) * 90;
                if (Math.abs(newRotation - snappedAngle) < snapThreshold) {
                    newRotation = snappedAngle;
                }
                element.style.transform = `rotate(${newRotation}deg)`;
                decoData.rotation = newRotation;
            };
            document.onmouseup = function() {
                document.onmousemove = null; document.onmouseup = null;
                updateThumbnail(currentScene);
            };
        };

        // --- 좌우 반전 및 삭제 리스너 (트래킹 중단 추가) ---
        element.querySelector('.flip').addEventListener('click', (e) => {
            if (isTracking) { e.preventDefault(); return; }
            e.stopPropagation();
            decoData.scaleX *= -1;
            element.querySelector('img').style.transform = `scaleX(${decoData.scaleX})`;
            updateThumbnail(currentScene);
        });

        element.querySelector('.delete').addEventListener('click', (e) => {
            if (isTracking) { e.preventDefault(); return; }
            e.stopPropagation();
            const index = dataArray.findIndex(d => d.id === element.id);
            if (index > -1) {
                dataArray.splice(index, 1);
                element.remove();
                updateThumbnail(currentScene);
                updateNarrative();
            }
        });
    }


    // ⭐ [수정] updateNarrative 함수: 기존 로직 유지 (안전함) ⭐
    function updateNarrative() {
        const storyTextContainer = document.querySelector('.story-text-container');
        const storyText = document.getElementById('story-text');

        if (!storyTextContainer || !storyText) {
            return;
        }

        const sceneData = storyData[currentScene];
        const storyLogic = narrativeData[currentScene];

        if (!sceneData || !storyLogic) {
             storyText.innerText = "데이터 또는 로직을 찾을 수 없습니다.";
             return;
        }

        const fullText = generateNarrativeText(currentScene, sceneData);
        storyText.innerText = fullText;
    }


    // -------------------------------------------------------------------------
    // --- 타임라인 로직 (트래킹 중 전환 방지 추가)
    const scenes = document.querySelectorAll('.scene');

    scenes.forEach(scene => {
        scene.addEventListener('click', () => {
            if (isAnimating || isTracking) {
                if (isTracking) {
                    alert("트래킹 중에는 장면을 전환할 수 없습니다. 트래킹을 중지해 주세요.");
                }
                return;
            }

            scenes.forEach(s => s.classList.remove('active'));
            scene.classList.add('active');
            currentScene = scene.dataset.scene;
            renderScene(currentScene);
        });
    });

    // -------------------------------------------------------------------------
    // --- 썸네일 로직
    function updateThumbnail(sceneNumber) {
        const sceneEl = document.querySelector(`.scene[data-scene="${sceneNumber}"]`);
        if (!sceneEl) return;

        // 기존 데코레이션 제거
        Array.from(sceneEl.querySelectorAll('div')).forEach(child => child.remove());

        const sceneData = storyData[sceneNumber];
        const bgUrl = sceneData.background.replace(/[""]/g, '').trim();
        sceneEl.style.backgroundImage = bgUrl ? `url(${bgUrl})` : 'none';

        // 캔버스 크기를 기준으로 썸네일 스케일 계산
        if(!canvas || canvas.offsetWidth === 0 || !sceneEl || sceneEl.offsetWidth === 0) return;

        const scaleX = sceneEl.offsetWidth / canvas.offsetWidth;
        const scaleY = sceneEl.offsetHeight / canvas.offsetHeight;

        sceneData.decorations.forEach(decoData => {
            const miniDeco = document.createElement('div');
            miniDeco.style.position = 'absolute';
            // 보정된 decoData를 썸네일 스케일로 다시 축소
            miniDeco.style.width = (decoData.width * scaleX) + 'px';
            miniDeco.style.height = (decoData.height * scaleY) + 'px';
            miniDeco.style.left = (decoData.x * scaleX) + 'px';
            miniDeco.style.top = (decoData.y * scaleY) + 'px';

            miniDeco.style.backgroundImage = `url("${decoData.src}")`;
            miniDeco.style.backgroundSize = 'contain';
            miniDeco.style.backgroundRepeat = 'no-repeat';
            miniDeco.style.backgroundPosition = 'center';
            miniDeco.style.transform = `rotate(${decoData.rotation}deg) scaleX(${decoData.scaleX})`;
            sceneEl.appendChild(miniDeco);
        });
    }

    // -------------------------------------------------------------------------
    // 초기 설정
    // -------------------------------------------------------------------------
    resizeCanvas();
    renderScene(currentScene);
    scenes[0].classList.add('active');
    playButton.innerText = '트래킹 시작';

    // -------------------------------------------------------------------------
    // --- 애니메이션 로직 (사용 안 함)
    // -------------------------------------------------------------------------
    async function startAnimation() {
           if (isTracking) {
               alert("트래킹 중에는 애니메이션을 시작할 수 없습니다. 트래킹을 중지해 주세요.");
               return;
           }
           alert("이 버튼은 웹캠 트래킹 기능으로 대체되었습니다.");
    }

    // -------------------------------------------------------------------------
    // ⭐ [핵심] playButton 이벤트 리스너 재정의: 버튼 클릭 문제 해결
    // -------------------------------------------------------------------------
    
    // 기존 playButton 엘리먼트를 복제하여 모든 기존 리스너를 제거합니다.
    const newPlayButton = playButton.cloneNode(true);
    playButton.replaceWith(newPlayButton);
    playButton = newPlayButton; // playButton 변수를 새 엘리먼트로 업데이트

    playButton.addEventListener('click', () => {
        if (isTracking) {
            stopTracking();
        } else {
            // 웹캠 연동 로직 호출 (웹캠 권한 요청 포함)
            startWebcamAndTracking(); 
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeAppLogic);