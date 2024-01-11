document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('generateButton').addEventListener('click', generateBibliography);
  document.getElementById('copyButton').addEventListener('click', copyToClipboard);
});

function generateBibliography() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const pageTitle = decodeURIComponent(currentTab.title);
    const pageURL = decodeURIComponent(currentTab.url);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-GB', options).replace(/\//g, '.');

    const bibliographicLink = `${pageTitle}. URL: ${pageURL} (дата звернення: ${currentDate});`;
    document.getElementById('bibliography').value = bibliographicLink;
  });
}

function copyToClipboard() {
  const bibliographyText = document.getElementById('bibliography');
  bibliographyText.select();
  document.execCommand('copy');
}
