(() => {
  'use strict';
  const translations = {
    zh: {
      title: 'Sud0x67 · 项目导航',
      description: 'Sud0x67 的项目目录：在线工具、AI 协作、解释器教程与技术笔记。',
      skip: '跳至项目', navigation: '主导航', language: '显示语言', features: '项目特点',
      home: '首页', about: '关于', blog: '博客', navTags: '标签',
      heroOne: '一些工具，', heroTwo: '一些探索。',
      intro: '你好，我是 Sud0x67。这里收录了我的开源项目、在线工具与技术笔记。把想法写成代码，也把探索留在这里。',
      explore: '探索项目', projects: '项目目录', projectNote: '工具、产品与学习',
      toolCategory: '在线工具', productCategory: '产品', readingCategory: '阅读与学习', aboutCategory: '关于我',
      experimentCategory: '互动实验', townTitle: '无用文明',
      townDescription: '一座由 AI 驱动的 3D 共享小镇。围观日常、和居民聊天，或者投放事件，看看故事如何发展。',
      aiResidents: 'AI 居民', sharedTown: '共享小镇', interactiveWorld: '互动世界', projectSource: '项目源码',
      cipherDescription: '在浏览器本地完成加解密、摘要与编码转换。一个面向开发者的密码学工具箱。',
      teamDescription: '像与伙伴交流一样，与 AI 一起工作。探索本地优先的 AI 协作与生产力体验。',
      bookTitle: '手撸解释器教程',
      bookDescription: 'Crafting Interpreters 中文版。从一门小语言出发，一步步理解解释器的工作原理。',
      resumeTitle: '个人简历', resumeDescription: '我的工作经历、研究成果与开源实践。通过一份简历，了解项目背后的开发者。',
      localProcessing: '本地计算', bilingual: '中英双语', aiCollaboration: 'AI 协作', localFirst: '本地优先',
      interpreter: '解释器', programmingLanguages: '编程语言', chineseEdition: '中文教程',
      experience: '工作经历', research: '研究成果', openSource: '开源实践',
      archiveTitle: '博客与技术笔记', archiveDescription: '技术笔记与踩坑记录，集中在独立博客中维护。',
      readBlog: '进入博客', archives: '文章归档', tags: '按标签浏览', footer: '保持好奇，继续构建。', source: '本站源码',
    },
    en: {
      title: 'Sud0x67 · Project Directory',
      description: 'The personal index of Sud0x67: developer tools, AI collaboration, interpreters, and technical notes.',
      skip: 'Skip to projects', navigation: 'Main navigation', language: 'Display language', features: 'Project features',
      home: 'Home', about: 'About', blog: 'Blog', navTags: 'Tags',
      heroOne: 'Small tools.', heroTwo: 'Open explorations.',
      intro: 'Hi, I’m Sud0x67. This is a home for my open-source projects, developer tools, and technical notes. Turning ideas into code, one exploration at a time.',
      explore: 'Explore projects', projects: 'Project index', projectNote: 'Tools, products & learning',
      toolCategory: 'Developer tool', productCategory: 'Product', readingCategory: 'Reading & learning', aboutCategory: 'About me',
      experimentCategory: 'Interactive experiment', townTitle: 'Useless Civilization',
      townDescription: 'A shared 3D town inhabited by AI residents. Watch their daily lives, chat with them, or introduce an event and see how the story unfolds.',
      aiResidents: 'AI residents', sharedTown: 'Shared town', interactiveWorld: 'Interactive world', projectSource: 'Source code',
      cipherDescription: 'Encryption, decryption, hashes, and encodings, processed locally in your browser. A cryptography workbench for developers.',
      teamDescription: 'Work with AI as you would with a teammate. Explore a local-first approach to AI collaboration and productivity.',
      bookTitle: 'Crafting Interpreters',
      bookDescription: 'A Chinese edition of Crafting Interpreters. Build a small language and discover how interpreters work, step by step.',
      resumeTitle: 'Résumé', resumeDescription: 'My work experience, research, and open-source contributions. Get to know the developer behind these projects.',
      localProcessing: 'On-device', bilingual: '中文 / EN', aiCollaboration: 'AI collaboration', localFirst: 'Local-first',
      interpreter: 'Interpreters', programmingLanguages: 'Programming languages', chineseEdition: 'Chinese edition',
      experience: 'Experience', research: 'Research', openSource: 'Open source',
      archiveTitle: 'Blog & technical notes', archiveDescription: 'Technical notes and lessons learned, maintained in a dedicated blog.',
      readBlog: 'Read the blog', archives: 'Blog archive', tags: 'Browse by tag', footer: 'Stay curious. Keep building.', source: 'Site source',
    },
  };
  function setLanguage(language) {
    const copy = translations[language];
    if (!copy) return;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = copy.title;
    document.querySelector('meta[name="description"]').content = copy.description;
    for (const element of document.querySelectorAll('[data-i18n]')) element.textContent = copy[element.dataset.i18n];
    for (const element of document.querySelectorAll('[data-i18n-aria]')) element.setAttribute('aria-label', copy[element.dataset.i18nAria]);
    for (const button of document.querySelectorAll('[data-language]')) button.setAttribute('aria-pressed', String(button.dataset.language === language));
  }
  for (const button of document.querySelectorAll('[data-language]')) button.addEventListener('click', () => setLanguage(button.dataset.language));
})();
