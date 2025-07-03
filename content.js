const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected.js');
script.onload = () => script.remove(); // clean up once loaded
(document.head || document.documentElement).appendChild(script);
