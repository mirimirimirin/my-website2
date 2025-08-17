// アプリケーションの状態管理
const appState = {
    currentChapter: 1,
    quizAnswers: [],
    characterResult: null,
    hashtags: [],
    posts: []
};

// 診断の質問データ
const quizQuestions = [
    {
        question: "文化祭の準備、あなたはどの役割を選ぶ？",
        choices: [
            { value: "planner", text: "企画・進行管理" },
            { value: "creative", text: "装飾・デザイン" },
            { value: "support", text: "裏方・サポート" }
        ]
    },
    {
        question: "グループワークで、あなたが最も活躍する場面は？",
        choices: [
            { value: "leader", text: "全体の方向性を決める" },
            { value: "creative", text: "アイデアを出す" },
            { value: "organizer", text: "作業を整理・調整する" }
        ]
    },
    {
        question: "新しいことを学ぶ時、あなたはどうする？",
        choices: [
            { value: "systematic", text: "体系的に順序立てて学ぶ" },
            { value: "experimental", text: "実際に試してみる" },
            { value: "collaborative", text: "誰かと一緒に学ぶ" }
        ]
    },
    {
        question: "問題が起きた時、あなたの対処法は？",
        choices: [
            { value: "analytical", text: "原因を分析して解決策を考える" },
            { value: "intuitive", text: "直感で行動する" },
            { value: "collaborative", text: "周りの人に相談する" }
        ]
    },
    {
        question: "将来の夢について、あなたはどう考える？",
        choices: [
            { value: "planner", text: "具体的な計画を立てる" },
            { value: "explorer", text: "様々な可能性を探る" },
            { value: "helper", text: "人の役に立つことを考える" }
        ]
    }
];

// キャラクター結果データ
const characterResults = {
    planner: {
        name: "夢見る戦略家",
        catchphrase: "静かな情熱で、未来をデザインする",
        image: "./dream-strategist.jpg",
        traits: [
            "計画を立てるのが得意",
            "一人で深く考えるのが好き",
            "複雑な問題を解くことに喜びを感じる",
            "責任感が強く、信頼される"
        ],
        jobs: [
            "プロジェクト管理",
            "データ分析",
            "研究開発",
            "コンテンツ企画"
        ]
    },
    creative: {
        name: "創造的イノベーター",
        catchphrase: "独創的な発想で、世界に新しい価値を",
        traits: [
            "独創的なアイデアを生み出す",
            "芸術的センスに優れている",
            "新しいことに挑戦するのが好き",
            "感情豊かで表現力がある"
        ],
        jobs: [
            "デザイナー",
            "クリエイター",
            "マーケティング",
            "エンターテイメント"
        ]
    },
    support: {
        name: "支える心の持ち主",
        catchphrase: "優しさと思いやりで、みんなを支える",
        traits: [
            "人の気持ちを理解するのが得意",
            "協調性があり、チームワークが良い",
            "細かい作業を丁寧にこなす",
            "困っている人を放っておけない"
        ],
        jobs: [
            "カウンセラー",
            "看護師・介護士",
            "教育・保育",
            "サービス業"
        ]
    },
    leader: {
        name: "リーダーシップの星",
        catchphrase: "明確なビジョンで、みんなを導く",
        traits: [
            "リーダーシップを発揮できる",
            "決断力があり、行動力がある",
            "人をまとめるのが得意",
            "目標に向かって突き進む"
        ],
        jobs: [
            "経営者・起業家",
            "マネージャー",
            "政治家・公務員",
            "営業・販売"
        ]
    },
    systematic: {
        name: "論理の探求者",
        catchphrase: "論理的な思考で、真実を追求する",
        traits: [
            "論理的に考えるのが得意",
            "データや事実を重視する",
            "効率的に物事を進める",
            "正確性を大切にする"
        ],
        jobs: [
            "エンジニア",
            "研究者",
            "会計士・税理士",
            "法務・弁護士"
        ]
    },
    experimental: {
        name: "冒険の開拓者",
        catchphrase: "好奇心旺盛で、新しい道を切り開く",
        traits: [
            "好奇心が強く、新しいことに興味がある",
            "失敗を恐れずに挑戦する",
            "実践的な経験を重視する",
            "柔軟な思考ができる"
        ],
        jobs: [
            "起業家",
            "研究者",
            "ジャーナリスト",
            "アスリート"
        ]
    },
    collaborative: {
        name: "協調の調和者",
        catchphrase: "人との繋がりを大切に、共に成長する",
        traits: [
            "コミュニケーションが得意",
            "チームワークを重視する",
            "人の意見を尊重できる",
            "調整役を務めるのが上手"
        ],
        jobs: [
            "人事・採用",
            "営業・接客",
            "教育・研修",
            "イベント企画"
        ]
    },
    analytical: {
        name: "分析の達人",
        catchphrase: "鋭い観察力で、問題の本質を見抜く",
        traits: [
            "観察力が鋭く、細かいことに気づく",
            "分析的な思考ができる",
            "客観的に物事を見られる",
            "問題解決能力が高い"
        ],
        jobs: [
            "コンサルタント",
            "研究者",
            "データサイエンティスト",
            "品質管理"
        ]
    },
    intuitive: {
        name: "直感の導き手",
        catchphrase: "鋭い直感で、最適な判断を下す",
        traits: [
            "直感が鋭く、第六感が働く",
            "状況を素早く把握できる",
            "創造的な解決策を思いつく",
            "機転が利く"
        ],
        jobs: [
            "クリエイター",
            "起業家",
            "カウンセラー",
            "トレーダー"
        ]
    },
    helper: {
        name: "奉仕の心の持ち主",
        catchphrase: "人の幸せのために、自分を捧げる",
        traits: [
            "人の役に立ちたいという気持ちが強い",
            "思いやりがあり、優しい心の持ち主",
            "社会貢献に興味がある",
            "奉仕の精神がある"
        ],
        jobs: [
            "医師・看護師",
            "教師・保育士",
            "NPO・ボランティア",
            "公務員"
        ]
    },
    explorer: {
        name: "未知への冒険者",
        catchphrase: "限りない好奇心で、新しい世界を発見する",
        traits: [
            "好奇心が強く、新しいことに興味がある",
            "冒険心があり、リスクを恐れない",
            "多様な価値観を受け入れられる",
            "常に学び続ける姿勢がある"
        ],
        jobs: [
            "研究者",
            "ジャーナリスト",
            "旅行業",
            "国際関係"
        ]
    }
};

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSamplePosts();
});

