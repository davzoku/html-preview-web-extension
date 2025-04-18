const GitForgeUtils = (() => {
    const FORGE_SOFTWARES = {
      GitHub: Symbol('GitHub'),
      BitBucket: Symbol('BitBucket'),
      GitLab: Symbol('GitLab'),
      ForgeJo: Symbol('ForgeJo'),
      SourceHut: Symbol('SourceHut')
    };

    const FORGE_HOSTS = {
      GitHub_com: Symbol('GitHub_com'),
      BitBucket_org: Symbol('BitBucket_org'),
      GitLab_com: Symbol('GitLab_com'),
      Lab_Allmende_io: Symbol('Lab_Allmende_io'),
      GitLab_OpenSourceEcology_de: Symbol('GitLab_OpenSourceEcology_de'),
      CodeBerg_org: Symbol('CodeBerg_org'),
      Git_Sr_Ht: Symbol('Git_Sr_Ht')
    };

    const RE_GITLAB_PATH     = /^\/[^/]+\/.+\/(-\/)?(blob|raw)\/[^/]+/;
    const RE_SOURCEHUT_PATH  = /^\/~[^/]+\/[^/]+\/(tree|blob)\/[^/]+/;

    function extractForge(url) {
      let software = null;
      let host = null;
      if (url.host === 'raw.githubusercontent.com' || url.host === 'github.com') {
        software = FORGE_SOFTWARES.GitHub;
        host = FORGE_HOSTS.GitHub_com;
      } else if (url.host === 'bitbucket.org'
          && /^\/[^/]+\/[^/]+\/(src|raw)\/[^/]+/.test(url.pathname)) {
        software = FORGE_SOFTWARES.BitBucket;
        host = FORGE_HOSTS.BitBucket_org;
      } else if (url.host === 'gitlab.com' && RE_GITLAB_PATH.test(url.pathname)) {
        software = FORGE_SOFTWARES.GitLab;
        host = FORGE_HOSTS.GitLab_com;
      } else if (url.host === 'lab.allmende.io' && RE_GITLAB_PATH.test(url.pathname)) {
        software = FORGE_SOFTWARES.GitLab;
        host = FORGE_HOSTS.Lab_Allmende_io;
      } else if (url.host === 'gitlab.opensourceecology.de' && RE_GITLAB_PATH.test(url.pathname)) {
        software = FORGE_SOFTWARES.GitLab;
        host = FORGE_HOSTS.GitLab_OpenSourceEcology_de;
      } else if (url.host === 'codeberg.org'
          && /^\/[^/]+\/[^/]+\/(src|raw)\/[^/]+/.test(url.pathname)) {
        software = FORGE_SOFTWARES.ForgeJo;
        host = FORGE_HOSTS.CodeBerg_org;
      } else if (url.host === 'git.sr.ht' && RE_SOURCEHUT_PATH.test(url.pathname)) {
        software = FORGE_SOFTWARES.SourceHut;
        host = FORGE_HOSTS.Git_Sr_Ht;
      }
      return [software, host];
    }

    function isGitForgeFileUrl(urlStr) {
      try {
        return extractForge(new URL(urlStr))[0] !== null;
      } catch {
        return false;
      }
    }

    function isHtmlUrl(url) {
      return (url.indexOf('.html') > 0 || url.indexOf('.htm') > 0);
    }

    function isPreviewable(urlStr) {
      return isGitForgeFileUrl(urlStr) && isHtmlUrl(urlStr);
    }

    function getPreviewBase() {
      return 'https://html-preview.github.io/?url=';
    }

    return {
      isGitForgeFileUrl,
      isHtmlUrl,
      isPreviewable,
      getPreviewBase
    };
  })();