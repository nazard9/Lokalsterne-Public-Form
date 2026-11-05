// Opiny public review flow — v6 · Untitled UI (prototype, demo data).
// Pages: index.html (form) → review.html (review) → review.html#copied (copied → publish dialog).
(function(){
  const b=document.body, r=document.documentElement, KEY=b.dataset.key, Q=new URLSearchParams(location.search);
  const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};

  /* ---------- theme ---------- */
  r.dataset.theme=ls.get(KEY)||b.dataset.default;
  const fab=document.querySelector('.theme-fab');
  if(fab) fab.addEventListener('click',()=>{const n=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=n;ls.set(KEY,n);});

  /* ---------- business brand colour (?brand=7f56d9) ---------- */
  const brand=(Q.get('brand')||'').replace('#','');
  if(/^[0-9a-f]{6}$/i.test(brand)){const n=parseInt(brand,16),l=(0.299*(n>>16)+0.587*(n>>8&255)+0.114*(n&255))/255;
    r.style.setProperty('--color-primary','#'+brand);r.style.setProperty('--color-on-primary',l>.6?'#111':'#fff');}

  /* ---------- i18n ---------- */
  const T={en:{
    welcome:'Welcome',hello:'Hi {n}, welcome!',introTitle:'How was working with Northwind Studio?',
    introLead:'Thank you for choosing us! Answer 3 quick questions and Opiny will turn them into a review draft for you. You can edit it before anything is posted.',
    resumeTitle:'Welcome back!',resumeText:'You answered {a} of 3 questions — continue where you left off.',
    fact1:'About 1 minute',fact2:'3 questions',fact3:'You approve the final text',start:'Start',cont:'Continue',startOver:'Start over',
    introNote:'Nothing is published until you choose to post it.',saved:'Progress saved',step:'Question {i} of {t}',
    q1:'What’s your role?',q1help:'Choose one — we’ll move to the next question automatically.',required:'required',
    errChoose:'Please choose an option to continue.',o_founder:'Founder / CEO',o_marketing:'Marketing lead',o_pm:'Project / Delivery manager',o_ops:'Operations / Office manager',o_other:'Other',
    otherLabel:'What’s your role?',otherPh:'e.g. Head of Sales',errOther:'Please type your role, or choose another option.',
    q2:'What did Northwind Studio help you with?',q2help:'Select all that apply, then press Next.',errSelect:'Select at least one option.',
    h_web:'Website redesign',h_brand:'Branding',h_shop:'Online shop',h_seo:'SEO & content',h_support:'Ongoing support',
    q3:'Anything you’d tell another company considering Northwind Studio?',optional:'Optional',q3help:'A sentence or two in your own words makes the review sound like you.',
    notePh:'e.g. They delivered the first concepts in two days and kept us updated every week.',ideas:'Need an idea? Tap to add:',
    i1:'Fast delivery',i2:'Clear communication',i3:'Great design',i4:'On budget',i5:'Would hire again',words:'{w} words',
    back:'Back',kbHint:'to continue',next:'Next',gen:'Generate my review',generating:'Writing your review…',
    foot:'Powered by Opiny · Your answers are used to draft a review you can edit before posting.',foot2:'Powered by Opiny',
    rvTitle:'Your review is ready',rvSub:'Drafted from your answers. Edit anything — it should sound like you.',regen:'Rewrite',
    based:'Based on your answers:',editAnswers:'Change answers',short:'Short',long:'Detailed',sentiment:'Sentiment',positive:'Positive',rvLabel:'Review text',
    edited:'Edited by you',honest:'Please post only if it reflects your real experience — change anything that isn’t accurate.',
    publishOn:'Copy and publish on:',recommended:'Recommended',platHelp:'We copy the text for you and open the site — you just paste, rate and post.',
    backAnswers:'Back to my answers',copiedTitle:'Your review has been copied!',copiedP:'Paste it into the {p} review field, choose your stars and press “Post”.',
    open:'Open {p} & publish',s1:'Paste',s2:'Rate',s3:'Post',client:'a client',and:' and '},
  de:{
    welcome:'Willkommen',hello:'Hallo {n}, willkommen!',introTitle:'Wie war die Zusammenarbeit mit Northwind Studio?',
    introLead:'Danke, dass Sie mit uns gearbeitet haben! Beantworten Sie 3 kurze Fragen – Opiny erstellt daraus einen Bewertungsentwurf. Sie können ihn vor der Veröffentlichung bearbeiten.',
    resumeTitle:'Willkommen zurück!',resumeText:'Sie haben {a} von 3 Fragen beantwortet – machen Sie dort weiter.',
    fact1:'Ca. 1 Minute',fact2:'3 Fragen',fact3:'Sie geben den Text frei',start:'Starten',cont:'Weiter',startOver:'Neu beginnen',
    introNote:'Nichts wird veröffentlicht, bevor Sie es selbst posten.',saved:'Fortschritt gespeichert',step:'Frage {i} von {t}',
    q1:'Was ist Ihre Rolle?',q1help:'Wählen Sie eine Option – es geht automatisch weiter.',required:'Pflichtfeld',
    errChoose:'Bitte wählen Sie eine Option.',o_founder:'Gründer:in / CEO',o_marketing:'Marketing-Leitung',o_pm:'Projekt- / Delivery-Management',o_ops:'Operations / Office',o_other:'Andere',
    otherLabel:'Was ist Ihre Rolle?',otherPh:'z. B. Vertriebsleitung',errOther:'Bitte geben Sie Ihre Rolle ein oder wählen Sie eine andere Option.',
    q2:'Wobei hat Northwind Studio Ihnen geholfen?',q2help:'Alles Zutreffende auswählen, dann auf Weiter.',errSelect:'Bitte mindestens eine Option wählen.',
    h_web:'Website-Redesign',h_brand:'Branding',h_shop:'Onlineshop',h_seo:'SEO & Content',h_support:'Laufender Support',
    q3:'Was würden Sie anderen Firmen über Northwind Studio sagen?',optional:'Optional',q3help:'Ein, zwei Sätze in Ihren eigenen Worten machen die Bewertung persönlich.',
    notePh:'z. B. Erste Entwürfe kamen nach zwei Tagen, wöchentliche Updates.',ideas:'Eine Idee? Zum Hinzufügen tippen:',
    i1:'Schnelle Lieferung',i2:'Klare Kommunikation',i3:'Tolles Design',i4:'Im Budget',i5:'Gerne wieder',words:'{w} Wörter',
    back:'Zurück',kbHint:'zum Fortfahren',next:'Weiter',gen:'Bewertung erstellen',generating:'Ihre Bewertung wird geschrieben…',
    foot:'Powered by Opiny · Aus Ihren Antworten entsteht ein Entwurf, den Sie vor dem Posten bearbeiten können.',foot2:'Powered by Opiny',
    rvTitle:'Ihre Bewertung ist fertig',rvSub:'Aus Ihren Antworten erstellt. Ändern Sie alles, was nicht nach Ihnen klingt.',regen:'Neu schreiben',
    based:'Basierend auf:',editAnswers:'Antworten ändern',short:'Kurz',long:'Ausführlich',sentiment:'Stimmung',positive:'Positiv',rvLabel:'Bewertungstext',
    edited:'Von Ihnen bearbeitet',honest:'Bitte nur posten, wenn es Ihre echte Erfahrung wiedergibt – ändern Sie Ungenaues.',
    publishOn:'Kopieren und veröffentlichen auf:',recommended:'Empfohlen',platHelp:'Wir kopieren den Text und öffnen die Seite – Sie fügen ein, bewerten und posten.',
    backAnswers:'Zurück zu meinen Antworten',copiedTitle:'Ihre Bewertung wurde kopiert!',copiedP:'Fügen Sie sie im {p}-Bewertungsfeld ein, wählen Sie die Sterne und klicken Sie auf „Posten“.',
    open:'{p} öffnen & veröffentlichen',s1:'Einfügen',s2:'Bewerten',s3:'Posten',client:'Kunde',and:' und '}};
  let lang=ls.get('opiny-lang')||((navigator.language||'en').toLowerCase().startsWith('de')?'de':'en');
  const t=(k,v={})=>(T[lang][k]||T.en[k]||k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'');
  const listeners=[];
  function applyLang(){ r.lang=lang;
    document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
    document.querySelectorAll('[data-tp]').forEach(e=>e.placeholder=t(e.dataset.tp));
    document.querySelectorAll('.lang button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.lang===lang));
    listeners.forEach(f=>f()); }
  document.querySelectorAll('.lang button').forEach(x=>x.addEventListener('click',()=>{lang=x.dataset.lang;ls.set('opiny-lang',lang);applyLang();}));

  const SKEY='opiny-answers-'+KEY;
  const load=()=>{try{return JSON.parse(ls.get(SKEY))||{}}catch(e){return {}}};
  const save=d=>ls.set(SKEY,JSON.stringify(d));

  /* =================== FORM =================== */
  if(b.dataset.page==='form'){
    const $=id=>document.getElementById(id);
    const intro=$('intro'), flow=$('flow'), steps=[...flow.querySelectorAll('.step')], total=steps.length;
    const lab=$('pgl'), bar=$('pgbar'), fill=$('pgf'), next=$('next'), back=$('back'), savedEl=$('saved'),
      startB=$('start'), restartB=$('restart'), resume=$('resume'), note=$('note'), count=$('count'), otherWrap=$('other-wrap'), otherIn=$('role-other');
    let i=0, data=load(), busy=false, autoT;
    const name=(Q.get('name')||'').replace(/[<>]/g,'').slice(0,40);

    const toggleOther=()=>{ otherWrap.hidden=!flow.querySelector('input[name=role][value=other]').checked; };
    const words=()=>{ const w=note.value.trim()?note.value.trim().split(/\s+/).length:0; count.textContent=t('words',{w}); };
    function restore(){
      if(data.role){const x=flow.querySelector(`input[name=role][value="${data.role}"]`);if(x)x.checked=true;}
      if(data.roleOther) otherIn.value=data.roleOther;
      (data.help||[]).forEach(v=>{const x=flow.querySelector(`input[name=help][value="${v}"]`);if(x)x.checked=true;});
      if(data.note) note.value=data.note;
      toggleOther(); words(); }
    function collect(){
      const role=flow.querySelector('input[name=role]:checked');
      data={role:role?role.value:'',roleOther:otherIn.value.trim(),help:[...flow.querySelectorAll('input[name=help]:checked')].map(x=>x.value),note:note.value.trim(),step:i};
      save(data); savedEl.classList.remove('flash'); void savedEl.offsetWidth; savedEl.classList.add('flash'); }
    const answered=()=>(data.role?1:0)+((data.help||[]).length?1:0)+(data.note?1:0);

    function renderIntro(){
      $('hello').textContent=name?t('hello',{n:name}):t('welcome');
      const a=answered(); resume.hidden=!a; restartB.hidden=!a;
      $('resumeText').textContent=t('resumeText',{a});
      startB.textContent=a?t('cont'):t('start'); }
    function show(focus){
      steps.forEach((s,k)=>s.hidden=k!==i);
      const p=Math.round((i+1)/total*100), st=t('step',{i:i+1,t:total});
      lab.textContent=st; fill.style.width=p+'%';
      bar.setAttribute('aria-valuenow',i+1); bar.setAttribute('aria-valuetext',st);
      if(!busy) next.textContent=i===total-1?t('gen'):t('next');
      steps[i].querySelectorAll('.field-err').forEach(e=>e.hidden=true); steps[i].removeAttribute('aria-invalid');
      if(focus){const f=steps[i].querySelector('input:checked')||steps[i].querySelector('input,textarea'); if(f) f.focus({preventScroll:true});}
      if(focus&&innerWidth<=640) b.scrollIntoView({block:'start'}); }
    listeners.push(()=>{renderIntro(); if(!flow.hidden) show(false); words();});

    function openFlow(){ intro.hidden=true; flow.hidden=false; i=Math.min(data.step||0,total-1); show(true); }
    startB.addEventListener('click',openFlow);
    restartB.addEventListener('click',()=>{ls.del(SKEY);data={};flow.reset();toggleOther();words();document.querySelectorAll('.idea').forEach(x=>x.classList.remove('used'));renderIntro();openFlow();});

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
      if(i<total-1){ i++; show(true); return; }
      busy=true; next.disabled=true; next.innerHTML='<svg class="i spin"><use href="#i-refresh"/></svg> '+t('generating');
      setTimeout(()=>location.href='review.html',900); }
    flow.addEventListener('submit',e=>{e.preventDefault(); go();});
    back.addEventListener('click',()=>{ clearTimeout(autoT); collect(); if(i>0){i--; show(true);} else {flow.hidden=true; intro.hidden=false; renderIntro(); startB.focus();} });

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

    // writing help
    note.addEventListener('input',()=>{ words(); clearTimeout(note._t); note._t=setTimeout(collect,400); });
    $('ideas').addEventListener('click',e=>{ const c=e.target.closest('.idea'); if(!c) return;
      const v=note.value.trim(); note.value=(v?(/[.!?]$/.test(v)?v+' ':v+'. '):'')+c.textContent+'.';
      c.classList.add('used'); words(); collect(); note.focus(); });

    restore(); applyLang();
    if(location.hash==='#q'&&answered()){ data.step=total-1; openFlow(); }
  }

  /* =================== REVIEW =================== */
  if(b.dataset.page==='review'){
    const $=id=>document.getElementById(id);
    const ta=$('review'), wc=$('wc'), edited=$('edited'), chips=$('chips');
    const D=load(); let len='short', k=0, userEdited=false;
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
    const words=()=>{ const w=ta.value.trim().split(/\s+/).filter(Boolean).length; wc.textContent=t('words',{w}); };
    function render(){
      if(!userEdited) ta.value=compose(); words();
      chips.innerHTML='';
      [roleTxt(),...(D.help||[]).map(h=>t('h_'+h)),D.note?'“'+D.note.slice(0,28)+(D.note.length>28?'…':'')+'”':''].filter(Boolean)
        .forEach(c=>{const s=document.createElement('span'); s.className='chip-b'; s.textContent=c; chips.appendChild(s);});
      if(!chips.children.length){const s=document.createElement('span'); s.className='chip-b muted'; s.textContent='—'; chips.appendChild(s);}
      document.querySelectorAll('.seg2 button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.len===len)); }
    listeners.push(()=>{ userEdited=false; edited.hidden=true; render(); });
    ta.addEventListener('input',()=>{ userEdited=true; edited.hidden=false; words(); });
    document.querySelectorAll('.seg2 button').forEach(x=>x.addEventListener('click',()=>{ len=x.dataset.len; userEdited=false; edited.hidden=true; render(); }));
    const regen=$('regen');
    regen.addEventListener('click',()=>{ const ic=regen.querySelector('svg'); ic.classList.add('spin');
      setTimeout(()=>{ k++; userEdited=false; edited.hidden=true; render(); ic.classList.remove('spin'); },600); });
    const bg=$('copied');
    const open=p=>{ p=p||'Google'; $('cp-p').textContent=t('copiedP',{p}); $('openPlat').textContent=t('open',{p}); $('gm-h').textContent=p;
      $('gtext').textContent=ta.value.slice(0,150)+(ta.value.length>150?'…':''); bg.classList.add('open'); bg.querySelector('.x').focus(); };
    const close=()=>bg.classList.remove('open');
    document.querySelectorAll('.plat').forEach(x=>x.addEventListener('click',()=>{ try{navigator.clipboard.writeText(ta.value).catch(()=>{})}catch(e){} open(x.dataset.plat); }));
    bg.addEventListener('click',e=>{ if(e.target===bg||e.target.closest('.x')) close(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    applyLang();
    if(location.hash==='#copied') open('Google');
    addEventListener('hashchange',()=>location.hash==='#copied'?open('Google'):close());
  }
})();