// アプリケーションの初期化
function initializeApp() {
    // 診断の選択肢ボタンにイベントリスナーを追加
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', handleChoiceSelection);
    });

    // タブ切り替えのイベントリスナーを追加
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabSwitch);
    });

    // ハッシュタグ生成のイベントリスナーを追加
    const strengthsTextarea = document.getElementById('strengths-textarea');
    if (strengthsTextarea) {
        strengthsTextarea.addEventListener('input', generateHashtags);
    }
}

// 診断の選択肢を処理
function handleChoiceSelection(event) {
    const choice = event.target.dataset.value;
    appState.quizAnswers.push(choice);
    
    // 次の質問に進むか、結果を表示するかチェック
    if (appState.quizAnswers.length < quizQuestions.length) {
        showNextQuestion();
    } else {
        showQuizResult();
    }
}

// 次の質問を表示
function showNextQuestion() {
    const currentQuestionIndex = appState.quizAnswers.length;
    const question = quizQuestions[currentQuestionIndex];
    
    // 質問テキストを更新
    document.getElementById('question-text').textContent = question.question;
    
    // 選択肢を更新
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    question.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.dataset.value = choice.value;
        button.textContent = choice.text;
        button.addEventListener('click', handleChoiceSelection);
        choicesContainer.appendChild(button);
    });
    
    // プログレスバーを更新
    updateProgressBar(currentQuestionIndex + 1);
}

