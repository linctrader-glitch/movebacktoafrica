(function () {
  var STAN = 'https://stan.store/buildwithada/p/how-to-move-back-to-africa';

  // EMAIL GATE: where quiz-taker emails are sent.
  // Paste your form endpoint here (MailerLite, Kit, Formspree, etc.).
  // While it is empty, the gate still shows but nothing is sent anywhere.
  var EMAIL_ENDPOINT = '';
  // Field names your email tool expects. MailerLite uses 'fields[email]' and 'fields[name]'.
  var FIELD_EMAIL = 'email';
  var FIELD_NAME = 'name';
  var QUESTIONS = [
    { area: 'Mindset', text: "I don't see moving back as going backwards or as failure." },
    { area: 'Your why', text: 'I can say in one sentence why I\'m moving back, beyond "I\'m tired of it here".' },
    { area: 'Income', text: 'I have income that will keep coming after I move.' },
    { area: 'Money and safety net', text: 'I have 12 months of living costs saved, separate from any building or business money.' },
    { area: 'Land, property and trust', text: 'Every property I own at home is in my name, and I\'ve checked the title at the land registry myself.' },
    { area: 'Family and expectations', text: 'My family and I have agreed what I can and can\'t support financially.' },
    { area: 'Health', text: 'I know which hospital I\'d use, and I have health insurance that works there.' },
    { area: 'Children and schooling', text: 'My children\'s schooling is planned, or no children are moving with me.' },
    { area: 'Housing and daily life', text: 'I\'ve budgeted for backup power, water and transport at today\'s prices.' },
    { area: 'Papers, banking and ID', text: 'My passport and local ID are valid, and I know what happens to my status abroad.' },
    { area: 'The trial run', text: 'I\'ve lived at home for 3 months or more in the last 2 years, not on holiday.' }
  ];
  var OPTIONS = [['2', 'Yes'], ['1', 'Partly'], ['0', 'Not yet']];

  var holder = document.getElementById('questions');
  QUESTIONS.forEach(function (q, i) {
    var fs = document.createElement('fieldset');
    fs.className = 'q';
    var html = '<legend>' + (i + 1) + '. ' + q.text + '</legend><p class="area">' + q.area + '</p><div class="opts">';
    OPTIONS.forEach(function (o) {
      html += '<label><input type="radio" name="q' + i + '" value="' + o[0] + '"><span>' + o[1] + '</span></label>';
    });
    fs.innerHTML = html + '</div>';
    holder.appendChild(fs);
  });

  var form = document.getElementById('quiz');
  var fill = document.getElementById('fill');
  var count = document.getElementById('count');
  var missing = document.getElementById('missing');
  var result = document.getElementById('result');

  function answers() {
    return QUESTIONS.map(function (_, i) {
      var c = form.querySelector('input[name="q' + i + '"]:checked');
      return c ? parseInt(c.value, 10) : null;
    });
  }

  form.addEventListener('change', function () {
    var n = answers().filter(function (a) { return a !== null; }).length;
    fill.style.width = (n / QUESTIONS.length * 100) + '%';
    count.textContent = n + ' of ' + QUESTIONS.length + ' answered';
    if (n === QUESTIONS.length) missing.classList.add('hidden');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var a = answers();
    var open = [];
    a.forEach(function (v, i) { if (v === null) open.push(i + 1); });
    if (open.length) {
      missing.textContent = 'Answer question' + (open.length > 1 ? 's ' : ' ') + open.join(', ') + ' to see your score.';
      missing.classList.remove('hidden');
      return;
    }
    var total = a.reduce(function (s, v) { return s + v; }, 0);
    var pct = Math.round(total / (QUESTIONS.length * 2) * 100);
    var weak = [];
    a.forEach(function (v, i) { if (v === 0) weak.push(QUESTIONS[i].area); });
    a.forEach(function (v, i) { if (v === 1 && weak.length < 3) weak.push(QUESTIONS[i].area); });
    weak = weak.slice(0, 3);

    var verdict, advice;
    if (pct >= 80) {
      verdict = 'Ready to plan.';
      advice = 'You have the foundations. Now set a date and write your 90-day landing plan.';
    } else if (pct >= 50) {
      verdict = 'Close.';
      advice = 'Fix your weakest areas before you set a date. That is where moves go wrong.';
    } else {
      verdict = "Not yet, and that's fine.";
      advice = 'Start with your mindset, your income and your safety net. Everything else depends on them.';
    }

    showGate(pct, weak, function () {
    var html = '<p class="score">' + pct + '%</p><h2>' + verdict + '</h2><p>' + advice + '</p>';
    if (weak.length) {
      html += '<p><strong>Fix these first:</strong></p><ul>' + weak.map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul>';
    }
    html += '<p>This quiz covers one question per area. The <strong>How to Move Back to Africa</strong> workbook goes through all 55, then gives you nine worksheets to turn your weak spots into a plan.</p>' +
      '<div class="actions"><a class="btn gold" href="' + STAN + '">Get the workbook, $37</a>' +
      '<a class="btn secondary" style="color:#fff;border-color:#fff" href="guides/moving-back-to-africa-checklist.html">Read the free checklist</a></div>';
    result.innerHTML = html;
    result.classList.remove('hidden');
    result.focus();
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  var GATE_KEY = 'mbta_quiz_email';

  function alreadyGiven() {
    try { return !!window.localStorage.getItem(GATE_KEY); } catch (e) { return false; }
  }
  function remember(email) {
    try { window.localStorage.setItem(GATE_KEY, email); } catch (e) {}
  }

  function showGate(pct, weak, reveal) {
    if (alreadyGiven()) { reveal(); return; }
    result.innerHTML =
      '<h2>Your readiness score is ready.</h2>' +
      '<p>Enter your email to see your score and the three areas to fix first. We\'ll also send you a short planning guide for each one.</p>' +
      '<form class="gate" id="gate" novalidate>' +
        '<label for="gate-name">First name</label>' +
        '<input id="gate-name" name="name" type="text" autocomplete="given-name">' +
        '<label for="gate-email">Email</label>' +
        '<input id="gate-email" name="email" type="email" autocomplete="email" required>' +
        '<p class="gate-error hidden" id="gate-error" role="alert"></p>' +
        '<button class="btn gold" type="submit">Show my score</button>' +
        '<p class="small">No spam. Unsubscribe any time.</p>' +
      '</form>';
    result.classList.remove('hidden');
    result.focus();
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });

    var gate = document.getElementById('gate');
    var err = document.getElementById('gate-error');
    gate.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = gate.querySelector('#gate-email').value.trim();
      var name = gate.querySelector('#gate-name').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.textContent = 'Please enter a valid email address.';
        err.classList.remove('hidden');
        return;
      }
      err.classList.add('hidden');
      var btn = gate.querySelector('button');
      btn.disabled = true;
      btn.textContent = 'One moment…';
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        remember(email);
        reveal();
      }
      if (!EMAIL_ENDPOINT) { finish(); return; }
      var fd = new FormData();
      fd.append(FIELD_EMAIL, email);
      if (name) fd.append(FIELD_NAME, name);
      fd.append('score', pct);
      fd.append('fix_first', weak.join(', '));
      fetch(EMAIL_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(finish, finish);
      // Never leave someone stuck if the email service is slow.
      setTimeout(finish, 4000);
    });
  }
})();
