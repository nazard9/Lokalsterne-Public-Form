// Opiny public review flow — v7 · Figma "Form UI" (prototype, demo data).
// Pages: index.html (form) → review.html (review) → review.html#copied (copied → publish dialog).
(function(){
  const b=document.body, r=document.documentElement, KEY=b.dataset.key, Q=new URLSearchParams(location.search);
  const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};

  /* ---------- theme ---------- */
  r.dataset.theme=ls.get(KEY)||b.dataset.default;
  const tg=document.querySelector('.theme-toggle');
  if(tg) tg.addEventListener('click',()=>{const n=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=n;ls.set(KEY,n);});

  /* ---------- business brand colour (?brand=7f56d9) ---------- */
  const brand=(Q.get('brand')||'').replace('#','');
  if(/^[0-9a-f]{6}$/i.test(brand)){const n=parseInt(brand,16),l=(0.299*(n>>16)+0.587*(n>>8&255)+0.114*(n&255))/255;
    r.style.setProperty('--color-primary','#'+brand);r.style.setProperty('--color-on-primary',l>.6?'#111':'#fff');}

  /* ---------- i18n ---------- */
  const T={en:{
    greet:'Hi {n} · your experience with Northwind Studio',greetAnon:'Your experience with Northwind Studio',
    meta:'Getting better together',h1a:'Great work together.',h1b:'Starts with honest feedback.',
    note:'Your answers stay on this device until you post.',badge:'Feedback, with room for your thoughts.',
    rvEyebrow:'Almost done',rvH1a:'Your words.',rvH1b:'Ready to share.',rvIntro:'We drafted a review from your answers. Make it yours, then copy it to the platform you prefer.',rvNote:'Posting takes about 30 seconds.',
    lead:'We’re glad you’re here. Let’s reflect on our work together and explore how we can make it even better.',company:'Northwind Studio',
    welcome:'Welcome.',welcomeName:'Welcome, {n}.',rvH1:'Almost done.',
    expect:'3 quick questions · about 1 min · you approve the text before anything is posted.',
    resumeTitle:'Welcome back!',resumeText:'You answered {a} of 3 questions — continue where you left off.',
    cont:'Continue',startOver:'Start over',
    step:'Question {i} / {t}',
    q1:'What’s your role?',q1help:'Choose one — we’ll move to the next question automatically.',required:'required',
    errChoose:'Please choose an option to continue.',o_founder:'Founder / CEO',o_marketing:'Marketing lead',o_pm:'Project / Delivery manager',o_ops:'Operations / Office manager',o_other:'Other',
    otherLabel:'What’s your role?',otherPh:'e.g. Head of Sales',errOther:'Please type your role, or choose another option.',
    q2:'What did Northwind Studio help you with?',q2help:'Select all that apply, then press Next.',errSelect:'Select at least one option.',
    h_web:'Website redesign',h_brand:'Branding',h_shop:'Online shop',h_seo:'SEO & content',h_support:'Ongoing support',
    q3:'Anything you’d tell another company considering Northwind Studio?',optional:'Optional',q3help:'A sentence or two in your own words makes the review sound like you.',
    notePh:'e.g. They delivered the first concepts in two days and kept us updated every week.',ideas:'Need an idea? Tap to add:',
    i1:'Fast delivery',i2:'Clear communication',i3:'Great design',i4:'On budget',i5:'Would hire again',words:'{w} words',
    back:'Back',kbHint:'to continue',next:'Next',gen:'Generate My Review',mood:'Mood',editLabel:'Edit review',
    smPh:'Paste your reviews here',smCancel:'Cancel',smPost:'Post',smCopy:'Copy',smCopyK:'Ctrl+C',smPaste:'Paste',smPasteK:'Ctrl+V',smDone:'Done!',generating:'Writing your review…',
    foot:'© 2026 All rights reserved.',
    rvTitle:'Your review is ready',rvSub:'Drafted from your answers. Edit anything — it should sound like you.',regen:'Rewrite',
    based:'Based on your answers:',editAnswers:'Change answers',short:'Short',long:'Detailed',sentiment:'Sentiment',positive:'Positive',rvLabel:'Review text',
    edited:'Edited by you',honest:'Please post only if it reflects your real experience — change anything that isn’t accurate.',
    publishOn:'Copy and publish on:',recommended:'Recommended',platHelp:'We copy the text for you and open the site — you just paste, rate and post.',
    backAnswers:'Back to my answers',copiedTitle:'Your review has been copied!',copiedP:'Paste them into the {p} review fields and click "Post" to publish.',
    open:'Open {p} & Publish',s1:'Paste',s2:'Rate',s3:'Post',client:'a client',and:' and '},
  de:{
    greet:'Hallo {n} · Ihre Erfahrung mit Northwind Studio',greetAnon:'Ihre Erfahrung mit Northwind Studio',
    meta:'Gemeinsam besser werden',h1a:'Gute Zusammenarbeit.',h1b:'Beginnt mit ehrlichem Feedback.',
    note:'Ihre Antworten bleiben auf diesem Gerät, bis Sie posten.',badge:'Feedback, mit Raum für Ihre Gedanken.',
    rvEyebrow:'Fast geschafft',rvH1a:'Ihre Worte.',rvH1b:'Bereit zum Teilen.',rvIntro:'Aus Ihren Antworten ist ein Entwurf entstanden. Passen Sie ihn an und kopieren Sie ihn auf die Plattform Ihrer Wahl.',rvNote:'Das Posten dauert etwa 30 Sekunden.',
    lead:'Schön, dass Sie da sind. Lassen Sie uns auf unsere Zusammenarbeit zurückblicken und gemeinsam herausfinden, wie wir sie noch besser machen.',company:'Northwind Studio',
    welcome:'Willkommen.',welcomeName:'Willkommen, {n}.',rvH1:'Fast geschafft.',
    expect:'3 kurze Fragen · ca. 1 Min. · Sie geben den Text frei, bevor etwas veröffentlicht wird.',
    resumeTitle:'Willkommen zurück!',resumeText:'Sie haben {a} von 3 Fragen beantwortet – machen Sie dort weiter.',
    cont:'Weiter',startOver:'Neu beginnen',
    step:'Frage {i} / {t}',
    q1:'Was ist Ihre Rolle?',q1help:'Wählen Sie eine Option – es geht automatisch weiter.',required:'Pflichtfeld',
    errChoose:'Bitte wählen Sie eine Option.',o_founder:'Gründer:in / CEO',o_marketing:'Marketing-Leitung',o_pm:'Projekt- / Delivery-Management',o_ops:'Operations / Office',o_other:'Andere',
    otherLabel:'Was ist Ihre Rolle?',otherPh:'z. B. Vertriebsleitung',errOther:'Bitte geben Sie Ihre Rolle ein oder wählen Sie eine andere Option.',
    q2:'Wobei hat Northwind Studio Ihnen geholfen?',q2help:'Alles Zutreffende auswählen, dann auf Weiter.',errSelect:'Bitte mindestens eine Option wählen.',
    h_web:'Website-Redesign',h_brand:'Branding',h_shop:'Onlineshop',h_seo:'SEO & Content',h_support:'Laufender Support',
    q3:'Was würden Sie anderen Firmen über Northwind Studio sagen?',optional:'Optional',q3help:'Ein, zwei Sätze in Ihren eigenen Worten machen die Bewertung persönlich.',
    notePh:'z. B. Erste Entwürfe kamen nach zwei Tagen, wöchentliche Updates.',ideas:'Eine Idee? Zum Hinzufügen tippen:',
    i1:'Schnelle Lieferung',i2:'Klare Kommunikation',i3:'Tolles Design',i4:'Im Budget',i5:'Gerne wieder',words:'{w} Wörter',
    back:'Zurück',kbHint:'zum Fortfahren',next:'Weiter',mood:'Stimmung',editLabel:'Bewertung bearbeiten',
    smPh:'Fügen Sie Ihre Bewertung hier ein',smCancel:'Abbrechen',smPost:'Posten',smCopy:'Kopieren',smCopyK:'Strg+C',smPaste:'Einfügen',smPasteK:'Strg+V',smDone:'Fertig!',gen:'Bewertung erstellen',generating:'Ihre Bewertung wird geschrieben…',
    foot:'© 2026 Alle Rechte vorbehalten.',
    rvTitle:'Ihre Bewertung ist fertig',rvSub:'Aus Ihren Antworten erstellt. Ändern Sie alles, was nicht nach Ihnen klingt.',regen:'Neu schreiben',
    based:'Basierend auf:',editAnswers:'Antworten ändern',short:'Kurz',long:'Ausführlich',sentiment:'Stimmung',positive:'Positiv',rvLabel:'Bewertungstext',
    edited:'Von Ihnen bearbeitet',honest:'Bitte nur posten, wenn es Ihre echte Erfahrung wiedergibt – ändern Sie Ungenaues.',
    publishOn:'Kopieren und veröffentlichen auf:',recommended:'Empfohlen',platHelp:'Wir kopieren den Text und öffnen die Seite – Sie fügen ein, bewerten und posten.',
    backAnswers:'Zurück zu meinen Antworten',copiedTitle:'Ihre Bewertung wurde kopiert!',copiedP:'Fügen Sie den Text in die {p}-Bewertungsfelder ein und klicken Sie auf „Posten“, um ihn zu veröffentlichen.',
    open:'{p} öffnen & veröffentlichen',s1:'Einfügen',s2:'Bewerten',s3:'Posten',client:'Kunde',and:' und '}};
  let lang=ls.get('opiny-lang')||((navigator.language||'en').toLowerCase().startsWith('de')?'de':'en');
  const t=(k,v={})=>(T[lang][k]||T.en[k]||k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'');
  const listeners=[];
  function applyLang(){ r.lang=lang;
    document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
    document.querySelectorAll('[data-tp]').forEach(e=>e.placeholder=t(e.dataset.tp));
    document.querySelectorAll('[data-ta]').forEach(e=>e.setAttribute('aria-label',t(e.dataset.ta)));
    document.querySelectorAll('.lang button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.lang===lang));
    listeners.forEach(f=>f()); }
  document.querySelectorAll('.lang button').forEach(x=>x.addEventListener('click',()=>{lang=x.dataset.lang;ls.set('opiny-lang',lang);applyLang();}));

  const SKEY='opiny-answers-'+KEY;
  const load=()=>{try{return JSON.parse(ls.get(SKEY))||{}}catch(e){return {}}};
  const save=d=>ls.set(SKEY,JSON.stringify(d));

  /* =================== FORM =================== */
  if(b.dataset.page==='form'){
    const $=id=>document.getElementById(id);
    const flow=$('flow'), steps=[...flow.querySelectorAll('.step')], total=steps.length;
    const lab=$('pgl'), bar=$('pgbar'), fill=$('pgf'), next=$('next'), nextLabel=$('nextLabel'), back=$('back'),
      resumeGo=$('resumeGo'), restartB=$('restart'), resume=$('resume'), note=$('note'), otherWrap=$('other-wrap'), otherIn=$('role-other');
    let i=0, data=load(), busy=false, autoT;
    const name=(Q.get('name')||'').replace(/[<>]/g,'').slice(0,40);

    const toggleOther=()=>{ otherWrap.hidden=!flow.querySelector('input[name=role][value=other]').checked; };
    function restore(){
      if(data.role){const x=flow.querySelector(`input[name=role][value="${data.role}"]`);if(x)x.checked=true;}
      if(data.roleOther) otherIn.value=data.roleOther;
      (data.help||[]).forEach(v=>{const x=flow.querySelector(`input[name=help][value="${v}"]`);if(x)x.checked=true;});
      if(data.note) note.value=data.note;
      toggleOther(); }
    function collect(){
      const role=flow.querySelector('input[name=role]:checked');
      data={role:role?role.value:'',roleOther:otherIn.value.trim(),help:[...flow.querySelectorAll('input[name=help]:checked')].map(x=>x.value),note:note.value.trim(),step:i};
      save(data); }
    const answered=()=>(data.role?1:0)+((data.help||[]).length?1:0)+(data.note?1:0);

    function renderHead(){
      $('head').hidden=i>0; // Figma: intro only on the first question
      $('headTitle').textContent=name?t('welcomeName',{n:name}):t('welcome');
      $('resumeText').textContent=t('resumeText',{a:answered()}); }
    function show(focus){
      steps.forEach((s,k)=>s.hidden=k!==i); renderHead(); back.disabled=i===0;
      const p=Math.round((i+1)/total*100), st=t('step',{i:i+1,t:total});
      lab.textContent=st; fill.style.width=p+'%'; $('percent').textContent=p+' %';
      bar.setAttribute('aria-valuenow',i+1); bar.setAttribute('aria-valuetext',st);
      if(!busy) nextLabel.textContent=i===total-1?t('gen'):t('next');
      steps[i].querySelectorAll('.field-err').forEach(e=>e.hidden=true); steps[i].removeAttribute('aria-invalid');
      if(focus){const f=steps[i].querySelector('input:checked')||steps[i].querySelector('input,textarea'); if(f) f.focus({preventScroll:true});}
      if(focus&&innerWidth<=640) b.scrollIntoView({block:'start'}); }
    listeners.push(()=>show(false));

    resumeGo.addEventListener('click',()=>{ resume.hidden=true; i=Math.min(data.step||0,total-1); show(true); });
    restartB.addEventListener('click',()=>{ls.del(SKEY);data={};flow.reset();toggleOther();resume.hidden=true;i=0;show(true);});

    function err(id,on){ const e=$(id); e.hidden=!on; steps[i].toggleAttribute('aria-invalid',on);
      if(on){e.classList.remove('shake'); void e.offsetWidth; e.classList.add('shake');} }
    function valid(){ const s=steps[i];
      if(s.dataset.name==='role'){ const c=s.querySelector('input[name=role]:checked');
        if(!c){err('e-role',true); s.querySelector('input').focus(); return false;}
        if(c.value==='other'&&!otherIn.value.trim()){err('e-role-other',true); otherIn.setAttribute('aria-invalid','true'); otherIn.focus(); return false;}
        otherIn.removeAttribute('aria-invalid'); return true; }
      if(s.dataset.name==='help'&&!s.querySelector('input:checked')){err('e-help',true); s.querySelector('input').focus(); return false;}
      return true; }
    function go(){ clearTimeout(autoT); if(busy||!valid()) return; collect();
      resume.hidden=true;
      if(i<total-1){ i++; show(true); return; }
      busy=true; next.disabled=true; next.querySelector('img').outerHTML='<svg class="i spin" aria-hidden="true"><use href="#i-refresh"/></svg>'; nextLabel.textContent=t('generating');
      setTimeout(()=>location.href='review.html',900); }
    flow.addEventListener('submit',e=>{e.preventDefault(); go();});
    back.addEventListener('click',()=>{ clearTimeout(autoT); collect(); if(i>0){i--; show(true);} });

    flow.addEventListener('change',e=>{ const x=e.target; if(!x.name) return; collect();
      steps[i].querySelectorAll('.field-err').forEach(z=>z.hidden=true); steps[i].removeAttribute('aria-invalid');
      if(x.name==='role'){ toggleOther();
        if(x.value==='other'){ clearTimeout(autoT); setTimeout(()=>otherIn.focus(),50); return; }
        clearTimeout(autoT); const lbl=x.closest('.opt'); lbl.classList.add('picked');
        autoT=setTimeout(()=>{ lbl.classList.remove('picked'); if(!flow.hidden&&steps[i].dataset.name==='role') go(); },550); } });
    otherIn.addEventListener('input',()=>{ $('e-role-other').hidden=true; otherIn.removeAttribute('aria-invalid'); clearTimeout(otherIn._t); otherIn._t=setTimeout(collect,400); });
    otherIn.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); go(); } });

    // keyboard shortcuts: 1–5 pick an option
    document.addEventListener('keydown',e=>{
      if(flow.hidden||e.target.tagName==='TEXTAREA'||e.target===otherIn||e.metaKey||e.ctrlKey||e.altKey) return;
      const n=parseInt(e.key,10), opts=[...steps[i].querySelectorAll('.opt input')];
      if(n>=1&&n<=opts.length){ e.preventDefault(); const x=opts[n-1]; x.checked=x.type==='checkbox'?!x.checked:true; x.dispatchEvent(new Event('change',{bubbles:true})); x.focus(); } });

    note.addEventListener('input',()=>{ clearTimeout(note._t); note._t=setTimeout(collect,400); });

    restore(); resume.hidden=!answered(); applyLang();
    if(location.hash==='#q'&&answered()){ resume.hidden=true; i=total-1; show(true); } else show(false);
  }

  /* =================== REVIEW =================== */
  if(b.dataset.page==='review'){
    const $=id=>document.getElementById(id);
    const ta=$('review'), editBtn=$('editBtn');
    const D=load(), len='short'; let k=0, userEdited=false;
    const TX={en:{short:["We worked with Northwind Studio on {help} and it was a great experience. First concepts arrived within two days, communication was clear, and everything was delivered on time.",
        "Northwind Studio helped us with {help} — quick, professional and easy to work with. Clear updates every week and a result we're proud of. Would hire again."],
      long:["As {role}, I worked with Northwind Studio on {help}. We saw the first concepts within two days, and the team fit into our workflow from the start. Weekly updates kept everyone aligned, feedback was handled quickly, and the project was delivered on time and on budget. {note}We would happily work with them again.",
        "Northwind Studio helped us with {help}. From the first call they understood our goals and turned them into a clear plan. Communication was open and fast, and the final result exceeded our expectations. {note}A reliable partner I can recommend to other teams."]},
     de:{short:["Wir haben mit Northwind Studio an {help} gearbeitet – eine sehr gute Erfahrung. Erste Entwürfe kamen nach zwei Tagen, die Kommunikation war klar und alles wurde pünktlich geliefert.",
        "Northwind Studio hat uns bei {help} unterstützt – schnell, professionell und unkompliziert. Wöchentliche Updates und ein Ergebnis, auf das wir stolz sind. Gerne wieder."],
      long:["Als {role} habe ich mit Northwind Studio an {help} gearbeitet. Erste Entwürfe kamen nach zwei Tagen, und das Team hat sich von Anfang an gut in unsere Abläufe eingefügt. Wöchentliche Updates hielten alle auf dem gleichen Stand, Feedback wurde schnell umgesetzt, und das Projekt wurde pünktlich und im Budget geliefert. {note}Wir würden jederzeit wieder mit ihnen arbeiten.",
        "Northwind Studio hat uns bei {help} unterstützt. Vom ersten Gespräch an haben sie unsere Ziele verstanden und in einen klaren Plan übersetzt. Die Kommunikation war offen und schnell, das Ergebnis hat unsere Erwartungen übertroffen. {note}Ein verlässlicher Partner, den ich weiterempfehlen kann."]}};
    const roleTxt=()=>D.role==='other'?(D.roleOther||''):(D.role?t('o_'+D.role):'');
    const helpItems=()=>(D.help&&D.help.length?D.help:['web']).map(h=>t('h_'+h));
    function compose(){
      const hl=helpItems().map(x=>lang==='de'?x:x.toLowerCase());
      const help=hl.length>1?hl.slice(0,-1).join(', ')+t('and')+hl[hl.length-1]:hl[0];
      const role=roleTxt()||t('client');
      let s=TX[lang][len][k%2].replace('{role}',role).replace(/\{help\}/g,help)
        .replace('{note}',D.note?D.note.replace(/([^.!?])$/,'$1.')+' ':'');
      return s.charAt(0).toUpperCase()+s.slice(1); }
    function render(){ if(!userEdited) ta.value=compose(); }
    // Figma: text is read-only (filled surface) until the edit button is pressed
    const setEdit=on=>{ ta.readOnly=!on; editBtn.setAttribute('aria-pressed',on); if(on){ ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); } };
    editBtn.addEventListener('click',()=>setEdit(ta.readOnly));
    listeners.push(()=>{ userEdited=false; render(); });
    ta.addEventListener('input',()=>{ userEdited=true; });
    const regen=$('regen');
    regen.addEventListener('click',()=>{ const ic=regen.querySelector('img'); ic.classList.add('spin');
      setTimeout(()=>{ k++; userEdited=false; setEdit(false); render(); ic.classList.remove('spin'); },600); });
    /* ---- copied dialog: replay of posting on the platform (Figma "light EN" prototype) ----
       [variant, delay before leaving (ms), Smart-animate duration to the next variant (ms)] — values from the Figma reactions */
    const frame=document.querySelector('.sm-frame'), mocks=[...frame.querySelectorAll('.site-mock')];
    const MOCK_FOR={TrustPilot:'trustpilot'};   // others use the Google mock
    let mock=mocks[0];
    const STEPS=[['1',1,833],['2',50,625],['4',100,833],['5',100,833],['11',50,417],['10a',100,833],['10b',100,833],['6',1,312],['7',1,312],['8',100,208],['9',300,833]];
    const reduce=matchMedia('(prefers-reduced-motion: reduce)');
    let stepT, stepI=0, lastD=0;
    const fit=()=>{ const sc=Math.min(1,frame.clientWidth/480); frame.style.setProperty('--s',sc); frame.style.height=mock.offsetHeight*sc+'px'; };
    const setStep=(i,d)=>{ stepI=i; lastD=d; mock.style.setProperty('--d',d+'ms'); mock.dataset.step=STEPS[i][0]; };
    function play(p){
      clearTimeout(stepT);
      const want=MOCK_FOR[p]||'google'; mocks.forEach(m=>{ m.hidden=m.dataset.mock!==want; if(!m.hidden) mock=m; });
      frame.querySelectorAll('.sm-text').forEach(x=>x.textContent=ta.value); fit();
      if(reduce.matches){ setStep(7,0); return; }            // static frame: stars set, text pasted
      setStep(0,0);
      const tick=()=>{ const [,delay,dur]=STEPS[stepI]; stepT=setTimeout(()=>{ setStep((stepI+1)%STEPS.length,dur); tick(); },lastD+delay); };
      tick(); }
    const stop=()=>clearTimeout(stepT);
    addEventListener('resize',fit);
    const bg=$('copied');
    const open=p=>{ p=p||'Google'; $('cp-p').textContent=t('copiedP',{p}); $('openPlat').textContent=t('open',{p}); bg.classList.add('open'); play(p); bg.querySelector('.x').focus(); };
    const close=()=>{ bg.classList.remove('open'); stop(); };
    document.querySelectorAll('.plat').forEach(x=>x.addEventListener('click',()=>{ try{navigator.clipboard.writeText(ta.value).catch(()=>{})}catch(e){} open(x.dataset.plat); }));
    bg.addEventListener('click',e=>{ if(e.target===bg||e.target.closest('.x')) close(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    applyLang();
    if(location.hash==='#copied') open('Google');
    addEventListener('hashchange',()=>location.hash==='#copied'?open('Google'):close());
  }
})();
