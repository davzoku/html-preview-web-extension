(() => {
  const GROUP_SEL  = '.Box-sc-g0xbh4-0 .kcLCKF';
  const PREVIEW_ID = 'html-preview';
  const url        = window.location.href;

  if (!GitForgeUtils.isPreviewable(url)) return;

  const btnGroup = document.querySelector(GROUP_SEL);
  if (!btnGroup || document.getElementById(PREVIEW_ID)) return;

  const rawA = btnGroup.querySelector('div > a[data-testid="raw-button"]');
  if (!rawA) return;

  const preview = document.createElement('button');
  preview.id          = PREVIEW_ID;
  preview.className   = rawA.className;            // copy GitHub’s button CSS
  preview.textContent = 'Preview';
  preview.setAttribute('data-size',    'small');
  preview.setAttribute('data-variant', 'default');

  btnGroup.prepend(preview);

  preview.addEventListener('click', () => {
    const previewUrl = GitForgeUtils.getPreviewBase()
      + encodeURIComponent(url);
    window.open(previewUrl, '_blank', 'noopener');
  });
})();