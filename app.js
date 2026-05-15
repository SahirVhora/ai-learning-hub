// ============================================
// AI LEARNING HUB - APPLICATION LOGIC
// ============================================

let currentPath = null;
let completedTopics = new Set();
let bookmarkedResources = new Set();
let currentFilter = 'all';
let currentModalTopic = null;
let quizState = { active: false, currentIndex: 0, score: 0, answers: [] };

const STORAGE_KEY = 'aiLearningProgress';
const BOOKMARKS_KEY = 'aiLearningBookmarks';
const QUIZ_RESULTS_KEY = 'aiLearningQuizResults';

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    loadBookmarks();
    loadStreak();
    updateHeroStats();
    renderFeatured();
    renderContinueCard();
    renderUpdates();
    displayDailyUpdate();
    populateFunFacts();
    setupScrollEffects();
    setupSearch();
    setupFilters();
    setupNav();
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    console.log('🚀 AI Learning Hub ready');
});

// ============================================
// PROGRESS / STORAGE
// ============================================

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentPath,
        completedTopics: Array.from(completedTopics),
        lastUpdated: new Date().toISOString()
    }));
}

function saveQuizResult(topicId, score, total) {
    const saved = localStorage.getItem(QUIZ_RESULTS_KEY);
    const results = saved ? JSON.parse(saved) : {};
    const prev = results[topicId];
    // Keep the best score
    if (!prev || score > prev.score) {
        results[topicId] = { score, total, date: new Date().toISOString() };
        localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
    }
}

function getQuizResult(topicId) {
    const saved = localStorage.getItem(QUIZ_RESULTS_KEY);
    if (!saved) return null;
    const results = JSON.parse(saved);
    return results[topicId] || null;
}

function getTotalQuizResults() {
    const saved = localStorage.getItem(QUIZ_RESULTS_KEY);
    if (!saved) return 0;
    return Object.keys(JSON.parse(saved)).length;
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        currentPath = data.currentPath;
        completedTopics = new Set(data.completedTopics || []);
    }
}

function saveBookmarks() {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarkedResources)));
}

function loadBookmarks() {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    if (saved) bookmarkedResources = new Set(JSON.parse(saved));
}

function updateHeroStats() {
    const allTopics = Object.values(learningData).flatMap(p => p.topics);
    const totalResources = allTopics.reduce((n, t) => n + (t.content.resources?.length || 0), 0);
    document.getElementById('stat-topics').textContent = allTopics.length;
    document.getElementById('stat-resources').textContent = totalResources;
    document.getElementById('stat-completed').textContent = completedTopics.size;
    const quizzesEl = document.getElementById('stat-quizzes');
    if (quizzesEl) quizzesEl.textContent = getTotalQuizResults();

    // Streak display
    const streakEl = document.getElementById('stat-streak');
    if (streakEl) {
        const streak = loadStreak();
        streakEl.innerHTML = `${streak} <span style="font-size:1.2rem">🔥</span>`;
    }
}

// ============================================
// DAILY UPDATE
// ============================================

function displayDailyUpdate() {
    const updateSection = document.getElementById('daily-update');
    if (typeof getLatestAINews !== 'function') return;
    const news = getLatestAINews();
    document.getElementById('update-text').textContent = news.text;
    document.getElementById('update-date').textContent = news.date;
    setTimeout(() => updateSection.classList.remove('hidden'), 600);
}

// ============================================
// PATH SELECTION
// ============================================

function scrollToSelection() {
    document.getElementById('path-selection').scrollIntoView({ behavior: 'smooth' });
}

function selectPath(level) {
    currentPath = level;
    currentFilter = 'all';
    saveProgress();
    document.getElementById('path-selection').style.display = 'none';
    document.getElementById('featured').style.display = 'none';
    document.getElementById('learning-content').classList.remove('hidden');
    loadLearningContent(level);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render radar chart after entering learning content
    requestAnimationFrame(() => renderRadarChart());
}

function goBack() {
    document.getElementById('learning-content').classList.add('hidden');
    document.getElementById('path-selection').style.display = 'block';
    document.getElementById('featured').style.display = 'block';
    closeModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// FEATURED TOPICS (homepage preview)
// ============================================

function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    const picks = [
        { topic: learningData.beginner.topics[0], level: 'beginner' },
        { topic: learningData.intermediate.topics[1], level: 'intermediate' },
        { topic: learningData.expert.topics[0], level: 'expert' }
    ];
    grid.innerHTML = picks.map(({ topic, level }) => `
        <div class="featured-card" onclick="jumpToTopic('${level}','${topic.id}')" role="button" tabindex="0">
            <span class="featured-level level-${level}">${level}</span>
            <div class="featured-title">${topic.icon} ${escapeHtml(topic.title)}</div>
            <div class="featured-desc">${escapeHtml(topic.description)}</div>
        </div>
    `).join('');
}

function jumpToTopic(level, topicId) {
    selectPath(level);
    setTimeout(() => {
        const topic = learningData[level].topics.find(t => t.id === topicId);
        if (topic) openTopicModal(topic);
    }, 300);
}

// ============================================
// LEARNING CONTENT
// ============================================

function loadLearningContent(level) {
    const data = learningData[level];
    document.getElementById('content-title').textContent = data.title;
    document.getElementById('content-subtitle').textContent = data.subtitle;
    updateProgress();
    renderTopics();
    renderRadarChart();
}

