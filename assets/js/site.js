(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Accessible screenshot lightbox.
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const full = lightbox.querySelector('img');
    const close = lightbox.querySelector('.lightbox-close');
    let opener = null;
    document.querySelectorAll('[data-lightbox]').forEach(btn => btn.addEventListener('click', () => {
      opener = btn; full.src = btn.dataset.full || btn.querySelector('img').src;
      full.alt = btn.querySelector('img').alt; lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; close.focus();
    }));
    const shut = () => { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (opener) opener.focus(); };
    close.addEventListener('click', shut);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) shut(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('is-open')) shut(); });
  }

  // Interactive catalogue demo: all records are illustrative, not live inventory.
  const search = document.querySelector('[data-product-search]');
  const chips = [...document.querySelectorAll('[data-filter]')];
  const products = [...document.querySelectorAll('[data-product]')];
  if (search || chips.length) {
    let category = 'all';
    const update = () => {
      const q = (search?.value || '').trim().toLowerCase();
      products.forEach(card => {
        const matchesCategory = category === 'all' || card.dataset.category === category;
        const matchesText = card.textContent.toLowerCase().includes(q);
        card.hidden = !(matchesCategory && matchesText);
      });
      const empty = document.querySelector('[data-empty-products]');
      if (empty) empty.hidden = products.some(p => !p.hidden);
    };
    search?.addEventListener('input', update);
    chips.forEach(chip => chip.addEventListener('click', () => {
      category = chip.dataset.filter;
      chips.forEach(c => c.classList.toggle('active', c === chip)); update();
    }));
  }

  // Sample order journey controls.
  const stageButtons = [...document.querySelectorAll('[data-stage]')];
  const timelineItems = [...document.querySelectorAll('[data-timeline]')];
  const stageLabel = document.querySelector('[data-stage-label]');
  stageButtons.forEach(button => button.addEventListener('click', () => {
    const stage = Number(button.dataset.stage);
    stageButtons.forEach(b => b.classList.toggle('active', b === button));
    timelineItems.forEach(item => item.classList.toggle('done', Number(item.dataset.timeline) <= stage));
    if (stageLabel) stageLabel.textContent = button.dataset.label;
  }));

  // Account deletion form: prepare a request; never claim it was submitted or deleted.
  const deletionForm = document.querySelector('[data-deletion-form]');
  if (deletionForm) {
    const progress = document.querySelector('[data-progress]');
    const status = document.querySelector('[data-form-status]');
    const preview = document.querySelector('[data-request-preview]');
    const previewText = document.querySelector('[data-preview-text]');
    const mailLink = document.querySelector('[data-mail-link]');
    const copyBtn = document.querySelector('[data-copy-request]');
    let requestBody = '';
    deletionForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!deletionForm.reportValidity()) return;
      const data = new FormData(deletionForm);
      const name = String(data.get('fullName') || '').trim();
      const contact = String(data.get('accountContact') || '').trim();
      const reason = String(data.get('reason') || 'Not specified');
      const notes = String(data.get('notes') || '').trim();
      requestBody = `Hello Gravo Support,\n\nI would like to request deletion of my Gravo account and associated personal data.\n\nFull name: ${name}\nRegistered email or phone: ${contact}\nReason: ${reason}\nAdditional details: ${notes || 'None'}\n\nPlease confirm receipt of this request and let me know if any further verification is required.\n\nThank you.`;
      const query = new URLSearchParams({ subject: 'Gravo Account & Data Deletion Request', body: requestBody });
      mailLink.href = `mailto:gravo.shopping@gmail.com?${query.toString()}`;
      previewText.textContent = requestBody;
      preview.classList.remove('show'); status.classList.remove('show','error');
      progress.classList.add('show');
      const submit = deletionForm.querySelector('button[type="submit"]');
      submit.disabled = true; submit.dataset.original = submit.textContent; submit.textContent = 'Preparing request…';
      window.setTimeout(() => {
        progress.classList.remove('show'); status.classList.add('show');
        status.innerHTML = '<strong>Your request draft is ready.</strong><br>This website has not sent the request and has not deleted any account data. Review the draft below, then open your email app and send it to Gravo Support.';
        preview.classList.add('show'); submit.disabled = false; submit.textContent = submit.dataset.original || 'Prepare deletion request';
        preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 850);
    });
    copyBtn?.addEventListener('click', async () => {
      if (!requestBody) return;
      try {
        await navigator.clipboard.writeText(requestBody);
        copyBtn.textContent = 'Copied';
        window.setTimeout(() => copyBtn.textContent = 'Copy request text', 1600);
      } catch (_) {
        status.textContent = 'Clipboard access was unavailable. Select and copy the request text below.';
      }
    });
  }

  // Contact form uses the visitor's email app; the site does not store messages.
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const status = document.querySelector('[data-contact-status]');
    const progress = document.querySelector('[data-contact-progress]');
    const mail = document.querySelector('[data-contact-mail]');
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!contactForm.reportValidity()) return;
      const data = new FormData(contactForm);
      const subject = `Gravo website enquiry — ${String(data.get('topic') || 'General')}`;
      const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nTopic: ${data.get('topic')}\n\n${data.get('message')}`;
      mail.href = `mailto:khanfareed01131@gmail.com?${new URLSearchParams({subject,body}).toString()}`;
      progress.classList.add('show');
      const btn = contactForm.querySelector('button[type="submit"]'); btn.disabled = true;
      window.setTimeout(() => {
        progress.classList.remove('show'); status.classList.add('show');
        status.innerHTML = 'Your email draft is ready. This site does not store or send your message. Choose <strong>Open email app</strong> below to send it to Gravo Support.';
        mail.hidden = false; btn.disabled = false;
      }, 650);
    });
  }
})();
