const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const componentStyles = document.createElement('link');
componentStyles.rel = 'stylesheet';
componentStyles.href = 'components.css';
document.head.appendChild(componentStyles);

const characterImageReplacements = {
  'assets/characters/05_icon_bust.png': 'assets/characters/teacher-new-icon.png',
  'assets/characters/01_hero_teacher.png': 'assets/characters/teacher-new-main.png',
  'assets/characters/02_worry.png': 'assets/characters/teacher-new-worry.png',
  'assets/characters/03_ok_explain.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/04_gentle_cta.png': 'assets/characters/teacher-new-cta.png',
  'assets/characters/sakura-worry.png': 'assets/characters/sakura-think.png',
  'assets/characters/sakura-thought.png': 'assets/characters/sakura-think.png',
  'assets/characters/sakura-listen.png': 'assets/characters/sakura-support.png',
  'assets/characters/sakura-guide.png': 'assets/characters/sakura-point.png',
  'assets/characters/teacher-point.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/teacher-explain.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/teacher-calm.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/teacher-smile.png': 'assets/characters/teacher-new-explain.png',
};

function normalizeCharacterImages() {
  document.querySelectorAll('img').forEach((img) => {
    const currentSrc = img.getAttribute('src');
    if (currentSrc && characterImageReplacements[currentSrc]) img.src = characterImageReplacements[currentSrc];
    img.addEventListener('error', () => {
      const failedSrc = img.getAttribute('src');
      if (failedSrc && characterImageReplacements[failedSrc]) {
        img.src = characterImageReplacements[failedSrc];
        return;
      }
      if (failedSrc && failedSrc.includes('sakura-')) img.src = 'assets/characters/sakura-think.png';
      if (failedSrc && failedSrc.includes('teacher')) img.src = 'assets/characters/teacher-new-explain.png';
    }, { once: true });
  });
}

function chooseStudentAvatar(bubbleText) {
  const text = bubbleText || '';
  if (/ひえ|不安|焦|困|悩|無理|相手にされない|いいねが来ない|マッチしません|意味がない|心当たり/.test(text)) return 'assets/characters/student-male-60s-worried.png';
  if (/落ち込|ダメ|全部やって|反応しづら|損/.test(text)) return 'assets/characters/student-male-60s-depressed.png';
  if (/でしょうか|ですか|なんですか|？|\?/.test(text)) return 'assets/characters/student-male-60s-question.png';
  if (/ふむふむ|なるほど|たしかに|納得|分かりました|現実的|大事なんですね|そういうこと/.test(text)) return 'assets/characters/student-male-60s-understanding.png';
  if (/安心|よかった|少し楽|ほっと|大丈夫/.test(text)) return 'assets/characters/student-male-60s-relieved.png';
  if (/やってみ|頑張|前向き|変えてみ|整え|改善できそう|見直してみ/.test(text)) return 'assets/characters/student-male-60s-motivated.png';
  return 'assets/characters/student-male-60s-question.png';
}

function enhanceStudentAvatars() {
  document.querySelectorAll('.conversation-row-v2 .conversation-person').forEach((person) => {
    const label = person.querySelector('.conversation-person__label');
    if (!label || !label.textContent.includes('生徒')) return;
    const avatar = person.querySelector('.conversation-person__image--student');
    if (!avatar || avatar.querySelector('img')) return;
    const row = person.closest('.conversation-row-v2');
    const bubbleText = row?.querySelector('.conversation-bubble-v2')?.textContent || '';
    const src = chooseStudentAvatar(bubbleText);
    const fallbackText = avatar.textContent.trim() || '50';
    avatar.textContent = '';
    avatar.classList.add('conversation-person__image--student-character');
    const img = document.createElement('img');
    img.src = src;
    img.alt = '生徒・50代男性';
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      avatar.classList.remove('conversation-person__image--student-character');
      avatar.textContent = fallbackText;
    }, { once: true });
    avatar.appendChild(img);
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? '×' : '☰';
  });
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });
}

function createElementFromHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function insertAfter(target, element) {
  if (!target || !target.parentElement || !element) return;
  target.parentElement.insertBefore(element, target.nextSibling);
}

function createBareInfographic(src, alt, extraClass = '') {
  return createElementFromHTML(`<figure class="article-infographic article-infographic--large article-infographic--bare ${extraClass}" data-reading-guide="true" data-src="${src}"><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${alt}" loading="lazy" /></a></figure>`);
}

