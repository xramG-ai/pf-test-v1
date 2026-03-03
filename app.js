(() => {
  const HELP_KEY = 'pf.help.clicked.v1';
  const OPENING_KEY = 'pf.opening.done.v1';
  const panelRoot = document.getElementById('panel-root');
  const panelTemplate = document.getElementById('panel-template');
  const helpTrigger = document.getElementById('help-trigger');
  const galleryEl = document.getElementById('gallery');
  const openingEl = document.getElementById('opening');
  const typingLineEl = document.getElementById('typing-line');
  const openingChoiceEl = document.getElementById('opening-choice');

  const panelStack = [];
  let zSeed = 100;

  function sampleWithoutReplacement(items, count) {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(count, arr.length));
  }

  function clampPanel(panel) {
    const rect = panel.getBoundingClientRect();
    const maxX = Math.max(1, window.innerWidth - rect.width - 1);
    const maxY = Math.max(1, window.innerHeight - rect.height - 1);
    const x = Math.min(Math.max(1, rect.left), maxX);
    const y = Math.min(Math.max(1, rect.top), maxY);
    panel.style.left = `${x}px`;
    panel.style.top = `${y}px`;
  }

  function setActivePanel(panel) {
    panelStack.forEach((p) => p.classList.remove('is-active'));
    panel.classList.add('is-active');
    panel.style.zIndex = String(++zSeed);
  }

  function closeTopPanel() {
    if (panelStack.length === 0) return;
    const top = panelStack.pop();
    top.remove();
    if (panelStack.length) setActivePanel(panelStack[panelStack.length - 1]);
  }

  function createPanel(id, title, bodyLines) {
    const existing = panelRoot.querySelector(`.panel[data-panel-id='${id}']`);
    if (existing) {
      setActivePanel(existing);
      return existing;
    }

    const panel = panelTemplate.content.firstElementChild.cloneNode(true);
    panel.dataset.panelId = id;
    panel.querySelector('.panel-title').textContent = title;
    panel.querySelector('.panel-body').textContent = bodyLines.join('\n');
    panel.style.left = `${Math.max(1, (window.innerWidth - 420) / 2)}px`;
    panel.style.top = `${Math.max(1, 100 + panelStack.length * 24)}px`;

    const head = panel.querySelector('.panel-head');
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    head.addEventListener('pointerdown', (e) => {
      dragging = true;
      setActivePanel(panel);
      const rect = panel.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      head.setPointerCapture(e.pointerId);
      head.style.cursor = 'grabbing';
    });

    head.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      panel.style.left = `${Math.max(1, e.clientX - offsetX)}px`;
      panel.style.top = `${Math.max(1, e.clientY - offsetY)}px`;
      clampPanel(panel);
    });

    const stopDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      head.releasePointerCapture(e.pointerId);
      head.style.cursor = 'grab';
      clampPanel(panel);
    };

    head.addEventListener('pointerup', stopDrag);
    head.addEventListener('pointercancel', stopDrag);
    panel.addEventListener('pointerdown', () => setActivePanel(panel));

    panelRoot.appendChild(panel);
    panelStack.push(panel);
    setActivePanel(panel);
    clampPanel(panel);
    return panel;
  }

  async function loadGallery() {
    try {
      const response = await fetch('public/data/gallery.json');
      const data = await response.json();
      const picked = sampleWithoutReplacement(data, 9);
      galleryEl.innerHTML = '';
      picked.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'gallery-item';
        card.innerHTML = `
          <img src="assets/gallery/${item.filename}" alt="${item.title || item.id}" />
          <div class="meta">
            <div>${item.title || item.id}</div>
            <div>${item.createdAt} · ${item.tags.join(', ')}</div>
          </div>`;
        galleryEl.appendChild(card);
      });
      if (picked.length === 0) galleryEl.textContent = '표시할 데이터가 없습니다.';
    } catch (error) {
      galleryEl.textContent = '갤러리 데이터를 불러오지 못했습니다.';
      console.error(error);
    }
  }

  function initHelpState() {
    const clicked = localStorage.getItem(HELP_KEY) === '1';
    helpTrigger.classList.toggle('sparkle', !clicked);
  }

  function openHelp() {
    createPanel('help', 'HELP', window.PF_CONTENT.help);
    localStorage.setItem(HELP_KEY, '1');
    helpTrigger.classList.remove('sparkle');
  }

  function initOpening() {
    const options = ['PLAY', 'SKIP'];
    let activeIndex = 0;
    let isRunning = false;

    function drawChoices() {
      openingChoiceEl.innerHTML = '';
      options.forEach((label, index) => {
        const item = document.createElement('div');
        item.className = `choice-item${index === activeIndex ? ' is-active' : ''}`;
        item.textContent = `${index === activeIndex ? '▶' : ' '} ${label}`;
        openingChoiceEl.appendChild(item);
      });
    }

    function finishOpening() {
      openingEl.classList.add('is-hidden');
      localStorage.setItem(OPENING_KEY, '1');
      window.removeEventListener('keydown', handleOpeningKey, true);
    }

    async function playTyping(speed = 30) {
      typingLineEl.textContent = '';
      for (const line of window.PF_CONTENT.openingLines) {
        for (const ch of line) {
          typingLineEl.textContent += ch;
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
        typingLineEl.textContent += '\n';
      }
    }

    async function confirm() {
      if (isRunning) return;
      isRunning = true;
      if (options[activeIndex] === 'SKIP') {
        typingLineEl.textContent = '...SKIPPED';
        await new Promise((resolve) => setTimeout(resolve, 100));
        finishOpening();
        return;
      }
      await playTyping(30);
      await new Promise((resolve) => setTimeout(resolve, 140));
      finishOpening();
    }

    function handleOpeningKey(e) {
      if (openingEl.classList.contains('is-hidden')) return;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + options.length) % options.length;
        drawChoices();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % options.length;
        drawChoices();
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        confirm();
      }
    }

    if (localStorage.getItem(OPENING_KEY) === '1') {
      openingEl.classList.add('is-hidden');
      return;
    }

    typingLineEl.textContent = 'Arrow keys + Enter';
    drawChoices();
    window.addEventListener('keydown', handleOpeningKey, true);
  }

  document.querySelectorAll('[data-open-panel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panelId = btn.dataset.openPanel;
      if (panelId === 'about') createPanel('about', 'ABOUT', window.PF_CONTENT.about);
      if (panelId === 'contact') createPanel('contact', 'CONTACT', window.PF_CONTENT.contactPlaceholder);
    });
  });

  helpTrigger.addEventListener('click', openHelp);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTopPanel();
  });

  window.addEventListener('resize', () => panelStack.forEach(clampPanel));

  initHelpState();
  initOpening();
  loadGallery();
})();