function renderTopics() {
    const data = learningData[currentPath];
    const grid = document.getElementById('topic-grid');
    const empty = document.getElementById('empty-state');
    grid.innerHTML = '';

    const visible = data.topics
        .map((t, i) => ({ t, originalIndex: i }))
        .filter(({ t }) => {
            if (currentFilter === 'todo') return !completedTopics.has(t.id);
            if (currentFilter === 'done') return completedTopics.has(t.id);
            if (currentFilter === 'bookmarked') {
                return (t.content.resources || []).some(r => bookmarkedResources.has(resourceKey(t.id, r.url)));
            }
            return true;
        });

    if (visible.length === 0) {
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    visible.forEach(({ t, originalIndex }, idx) => {
        const card = createTopicCard(t, originalIndex + 1);
        card.style.animationDelay = `${idx * 50}ms`;
        card.classList.add('fade-in');
        grid.appendChild(card);
    });
}

function createTopicCard(topic, number) {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${topic.title} — ${topic.duration}`);
    if (completedTopics.has(topic.id)) card.classList.add('topic-completed');
    card.innerHTML = `
        <div class="topic-number">Topic ${number}</div>
        <div class="topic-icon" aria-hidden="true">${topic.icon}</div>
        <h3 class="topic-title">${escapeHtml(topic.title)}</h3>
        <p class="topic-description">${escapeHtml(topic.description)}</p>
        <div class="topic-meta">
            <span class="topic-badge">${escapeHtml(topic.level)}</span>
            <span class="topic-badge">⏱ ${escapeHtml(topic.duration)}</span>
        </div>
    `;
    card.addEventListener('click', () => openTopicModal(topic));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTopicModal(topic); } });
    return card;
}

function setupFilters() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-selected', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-selected', 'true');
            currentFilter = chip.dataset.filter;
            renderTopics();
        });
    });
}

// ============================================
// TOPIC MODAL
// ============================================

function openTopicModal(topic) {
    currentModalTopic = topic;
    const modal = document.getElementById('topic-modal');
    document.getElementById('modal-body').innerHTML = generateModalContent(topic);
    updateModalFooter();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
}

function closeModal() {
    document.getElementById('topic-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
    currentModalTopic = null;
    resetQuiz();
}

function updateModalFooter() {
    if (!currentModalTopic) return;
    const topics = learningData[currentPath]?.topics || [];
    const idx = topics.findIndex(t => t.id === currentModalTopic.id);
    const btnComplete = document.getElementById('btn-mark-complete');
    const btnPrev = document.getElementById('btn-prev-topic');
    const btnNext = document.getElementById('btn-next-topic');
    const isDone = completedTopics.has(currentModalTopic.id);
    btnComplete.textContent = isDone ? '✓ Completed' : 'Mark complete';
    btnComplete.classList.toggle('completed', isDone);
    btnPrev.disabled = idx <= 0;
    btnNext.disabled = idx < 0 || idx >= topics.length - 1;
}

function toggleComplete() {
    if (!currentModalTopic) return;
    const id = currentModalTopic.id;
    if (completedTopics.has(id)) {
        completedTopics.delete(id);
        showToast('Marked as not completed');
    } else {
        completedTopics.add(id);
        showToast('✓ Marked complete');
    }
    saveProgress();
    updateProgress();
    updateHeroStats();
    updateModalFooter();
    renderTopics();
}

function navigateTopic(direction) {
    if (!currentModalTopic) return;
    const topics = learningData[currentPath]?.topics || [];
    const idx = topics.findIndex(t => t.id === currentModalTopic.id);
    const target = topics[idx + direction];
    if (target) openTopicModal(target);
}

function generateModalContent(topic) {
    const c = topic.content;
    const quizResult = getQuizResult(topic.id);
    let html = `
        <div class="modal-header">
            <h2 id="modal-heading" class="modal-title">${topic.icon} ${escapeHtml(topic.title)}</h2>
            <p class="modal-subtitle">${escapeHtml(topic.description)}</p>
        </div>
        <div class="modal-section">
            <h3>📖 Overview</h3>
            <p>${escapeHtml(c.overview)}</p>
        </div>
        <div class="modal-section">
            <h3>🎯 Key points</h3>
            <ul>${c.keyPoints.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
        </div>
        <div class="modal-section">
            <h3>📚 Learning resources</h3>
            <ul class="resource-list">
                ${c.resources.map(r => {
                    const key = resourceKey(topic.id, r.url);
                    const active = bookmarkedResources.has(key) ? 'active' : '';
                    return `
                    <li class="resource-item">
                        <a href="${encodeURI(r.url)}" target="_blank" rel="noopener noreferrer" class="resource-link">
                            <span class="resource-type">${escapeHtml(r.type)}</span>
                            <span class="resource-name">${escapeHtml(r.name)}</span>
                            <span class="resource-arrow" aria-hidden="true">↗</span>
                        </a>
                        <button class="bookmark-btn ${active}" onclick="toggleBookmark('${topic.id}','${encodeURIComponent(r.url)}')" aria-label="Bookmark ${escapeHtml(r.name)}" title="Bookmark">★</button>
                    </li>`;
                }).join('')}
            </ul>
        </div>
    `;
    if (c.history && c.history.length > 0) {
        html += `
            <div class="modal-section">
                <h3>📜 Historical timeline</h3>
                <div class="history-timeline">
                    ${c.history.map(i => `
                        <div class="timeline-item">
                            <div class="timeline-year">${escapeHtml(String(i.year))}</div>
                            <div class="timeline-content">${escapeHtml(i.event)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    // Quiz section
    if (c.quiz && c.quiz.length > 0) {
        const prevResult = quizResult ? `<span class="quiz-previous">Best: ${quizResult.score}/${quizResult.total}</span>` : '';
        const avgLabel = `<span class="quiz-avg-label">Community avg: ${topic.communityAvg || 50}%</span>`;
        html += `
            <div class="modal-section quiz-section" id="quiz-section">
                <h3>🧠 Quick Quiz <span class="quiz-count">${c.quiz.length} questions</span>${avgLabel}${prevResult}</h3>
                <div id="quiz-container">
                    <p class="quiz-intro">Test your understanding of ${escapeHtml(topic.title)}. Answer all questions and see how you score!</p>
                    <button class="btn-primary quiz-start-btn" onclick="startQuiz('${topic.id}')">Start Quiz</button>
                </div>
            </div>
        `;
    }
    return html;
}

// ── QUIZ FUNCTIONS ─────────────────────────────────────────────
function startQuiz(topicId) {
    const topic = learningData[currentPath]?.topics.find(t => t.id === topicId);
    if (!topic || !topic.content.quiz) return;
    quizState = { active: true, currentIndex: 0, score: 0, answers: [], topicId };
    renderQuizQuestion(topic);
}

function renderQuizQuestion(topic) {
    const q = topic.content.quiz[quizState.currentIndex];
    const container = document.getElementById('quiz-container');
    const progress = ((quizState.currentIndex) / topic.content.quiz.length) * 100;
    container.innerHTML = `
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${progress}%"></div></div>
        <div class="quiz-question-number">Question ${quizState.currentIndex + 1} of ${topic.content.quiz.length}</div>
        <div class="quiz-question">${escapeHtml(q.question)}</div>
        <div class="quiz-options">
            ${q.options.map((opt, idx) => `
                <button class="quiz-option-btn" id="quiz-opt-${idx}" onclick="selectQuizAnswer('${topic.id}', ${idx})" aria-label="${escapeHtml(opt)}">
                    <span class="quiz-option-label">${String.fromCharCode(65 + idx)}</span>
                    <span class="quiz-option-text">${escapeHtml(opt)}</span>
                </button>
            `).join('')}
        </div>
        <div class="quiz-explanation hidden" id="quiz-explanation"></div>
        <button class="btn-primary quiz-next-btn hidden" id="quiz-next-btn" onclick="nextQuizQuestion('${topic.id}')">Next →</button>
    `;
}

function selectQuizAnswer(topicId, optionIndex) {
    const topic = learningData[currentPath]?.topics.find(t => t.id === topicId);
    if (!topic || !quizState.active) return;
    // Prevent double-answering
    if (quizState.answers.some(a => a.questionIndex === quizState.currentIndex)) return;
    const q = topic.content.quiz[quizState.currentIndex];
    const isCorrect = optionIndex === q.correct;
    if (isCorrect) quizState.score += 1;
    quizState.answers.push({ questionIndex: quizState.currentIndex, selected: optionIndex, correct: isCorrect });

    // Visual feedback
    document.querySelectorAll('.quiz-option-btn').forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correct) {
            btn.classList.add('quiz-correct');
        } else if (idx === optionIndex && !isCorrect) {
            btn.classList.add('quiz-incorrect');
        } else {
            btn.classList.add('quiz-disabled');
        }
    });

    const explanationEl = document.getElementById('quiz-explanation');
    explanationEl.innerHTML = `<strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong> ${escapeHtml(q.explanation)}`;
    explanationEl.classList.remove('hidden');
    explanationEl.setAttribute('aria-live', 'polite');

    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.classList.remove('hidden');
    nextBtn.focus();

    // Keyboard shortcut for next
    nextBtn._quizNextHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextQuizQuestion(topicId);
        }
    };
    nextBtn.addEventListener('keydown', nextBtn._quizNextHandler);
}

function nextQuizQuestion(topicId) {
    const topic = learningData[currentPath]?.topics.find(t => t.id === topicId);
    if (!topic || !quizState.active) return;
    quizState.currentIndex += 1;
    if (quizState.currentIndex >= topic.content.quiz.length) {
        showQuizResults(topic);
    } else {
        renderQuizQuestion(topic);
    }
}

function showQuizResults(topic) {
    const container = document.getElementById('quiz-container');
    const total = topic.content.quiz.length;
    const score = quizState.score;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    const communityAvg = topic.communityAvg || 50;
    const diff = pct - communityAvg;
    const diffAbs = Math.abs(diff);
    const diffEmoji = diff >= 0 ? '↑' : '↓';
    const diffColor = diff >= 0 ? 'var(--accent-green)' : '#ff453a';
    const diffText = diff === 0 ? 'equal to' : diff > 0 ? `${diffAbs}% above` : `${diffAbs}% below`;
    saveQuizResult(topic.id, score, total);

    let emoji = passed ? '🎉' : '💪';
    let message = passed ? 'Great job! You have a solid grasp of this topic.' : 'Keep learning! Review the key points above and try again.';
    if (pct === 100) { emoji = '🏆'; message = 'Perfect score! You are an expert on this topic.'; }

    container.innerHTML = `
        <div class="quiz-results">
            <div class="quiz-results-emoji">${emoji}</div>
            <div class="quiz-results-score">${score} / ${total}</div>
            <div class="quiz-results-pct" style="color: ${passed ? 'var(--accent-green)' : 'var(--accent-amber)'}">${pct}%</div>
            <div class="quiz-compare">
                <div class="quiz-compare-bar-wrap">
                    <div class="quiz-compare-track">
                        <div class="quiz-compare-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--accent-blue),var(--accent-purple))"></div>
                        <div class="quiz-compare-marker" style="left:${communityAvg}%"></div>
                    </div>
                    <div class="quiz-compare-labels">
                        <span>0%</span>
                        <span class="quiz-compare-avg-label">Community avg: ${communityAvg}%</span>
                        <span>100%</span>
                    </div>
                </div>
                <div class="quiz-compare-text" style="color:${diffColor}">
                    <span class="quiz-compare-emoji">${diffEmoji}</span>
                    Your score is ${diffText} the community average
                </div>
            </div>
            <p class="quiz-results-message">${message}</p>
            <div class="quiz-results-actions">
                <button class="btn-primary" onclick="startQuiz('${topic.id}')">Retake Quiz</button>
                <button class="btn-secondary" onclick="resetQuiz()">Close Quiz</button>
            </div>
        </div>
    `;
    // Update hero stats to reflect new quiz result
    updateHeroStats();
}

function resetQuiz() {
    quizState = { active: false, currentIndex: 0, score: 0, answers: [] };
    const container = document.getElementById('quiz-container');
    if (container && currentModalTopic) {
        const topic = currentModalTopic;
        const prevResult = getQuizResult(topic.id);
        const prevResultHtml = prevResult ? `<span class="quiz-previous">Best: ${prevResult.score}/${prevResult.total}</span>` : '';
        container.innerHTML = `
            <p class="quiz-intro">Test your understanding of ${escapeHtml(topic.title)}. Answer all questions and see how you score!</p>
            <button class="btn-primary quiz-start-btn" onclick="startQuiz('${topic.id}')">Start Quiz</button>
        `;
        // Update the header badge
        const header = container.closest('.quiz-section')?.querySelector('h3');
        if (header) {
            header.innerHTML = `🧠 Quick Quiz <span class="quiz-count">${topic.content.quiz.length} questions</span>${prevResultHtml}`;
        }
    }
}

// Keyboard shortcuts for quiz options (A-D)
document.addEventListener('keydown', (e) => {
    if (!quizState.active) return;
    const keyMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    const numMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
    let idx = keyMap[e.key] ?? numMap[e.key];
    if (idx !== undefined) {
        const btn = document.getElementById(`quiz-opt-${idx}`);
        if (btn && !btn.disabled) {
            e.preventDefault();
            btn.click();
        }
    }
    if (e.key === 'Enter' || e.key === ' ') {
        const nextBtn = document.getElementById('quiz-next-btn');
        if (nextBtn && !nextBtn.classList.contains('hidden')) {
            e.preventDefault();
            nextBtn.click();
        }
    }
});

function toggleBookmark(topicId, encodedUrl) {
    const url = decodeURIComponent(encodedUrl);
    const key = resourceKey(topicId, url);
    if (bookmarkedResources.has(key)) {
        bookmarkedResources.delete(key);
    } else {
        bookmarkedResources.add(key);
        showToast('★ Resource bookmarked');
    }
    saveBookmarks();
    // Re-render stars in-place
    if (currentModalTopic?.id === topicId) {
        document.getElementById('modal-body').innerHTML = generateModalContent(currentModalTopic);
    }
}

function resourceKey(topicId, url) {
    return `${topicId}::${url}`;
}

function updateProgress() {
    if (!currentPath) return;
    const data = learningData[currentPath];
    const total = data.topics.length;
    const done = data.topics.filter(t => completedTopics.has(t.id)).length;
    const pct = Math.round((done / total) * 100);
    document.getElementById('progress-fill').style.width = `${pct}%`;
    document.getElementById('progress-text').textContent = `${pct}% Complete (${done}/${total} topics)`;
}

// ── RADAR CHART (Skills Proficiency) ─────────────────────────────
function renderRadarChart() {
    if (!currentPath) return;
    const canvasId = 'skills-radar-chart';
    let canvas = document.getElementById(canvasId);

    // Create canvas if not exists
    if (!canvas) {
        const tracker = document.querySelector('.progress-tracker');
        if (!tracker) return;
        const wrap = document.createElement('div');
        wrap.className = 'radar-wrap';
        wrap.style.cssText = 'margin: 24px 0; padding: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md);';
        wrap.innerHTML = `<h3 style="font-family:'Syne',sans-serif;font-size:1rem;margin-bottom:12px;text-align:center;">Skills Radar</h3>
            <div style="max-width:320px;margin:0 auto;"><canvas id="${canvasId}"></canvas></div>`;
        tracker.parentNode.insertBefore(wrap, tracker.nextSibling);
        canvas = document.getElementById(canvasId);
    }

    const data = learningData[currentPath];
    const topicLabels = data.topics.map(t => t.title);
    const topicScores = data.topics.map(t => completedTopics.has(t.id) ? 100 : 0);

    // Destroy previous chart
    if (window._radarChart) { window._radarChart.destroy(); }

    window._radarChart = new Chart(canvas, {
        type: 'radar',
        data: {
            labels: topicLabels,
            datasets: [{
                label: 'Proficiency',
                data: topicScores,
                backgroundColor: 'rgba(0,113,227,0.2)',
                borderColor: '#0071e3',
                borderWidth: 2,
                pointBackgroundColor: '#0071e3',
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: { display: false, stepSize: 25 },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    pointLabels: {
                        font: { size: 10, family: 'Inter' },
                        color: '#666'
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// ── CONTINUE WHERE YOU LEFT OFF ─────────────────────────────────
function renderContinueCard() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const data = JSON.parse(saved);
    if (!data.currentPath) return;

    const pathData = learningData[data.currentPath];
    if (!pathData) return;

    // Find first incomplete topic
    const nextTopic = pathData.topics.find(t => !completedTopics.has(t.id));
    if (!nextTopic) return;

    const container = document.getElementById('hero');
    if (!container) return;

    // Check if card already exists
    if (document.getElementById('continue-card')) return;

    const card = document.createElement('div');
    card.id = 'continue-card';
    card.className = 'continue-card';
    card.innerHTML = `
        <div class="continue-inner">
            <span class="continue-label">Continue where you left off</span>
            <span class="continue-path">${pathData.title}</span>
            <span class="continue-topic">${nextTopic.icon} ${escapeHtml(nextTopic.title)}</span>
            <button class="continue-btn" onclick="jumpToTopic('${data.currentPath}','${nextTopic.id}')">Resume →</button>
        </div>
    `;
    container.appendChild(card);
}

// ── LEADERBOARD / QUIZ SUMMARY ────────────────────────────────
const LEADERBOARD_KEY = 'aiLearningQuizResults';

function openLeaderboard() {
    const modal = document.getElementById('leaderboard-modal');
    renderLeaderboard();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('.modal-close').focus(), 50);
}

function closeLeaderboard() {
    document.getElementById('leaderboard-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// ── STUDY PLAN ───────────────────────────────────────────────
function openStudyPlan() {
    const modal = document.getElementById('study-plan-modal');
    renderStudyPlan();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('.modal-close').focus(), 50);
}

function closeStudyPlan() {
    document.getElementById('study-plan-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function computeStudyPlan() {
    const saved = localStorage.getItem(QUIZ_RESULTS_KEY);
    const results = saved ? JSON.parse(saved) : {};

    // If user hasn't taken any quizzes, return empty so we can show a welcome state
    if (getTotalQuizResults() === 0) return [];

    const allTopics = [];
    Object.entries(learningData).forEach(([level, path]) => {
        path.topics.forEach(t => {
            const res = results[t.id];
            const total = t.content.quiz ? t.content.quiz.length : 0;
            const userPct = res ? Math.round((res.score / res.total) * 100) : null;
            const communityAvg = t.communityAvg || 50;
            // Taken topics rank by actual gap. Untaken get a lower base weight so taken weak spots rank higher.
            const gap = userPct !== null ? communityAvg - userPct : Math.round(communityAvg * 0.35);
            allTopics.push({
                level,
                levelTitle: path.title,
                topic: t,
                userPct,
                communityAvg,
                gap,
                total,
                taken: userPct !== null
            });
        });
    });

    // Sort by gap descending (biggest gap = highest priority)
    allTopics.sort((a, b) => b.gap - a.gap);
    return allTopics.slice(0, 3);
}

function renderStudyPlan() {
    const container = document.getElementById('study-plan-body');
    const plan = computeStudyPlan();

    if (plan.length === 0) {
        container.innerHTML = `
            <div class="sp-empty">
                <div class="sp-empty-icon">📋</div>
                <h3>Welcome to your Study Plan</h3>
                <p>Take a few quizzes first so we can recommend the topics where you need the most improvement.</p>
                <button class="btn-primary" onclick="closeStudyPlan(); scrollToSelection();" style="margin-top:1rem">Start learning</button>
            </div>
        `;
        return;
    }

    let html = `<div class="sp-list">`;
    plan.forEach((item, idx) => {
        const rankEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
        const priorityLabel = item.gap >= 15 ? 'High priority' : item.gap >= 5 ? 'Medium priority' : 'Recommended';
        const priorityClass = item.gap >= 15 ? 'sp-priority-high' : item.gap >= 5 ? 'sp-priority-medium' : 'sp-priority-low';
        const gapText = item.taken
            ? `${item.gap > 0 ? item.gap + '% below' : Math.abs(item.gap) + '% above'} community avg`
            : `Community avg: ${item.communityAvg}%`;
        const actionText = item.taken ? 'Retake quiz →' : 'Start learning →';
        const scoreText = item.taken ? `${item.userPct}% best` : 'Not taken';
        const scoreColor = item.taken
            ? (item.userPct >= 80 ? 'var(--accent-green)' : item.userPct >= 50 ? 'var(--accent-amber)' : '#ff453a')
            : 'var(--text-muted)';

        html += `
            <div class="sp-row" onclick="jumpToTopic('${item.level}','${item.topic.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')jumpToTopic('${item.level}','${item.topic.id}')" tabindex="0" role="button" aria-label="${escapeHtml(item.topic.title)} — ${priorityLabel}">
                <div class="sp-rank">${rankEmoji}</div>
                <div class="sp-main">
                    <div class="sp-header">
                        <span class="sp-icon">${item.topic.icon}</span>
                        <span class="sp-title">${escapeHtml(item.topic.title)}</span>
                        <span class="sp-level level-${item.level}">${item.levelTitle}</span>
                        <span class="sp-priority ${priorityClass}">${priorityLabel}</span>
                    </div>
                    <div class="sp-meta">
                        <span class="sp-score" style="color:${scoreColor}">${scoreText}</span>
                        <span class="sp-divider">·</span>
                        <span class="sp-gap">${gapText}</span>
                        <span class="sp-divider">·</span>
                        <span class="sp-action">${actionText}</span>
                    </div>
                    <div class="sp-bar-wrap">
                        <div class="sp-bar-track">
                            <div class="sp-bar-user" style="width:${item.taken ? item.userPct : 0}%;background:${scoreColor}"></div>
                            <div class="sp-bar-avg-marker" style="left:${item.communityAvg}%"></div>
                        </div>
                        <div class="sp-bar-labels">
                            <span>0%</span>
                            <span class="sp-bar-avg-label">Community avg: ${item.communityAvg}%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    html += `</div>`;

    // Add a footnote explaining the logic
    html += `
        <div class="sp-footer">
            <p>💡 Study plan is based on your quiz scores vs the community average. The bigger the gap, the higher the priority.</p>
        </div>
    `;

    container.innerHTML = html;
}

function renderLeaderboard() {
    const saved = localStorage.getItem(LEADERBOARD_KEY);
    const results = saved ? JSON.parse(saved) : {};
    const container = document.getElementById('leaderboard-body');

    // Flatten all topics with their scores
    const allTopics = [];
    Object.entries(learningData).forEach(([level, path]) => {
        path.topics.forEach(t => {
            const res = results[t.id];
            allTopics.push({
                level,
                levelTitle: path.title,
                topic: t,
                score: res ? res.score : null,
                total: res ? res.total : (t.content.quiz ? t.content.quiz.length : 0),
                pct: res ? Math.round((res.score / res.total) * 100) : null,
                date: res ? res.date : null
            });
        });
    });

    const taken = allTopics.filter(t => t.score !== null);
    const notTaken = allTopics.filter(t => t.score === null);
    const totalQuizzes = allTopics.filter(t => t.total > 0).length;
    const avgPct = taken.length > 0 ? Math.round(taken.reduce((s, t) => s + t.pct, 0) / taken.length) : 0;
    const best = taken.length > 0 ? taken.reduce((a, b) => a.pct > b.pct ? a : b) : null;
    const perfect = taken.filter(t => t.pct === 100).length;

    let html = `
        <div class="lb-summary">
            <div class="lb-stat">
                <div class="lb-stat-value">${taken.length}</div>
                <div class="lb-stat-label">Quizzes taken</div>
            </div>
            <div class="lb-stat">
                <div class="lb-stat-value">${avgPct}%</div>
                <div class="lb-stat-label">Average score</div>
            </div>
            <div class="lb-stat">
                <div class="lb-stat-value">${totalQuizzes - taken.length}</div>
                <div class="lb-stat-label">Remaining</div>
            </div>
            <div class="lb-stat">
                <div class="lb-stat-value">${perfect}</div>
                <div class="lb-stat-label">Perfect scores</div>
            </div>
        </div>
    `;

    if (best) {
        html += `
            <div class="lb-best">
                <span class="lb-best-icon">🏆</span>
                <div class="lb-best-text">
                    <strong>Best topic:</strong> ${escapeHtml(best.topic.title)} (${best.pct}%)
                    <span class="lb-best-level level-${best.level}">${best.levelTitle}</span>
                </div>
            </div>
        `;
    }

    if (taken.length > 0) {
        html += `<h3 class="lb-section-title">Your scores</h3><div class="lb-list">`;
        taken.sort((a, b) => b.pct - a.pct);
        taken.forEach(t => {
            const color = t.pct >= 80 ? 'var(--accent-green)' : t.pct >= 50 ? 'var(--accent-amber)' : '#ff453a';
            const avg = t.topic.communityAvg || 50;
            const diff = t.pct - avg;
            const diffSign = diff > 0 ? '+' : '';
            const diffColor = diff >= 0 ? 'var(--accent-green)' : '#ff453a';
            html += `
                <div class="lb-row" onclick="jumpToTopic('${t.level}','${t.topic.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')jumpToTopic('${t.level}','${t.topic.id}')" tabindex="0" role="button" aria-label="${escapeHtml(t.topic.title)} ${t.pct} percent">
                    <div class="lb-row-icon">${t.topic.icon}</div>
                    <div class="lb-row-info">
                        <div class="lb-row-title">${escapeHtml(t.topic.title)} <span class="lb-row-level level-${t.level}">${t.levelTitle}</span></div>
                        <div class="lb-compare-row">
                            <div class="lb-bar-wrap"><div class="lb-bar" style="width:${t.pct}%;background:${color}"></div><div class="lb-bar-avg-marker" style="left:${avg}%"></div></div>
                            <span class="lb-compare-badge" style="color:${diffColor}">${diffSign}${diff}% avg</span>
                        </div>
                    </div>
                    <div class="lb-row-score" style="color:${color}">${t.pct}%</div>
                    <div class="lb-row-detail">${t.score}/${t.total}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    if (notTaken.length > 0) {
        html += `<h3 class="lb-section-title">Not yet taken</h3><div class="lb-list lb-list-muted">`;
        notTaken.forEach(t => {
            const avg = t.topic.communityAvg || 50;
            html += `
                <div class="lb-row lb-row-untaken" onclick="jumpToTopic('${t.level}','${t.topic.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')jumpToTopic('${t.level}','${t.topic.id}')" tabindex="0" role="button" aria-label="Take quiz for ${escapeHtml(t.topic.title)}">
                    <div class="lb-row-icon" style="opacity:0.5">${t.topic.icon}</div>
                    <div class="lb-row-info">
                        <div class="lb-row-title">${escapeHtml(t.topic.title)} <span class="lb-row-level level-${t.level}">${t.levelTitle}</span></div>
                        <div class="lb-bar-wrap"><div class="lb-bar lb-bar-empty"></div><div class="lb-bar-avg-marker" style="left:${avg}%"></div></div>
                        <div class="lb-compare-muted">Community avg: ${avg}%</div>
                    </div>
                    <div class="lb-row-score">—</div>
                    <div class="lb-row-detail">${t.total} Qs</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    if (taken.length === 0) {
        html += `
            <div class="lb-empty">
                <div class="lb-empty-icon">📝</div>
                <h3>No quizzes taken yet</h3>
                <p>Pick a learning path and start a quiz to see your scores here.</p>
                <button class="btn-primary" onclick="closeLeaderboard(); scrollToSelection();" style="margin-top:1rem">Start learning</button>
            </div>
        `;
    }

    container.innerHTML = html;
}

// ── STREAK TRACKING ───────────────────────────────────────────
const STREAK_KEY = 'aiLearningStreak';

function loadStreak() {
    const raw = localStorage.getItem(STREAK_KEY);
    const today = new Date().toDateString();
    if (!raw) {
        localStorage.setItem(STREAK_KEY, JSON.stringify({ lastDate: today, count: 1 }));
        return 1;
    }
    const data = JSON.parse(raw);
    const last = new Date(data.lastDate);
    const now = new Date(today);
    const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return data.count; // already visited today
    } else if (diffDays === 1) {
        data.count += 1;
        data.lastDate = today;
        localStorage.setItem(STREAK_KEY, JSON.stringify(data));
        return data.count;
    } else {
        // streak broken
        data.count = 1;
        data.lastDate = today;
        localStorage.setItem(STREAK_KEY, JSON.stringify(data));
        return 1;
    }
}

// ============================================
// SEARCH
// ============================================

function setupSearch() {
    const input = document.getElementById('global-search');
    const results = document.getElementById('search-results');
    if (!input) return;

    const allItems = buildSearchIndex();

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (q.length < 2) { results.classList.add('hidden'); return; }
        const matches = allItems
            .filter(item => item.haystack.includes(q))
            .slice(0, 10);
        if (matches.length === 0) {
            results.innerHTML = `<div class="search-empty">No matches for &ldquo;${escapeHtml(q)}&rdquo;</div>`;
        } else {
            results.innerHTML = matches.map(m => `
                <div class="search-item" onclick="handleSearchClick('${m.kind}','${m.level || ''}','${m.topicId || ''}','${encodeURIComponent(m.url || '')}')">
                    <span class="search-icon" aria-hidden="true">${m.icon}</span>
                    <div class="search-main">
                        <div class="search-title">${escapeHtml(m.title)}</div>
                        <div class="search-sub">${escapeHtml(m.sub)}</div>
                    </div>
                    <span class="search-type">${escapeHtml(m.kind)}</span>
                </div>
            `).join('');
        }
        results.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-search')) results.classList.add('hidden');
    });
    input.addEventListener('focus', () => { if (input.value.trim().length >= 2) results.classList.remove('hidden'); });
}

function buildSearchIndex() {
    const items = [];
    Object.entries(learningData).forEach(([level, pathData]) => {
        pathData.topics.forEach(topic => {
            items.push({
                kind: 'topic',
                level,
                topicId: topic.id,
                icon: topic.icon,
                title: topic.title,
                sub: `${pathData.title} · ${topic.duration}`,
                haystack: `${topic.title} ${topic.description} ${topic.content.overview}`.toLowerCase()
            });
            (topic.content.resources || []).forEach(r => {
                items.push({
                    kind: r.type.toLowerCase(),
                    level,
                    topicId: topic.id,
                    url: r.url,
                    icon: '🔗',
                    title: r.name,
                    sub: `${topic.title} · ${r.type}`,
                    haystack: `${r.name} ${r.type} ${topic.title}`.toLowerCase()
                });
            });
        });
    });
    return items;
}

function handleSearchClick(kind, level, topicId, encodedUrl) {
    document.getElementById('search-results').classList.add('hidden');
    document.getElementById('global-search').value = '';
    if (kind === 'topic') {
        jumpToTopic(level, topicId);
    } else {
        const url = decodeURIComponent(encodedUrl);
        if (url) window.open(url, '_blank', 'noopener');
    }
}

// ============================================
// UPDATES SECTION
// ============================================

function renderUpdates() {
    const grid = document.getElementById('updates-grid');
    if (!grid || typeof aiUpdates === 'undefined') {
        // Fallback content if data not present
        const fallback = [
            { date: 'This month', title: 'Longer context windows', text: 'Frontier models are pushing past 1M-token context, changing what fits in a single prompt.' },
            { date: 'This month', title: 'Open-weight momentum', text: 'Strong open-weight releases continue to narrow the gap with closed frontier models.' },
            { date: 'Recent', title: 'Agentic workflows mainstream', text: 'Multi-step tool-using agents are moving from demos into production systems.' }
        ];
        grid.innerHTML = fallback.map(u => updateCardHtml(u)).join('');
        return;
    }
    grid.innerHTML = aiUpdates.slice(0, 6).map(u => updateCardHtml(u)).join('');
}

function updateCardHtml(u) {
    return `
        <article class="update-card">
            <div class="update-card-date">${escapeHtml(u.date)}</div>
            <h3 class="update-card-title">${escapeHtml(u.title)}</h3>
            <p class="update-card-text">${escapeHtml(u.text)}</p>
        </article>
    `;
}

// ============================================
// GLOSSARY
// ============================================

function openGlossary(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('glossary-modal');
    renderGlossary('');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    const search = document.getElementById('glossary-search');
    search.value = '';
    search.oninput = () => renderGlossary(search.value);
    setTimeout(() => search.focus(), 50);
}

function closeGlossary() {
    document.getElementById('glossary-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function renderGlossary(filter) {
    const list = document.getElementById('glossary-list');
    const terms = (typeof aiGlossary !== 'undefined') ? aiGlossary : [];
    const q = filter.trim().toLowerCase();
    const filtered = q ? terms.filter(t => `${t.term} ${t.definition}`.toLowerCase().includes(q)) : terms;
    if (filtered.length === 0) {
        list.innerHTML = `<div class="search-empty">No terms matching &ldquo;${escapeHtml(q)}&rdquo;</div>`;
        return;
    }
    list.innerHTML = filtered.map(t => `
        <div class="glossary-entry">
            <div class="glossary-term">${t.abbr ? `<abbr>${escapeHtml(t.abbr)}</abbr>` : ''}${escapeHtml(t.term)}</div>
            <div class="glossary-def">${escapeHtml(t.definition)}</div>
        </div>
    `).join('');
}

// ============================================
// FUN FACTS
// ============================================

function populateFunFacts() {
    const list = document.getElementById('fun-facts-list');
    if (!list || typeof funFacts === 'undefined') return;
    const shuffled = [...funFacts].sort(() => 0.5 - Math.random());
    list.innerHTML = shuffled.map(f => `
        <div class="fun-fact-item">
            <h4>${escapeHtml(f.title)}</h4>
            <p>${escapeHtml(f.description)}</p>
        </div>
    `).join('');
}

function toggleFunFacts() {
    document.querySelector('.fun-facts-content').classList.toggle('hidden');
}

// ============================================
// NAV / SCROLL
// ============================================

function setupNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#') && href !== '#glossary-trigger') {
                e.preventDefault();
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const id = href.substring(1);
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                document.querySelector('.nav-links')?.classList.remove('open');
            }
        });
    });
}