function insertReasonInfographics() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage) return;
  const reasonImages = [
    ['理由1：プロフィール写真で清潔感や安心感が伝わっていない', 'assets/infographics/profile-photo-cleanliness.png', '理由1「プロフィール写真で清潔感や安心感が伝わっていない」を説明するインフォグラフィック'],
    ['理由2：自撮り・無表情・生活感の強い写真で損をしている', 'assets/infographics/profile_photo_advice_for_men_40s_50s.png', '理由2「自撮り・無表情・生活感の強い写真で損をしている」を説明するインフォグラフィック'],
    ['理由3：プロフィール文が「何者か分からない」内容になっている', 'assets/infographics/reason-7-ojisan-vibe.png', '理由3「プロフィール文が何者か分からない内容になっている」を説明するインフォグラフィック'],
    ['理由4：「若く見られます」「年齢より若いです」と書いて逆効果になっている', 'assets/infographics/reason-4-young-appeal-backfire.png', '理由4「若く見られます、年齢より若いですと書いて逆効果になっている」を説明するインフォグラフィック'],
    ['理由5：相手への希望条件が現実とズレている', 'assets/infographics/reason-5-unrealistic-conditions.png', '理由5「相手への希望条件が現実とズレている」を説明するインフォグラフィック'],
    ['理由6：メッセージが重い・長い・距離感が近すぎる', 'assets/infographics/reason-3-profile-unknown.png', '理由6「メッセージが重い・長い・距離感が近すぎる」を説明するインフォグラフィック'],
    ['理由7：会話の前に“おじさんっぽさ”が伝わってしまっている', 'assets/infographics/reason-6-heavy-message.png', '理由7「会話の前におじさんっぽさが伝わってしまっている」を説明するインフォグラフィック'],
  ];
  reasonImages.forEach(([text, src, alt]) => {
    const heading = Array.from(document.querySelectorAll('.article-main h3')).find((h) => h.textContent.trim() === text);
    if (!heading) return;
    const next = heading.nextElementSibling;
    if (next && next.classList && next.classList.contains('reason-infographic')) {
      const link = next.querySelector('a');
      const img = next.querySelector('img');
      if (link) link.href = src;
      if (img) { img.src = src; img.alt = alt; }
      next.dataset.src = src;
      return;
    }
    insertAfter(heading, createBareInfographic(src, alt, 'reason-infographic'));
  });
}

function checklistTextList(items) {
  return `<ul class="article-check-list checklist-text">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function checklistFigure(src, alt) {
  return `<figure class="article-infographic article-infographic--large article-infographic--bare checklist-infographic" data-reading-guide="true" data-src="${src}"><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${alt}" loading="lazy" /></a></figure>`;
}

function removeImageLessChecklistDuplicates() {
  const checklistTitle = 'いいねが来ないときに、年齢のせいにする前に確認したいチェックリスト';
  document.querySelectorAll('.article-main .article-block').forEach((block) => {
    const h2 = block.querySelector('h2');
    if (!h2 || h2.textContent.trim() !== checklistTitle) return;
    const hasChecklistImage = block.querySelector('img[src*="profile-photo-checklist-50s-men"], img[src*="cleanliness-checklist-50s-men"], img[src*="profile-text-checklist-50s-men"], img[src*="message-checklist-50s-men"]');
    if (!hasChecklistImage) block.remove();
  });
}

function insertChecklistInfographics() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage) return;
  removeImageLessChecklistDuplicates();
  if (document.querySelector('[data-guide="checklist-infographics-section"]')) return;
  const finalBlock = Array.from(document.querySelectorAll('.article-main .article-block')).find((block) => block.textContent.includes('まとめ｜50代男性がいいねをもらえない理由'));
  const serviceCta = document.querySelector('.article-service-cta');
  const anchor = finalBlock || serviceCta || document.querySelector('.article-main .article-block:last-of-type');
  const photoText = checklistTextList(['メイン写真は明るい場所で撮れているか', '顔がはっきり分かるか', '無表情で怖く見えていないか', '服装に清潔感があるか', '自撮り感が強すぎないか', '昔の写真を使っていないか', 'サブ写真が3〜5枚入っているか']);
  const cleanText = checklistTextList(['髪型は整っているか', '眉やひげが放置されていないか', '服がヨレていないか', '靴やバッグがくたびれていないか', '肌が脂っぽく見えていないか', '姿勢が悪く見えていないか']);
  const profileText = checklistTextList(['自分がどんな人か伝わるか', '休日の過ごし方が書かれているか', '会話のきっかけがあるか', '自虐が入っていないか', '若く見られるアピールをしすぎていないか', '相手への条件ばかり書いていないか']);
  const messageText = checklistTextList(['最初から長文になっていないか', 'いきなり会おうとしていないか', '褒め方が外見に偏っていないか', '説教や自分語りになっていないか', '相手が返信しやすい質問になっているか']);
  const section = createElementFromHTML(`<section class="article-block article-checklist-infographics" data-guide="checklist-infographics-section"><h2>いいねが来ないときに、年齢のせいにする前に確認したいチェックリスト</h2><p>写真・清潔感・プロフィール文・メッセージの4つを順番に見直すと、改善すべきポイントが分かりやすくなります。画像だけで終わらせず、実際に確認できる項目も本文として整理しました。</p><h3>写真のチェック</h3>${photoText}${checklistFigure('assets/infographics/profile-photo-checklist-50s-men.png', '50代男性向けプロフィール写真のチェック項目をまとめたインフォグラフィック')}<h3>清潔感のチェック</h3>${cleanText}${checklistFigure('assets/infographics/cleanliness-checklist-50s-men.png', '50代男性向け清潔感のチェック項目をまとめたインフォグラフィック')}<h3>プロフィール文のチェック</h3>${profileText}${checklistFigure('assets/infographics/profile-text-checklist-50s-men.png', '50代男性向けプロフィール文のチェック項目をまとめたインフォグラフィック')}<h3>メッセージのチェック</h3>${messageText}${checklistFigure('assets/infographics/message-checklist-50s-men.png', '50代男性向けメッセージのチェック項目をまとめたインフォグラフィック')}</section>`);
  if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(section, anchor);
}