// プログレスバーを更新
function updateProgressBar(currentStep) {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    const progress = (currentStep / quizQuestions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${currentStep} / ${quizQuestions.length}`;
}

// 診断結果を表示
function showQuizResult() {
    // 最も多く選択された性格タイプを決定
    const answerCounts = {};
    appState.quizAnswers.forEach(answer => {
        answerCounts[answer] = (answerCounts[answer] || 0) + 1;
    });
    
    const dominantType = Object.keys(answerCounts).reduce((a, b) => 
        answerCounts[a] > answerCounts[b] ? a : b
    );
    
    const result = characterResults[dominantType];
    appState.characterResult = result;
    
    // 結果画面の内容を更新
    document.getElementById('character-name').textContent = result.name;
    document.getElementById('character-catchphrase').textContent = result.catchphrase;
    
    const traitsList = document.getElementById('traits-list');
    traitsList.innerHTML = '';
    result.traits.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait;
        traitsList.appendChild(li);
    });
    
    const jobTags = document.getElementById('job-tags');
    jobTags.innerHTML = '';
    result.jobs.forEach(job => {
        const span = document.createElement('span');
        span.className = 'job-tag';
        span.textContent = job;
        jobTags.appendChild(span);
    });
    
    // キャラクター画像を表示
    displayCharacterImage(result);
    
    // 診断画面を隠して結果画面を表示
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
    
    // 第3章の要約も更新
    updateChapter3Summary();
}

// キャラクター画像を表示
function displayCharacterImage(character) {
    // 夢見る戦略家の場合のみ画像を表示
    if (character.name === "夢見る戦略家" && character.image) {
        // 第1章の結果画面に画像を表示
        const imageContainer = document.getElementById('character-image-container');
        if (imageContainer) {
            imageContainer.innerHTML = `<img src="${character.image}" alt="${character.name}" class="character-image">`;
        }
        
        // 第3章の要約画面にも画像を表示
        const summaryImage = document.getElementById('summary-character-image');
        if (summaryImage) {
            summaryImage.innerHTML = `<img src="${character.image}" alt="${character.name}">`;
        }
    } else {
        // 他のキャラクターの場合は画像をクリア
        const imageContainer = document.getElementById('character-image-container');
        if (imageContainer) {
            imageContainer.innerHTML = '';
        }
        
        const summaryImage = document.getElementById('summary-character-image');
        if (summaryImage) {
            summaryImage.innerHTML = '';
        }
    }
}

// 第3章の要約を更新
function updateChapter3Summary() {
    if (appState.characterResult) {
        document.getElementById('summary-character-name').textContent = appState.characterResult.name;
        
        const summaryTraitsList = document.getElementById('summary-traits-list');
        summaryTraitsList.innerHTML = '';
        appState.characterResult.traits.forEach(trait => {
            const li = document.createElement('li');
            li.textContent = trait;
            summaryTraitsList.appendChild(li);
        });
    }
    
    // ハッシュタグの要約も更新
    updateHashtagsSummary();
}

// タブ切り替えを処理
function handleTabSwitch(event) {
    const targetTab = event.target.dataset.tab;
    
    // タブボタンのアクティブ状態を更新
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // タブパネルの表示を更新
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(targetTab).classList.add('active');
}

// ハッシュタグを生成
function generateHashtags() {
    const text = document.getElementById('strengths-textarea').value;
    const words = text.split(/[\s\n、。！？]+/).filter(word => word.length > 0);
    
    const hashtags = words.map(word => `#${word}`).slice(0, 10); // 最大10個まで
    appState.hashtags = hashtags;
    
    // ハッシュタグを表示
    const hashtagsContainer = document.getElementById('hashtags');
    hashtagsContainer.innerHTML = '';
    
    hashtags.forEach(hashtag => {
        const span = document.createElement('span');
        span.className = 'hashtag';
        span.textContent = hashtag;
        hashtagsContainer.appendChild(span);
    });
    
    // 第3章の要約も更新
    updateHashtagsSummary();
}

// ハッシュタグの要約を更新
function updateHashtagsSummary() {
    const summaryHashtags = document.getElementById('summary-hashtags');
    if (summaryHashtags) {
        summaryHashtags.innerHTML = '';
        appState.hashtags.forEach(hashtag => {
            const span = document.createElement('span');
            span.className = 'hashtag';
            span.textContent = hashtag;
            summaryHashtags.appendChild(span);
        });
    }
}

// 章の表示を切り替え
function showChapter(chapterNumber) {
    // 現在の章を非表示
    document.querySelectorAll('.chapter').forEach(chapter => {
        chapter.classList.remove('active');
    });
    
    // 指定された章を表示
    document.getElementById(`chapter${chapterNumber}`).classList.add('active');
    appState.currentChapter = chapterNumber;
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// アクション情報を表示
function showActionInfo(actionType) {
    const actionInfo = {
        hassyadai: "HASSYADAIのイベント詳細ページに遷移します。実際のアプリでは、ここで外部リンクに飛びます。",
        instagram: "InstagramのDMで相談するための案内が表示されます。実際のアプリでは、Instagramアプリを開きます。",
        'study-abroad': "留学エージェントの説明会の詳細が表示されます。実際のアプリでは、説明会の申し込みページに遷移します。",
        programming: "プログラミング教室の体験レッスンの申し込みページに遷移します。実際のアプリでは、外部サイトに飛びます。"
    };
    
    alert(actionInfo[actionType] || "アクション情報が表示されます。");
}

// 投稿を作成
function createPost() {
    const postText = document.getElementById('post-textarea').value.trim();
    
    if (!postText) {
        alert('投稿内容を入力してください。');
        return;
    }
    
    const post = {
        id: Date.now(),
        author: 'あなた',
        content: postText,
        timestamp: new Date(),
        likes: 0,
        comments: [],
        isLiked: false
    };
    
    appState.posts.unshift(post);
    displayPosts();
    
    // 投稿フォームをクリア
    document.getElementById('post-textarea').value = '';
    
    alert('投稿が完了しました！');
}

// 投稿を表示
function displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    
    appState.posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

// 投稿要素を作成
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    
    const timestamp = post.timestamp.toLocaleString('ja-JP', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">${post.author.charAt(0)}</div>
            <div>
                <div class="post-author">${post.author}</div>
                <div style="font-size: 0.8rem; color: #999;">${timestamp}</div>
            </div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
            <div class="post-action ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                <span>❤️</span>
                <span>${post.likes}</span>
            </div>
            <div class="post-action" onclick="showCommentInput(${post.id})">
                <span>💬</span>
                <span>コメント</span>
            </div>
        </div>
        <div id="comments-${post.id}" class="comments-section" style="display: none;">
            <div class="comment-input-container">
                <input type="text" class="comment-input" placeholder="コメントを入力..." onkeypress="handleCommentKeypress(event, ${post.id})">
                <button class="comment-btn" onclick="addComment(${post.id})">送信</button>
            </div>
            <div class="comments-list" id="comments-list-${post.id}"></div>
        </div>
    `;
    
    return postDiv;
}

// いいねを切り替え
function toggleLike(postId) {
    const post = appState.posts.find(p => p.id === postId);
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        displayPosts();
    }
}

// コメント入力欄を表示/非表示
function showCommentInput(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    const isVisible = commentsSection.style.display !== 'none';
    
    commentsSection.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        // コメント入力欄にフォーカス
        const commentInput = commentsSection.querySelector('.comment-input');
        commentInput.focus();
    }
}

// コメントを追加
function addComment(postId) {
    const post = appState.posts.find(p => p.id === postId);
    const commentInput = document.querySelector(`#comments-${postId} .comment-input`);
    const commentText = commentInput.value.trim();
    
    if (!commentText) return;
    
    const comment = {
        id: Date.now(),
        author: 'あなた',
        content: commentText,
        timestamp: new Date()
    };
    
    post.comments.push(comment);
    commentInput.value = '';
    
    displayComments(postId);
}

// コメントのキー入力処理
function handleCommentKeypress(event, postId) {
    if (event.key === 'Enter') {
        addComment(postId);
    }
}

// コメントを表示
function displayComments(postId) {
    const post = appState.posts.find(p => p.id === postId);
    const commentsList = document.getElementById(`comments-list-${postId}`);
    
    commentsList.innerHTML = '';
    
    post.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        commentDiv.style.cssText = 'padding: 8px 0; border-bottom: 1px solid #f0f0f0;';
        
        const timestamp = comment.timestamp.toLocaleString('ja-JP', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        commentDiv.innerHTML = `
            <div style="font-weight: 600; font-size: 0.9rem;">${comment.author}</div>
            <div style="margin: 4px 0;">${comment.content}</div>
            <div style="font-size: 0.8rem; color: #999;">${timestamp}</div>
        `;
        
        commentsList.appendChild(commentDiv);
    });
}

// サンプル投稿を読み込み
function loadSamplePosts() {
    const samplePosts = [
        {
            id: 1,
            author: '冒険者A',
            content: '今日は英単語を50個覚えた！ #留学準備 #英語学習',
            timestamp: new Date(Date.now() - 3600000), // 1時間前
            likes: 5,
            comments: [],
            isLiked: false
        },
        {
            id: 2,
            author: '冒険者B',
            content: 'プログラミングの基礎を学び始めた！最初は難しいけど楽しい #プログラミング #学習',
            timestamp: new Date(Date.now() - 7200000), // 2時間前
            likes: 3,
            comments: [],
            isLiked: false
        },
        {
            id: 3,
            author: '冒険者C',
            content: '将来の夢について友達と話し合った。新しい可能性が見えてきた！ #キャリア #夢',
            timestamp: new Date(Date.now() - 10800000), // 3時間前
            likes: 7,
            comments: [],
            isLiked: false
        }
    ];
    
    appState.posts = samplePosts;
    displayPosts();
}