function toggleMobileNav() {
    document.querySelector('.nav-links').classList.toggle('open');
}

function setupScrollEffects() {
    let lastScroll = 0;
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        const s = window.pageYOffset;
        if (s > lastScroll && s > 120) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = s;
    }, { passive: true });
}

// ============================================
// UTIL
// ============================================

function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 400);
    }, 2200);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!document.getElementById('study-plan-modal').classList.contains('hidden')) closeStudyPlan();
        else if (!document.getElementById('leaderboard-modal').classList.contains('hidden')) closeLeaderboard();
        else if (!document.getElementById('glossary-modal').classList.contains('hidden')) closeGlossary();
        else closeModal();
    }
    if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
    }
    if (!document.getElementById('topic-modal').classList.contains('hidden') && !quizState.active) {
        if (e.key === 'ArrowLeft') navigateTopic(-1);
        if (e.key === 'ArrowRight') navigateTopic(1);
    }
});

function exportProgress() {
    const data = {
        version: 1,
        exportedAt: new Date().toISOString(),
        progress: localStorage.getItem('aiLearningProgress'),
        bookmarks: localStorage.getItem('aiLearningBookmarks'),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-learning-progress-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Progress exported!');
}

function importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                if (data.version !== 1) throw new Error('Unknown format');
                if (data.progress) localStorage.setItem('aiLearningProgress', data.progress);
                if (data.bookmarks) localStorage.setItem('aiLearningBookmarks', data.bookmarks);
                loadProgress();
                loadBookmarks();
                updateHeroStats();
                updateProgress();
                renderTopics();
                showToast('\u2713 Progress imported!');
            } catch (err) {
                showToast('Import failed: invalid file');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

window.addEventListener('error', (e) => console.error('Application error:', e.error));