document.querySelectorAll('img[src="assets/eyecatches/why-50s-men-get-no-likes.svg"]').forEach((img) => {
  img.src = 'assets/eyecatches/why-50s-men-get-no-likes.png';
});

insertReasonInfographics();
insertChecklistInfographics();
normalizeCharacterImages();
enhanceStudentAvatars();
removeImageLessChecklistDuplicates();

const visualFixes = document.createElement('style');
visualFixes.textContent = `
  .hero-guide::before{content:none!important;display:none!important;background:none!important;opacity:0!important;}
  .conversation-person__image--student{display:grid!important;place-items:center!important;background:transparent!important;color:#152a4d!important;font-weight:900!important;font-size:1.45rem!important;border:0!important;box-shadow:none!important;}
  .conversation-person__image--student-character{display:flex!important;align-items:center!important;justify-content:center!important;width:72px!important;height:82px!important;box-sizing:border-box!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;color:transparent!important;}
  .conversation-person__image--student-character img{display:block!important;width:72px!important;height:82px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:center bottom!important;filter:none!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;}
  .character-img{filter:drop-shadow(0 12px 18px rgba(21,42,77,.10))!important;}
  .article-page .article-main{gap:34px!important;}
  .article-page .article-block{padding:clamp(26px,4.2vw,46px)!important;}
  .article-page .article-block p{margin-top:.95em!important;margin-bottom:.95em!important;}
  .article-page .article-block h2{margin-top:0!important;margin-bottom:1.1em!important;}
  .article-page .article-block h3{margin-top:2em!important;margin-bottom:.85em!important;}
  .article-infographic--large img{width:100%!important;max-width:none!important;}
  .article-infographic--bare{padding:0!important;margin-top:14px!important;margin-bottom:22px!important;overflow:hidden!important;background:#fff!important;}
  .article-infographic--bare a{display:block!important;}
  .article-infographic--bare img{display:block!important;width:100%!important;height:auto!important;border-radius:18px!important;}
  .article-checklist-infographics h3{margin-top:2.4em!important;}
  .article-checklist-infographics .checklist-text{margin-top:10px!important;margin-bottom:18px!important;}
  @media (min-width:901px){.article-page .article-layout{grid-template-columns:minmax(0,780px) 280px!important;justify-content:center!important;}}
  @media (max-width:640px){
    .character-img,.hero-character,.small-character,.medium-character{filter:none!important;}
    .conversation-person{min-width:54px!important;max-width:54px!important;align-items:center!important;}
    .conversation-person__image--student-character{width:52px!important;height:62px!important;border:0!important;border-radius:0!important;overflow:visible!important;background:transparent!important;box-shadow:none!important;}
    .conversation-person__image--student-character img{width:52px!important;height:62px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:center bottom!important;transform:none!important;margin:0!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;}
    .conversation-person__label{font-size:10px!important;line-height:1.2!important;padding:4px 5px!important;max-width:58px!important;white-space:normal!important;}
    .article-page .article-hero-guide{display:none!important;}
    .article-page .article-hero{padding-top:24px!important;padding-bottom:28px!important;}
    .article-page .article-main>figure.article-block:first-child{display:none!important;}
    .article-page .article-layout{padding-top:22px!important;}
    .article-page h1{font-size:clamp(1.65rem,8vw,2.15rem)!important;line-height:1.42!important;letter-spacing:-.03em!important;}
    .article-page .article-lead,.article-page .article-block p,.article-page .article-block li{font-size:1.04rem!important;line-height:2!important;}
    .article-page .article-block{padding:24px 20px!important;border-radius:22px!important;}
    .article-page .article-block h2{font-size:1.42rem!important;line-height:1.55!important;margin-bottom:1em!important;}
    .article-page .article-block h3{font-size:1.15rem!important;line-height:1.55!important;margin-top:2.2em!important;}
    .article-page .article-main{gap:26px!important;}
    .article-infographic--large{margin-left:-6px!important;margin-right:-6px!important;border-radius:22px!important;}
    .article-infographic--large img{display:block!important;width:100%!important;min-height:210px!important;object-fit:contain!important;background:#fff!important;}
    .article-infographic--bare{margin-top:12px!important;margin-bottom:20px!important;}
    .article-infographic--bare img{min-height:0!important;object-fit:contain!important;}
    .article-summary-box--compact,.article-remember-box--compact{padding:20px!important;border-radius:22px!important;}
    .article-service-cta{padding:24px 20px!important;border-radius:22px!important;}
    .article-service-cta h2{font-size:1.32rem!important;line-height:1.55!important;}
  }
`;
document.head.appendChild(visualFixes);
