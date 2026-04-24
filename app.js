// ============================================
// AI LEARNING HUB - APPLICATION LOGIC
// ============================================

let currentPath = null;
let completedTopics = new Set();
let bookmarkedResources = new Set();
let currentFilter = 'all';
let currentModalTopic = null;

const STORAGE_KEY = 'aiLearningProgress';
const BOOKMARKS_KEY = 'aiLearningBookmarks';

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    loadBookmarks();
    updateHeroStats();
    renderFeatured();
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
    return html;
}

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
        if (!document.getElementById('glossary-modal').classList.contains('hidden')) closeGlossary();
        else closeModal();
    }
    if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
    }
    if (!document.getElementById('topic-modal').classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') navigateTopic(-1);
        if (e.key === 'ArrowRight') navigateTopic(1);
    }
});

window.addEventListener('error', (e) => console.error('Application error:', e.error));
