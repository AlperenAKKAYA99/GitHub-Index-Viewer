function addIndexViewerButton() {
    if (document.getElementById('demo-button')) {
        return; // Already added
    }

    // Try to find the pagehead actions container (the row with Star, Fork buttons)
    // or fallback to other known containers
    var container = document.querySelector('ul.pagehead-actions') ||
        document.getElementById('repository-details-container') ||
        document.querySelector('.file-navigation');

    if (!container) {
        return;
    }

    // Look for an a tag that points to index.html in the blob path
    var indexLinks = Array.from(document.querySelectorAll('a[href]')).filter(a => {
        var href = a.getAttribute('href');
        return href && href.includes('/blob/') && href.endsWith('/index.html');
    });

    if (indexLinks.length === 0) {
        return; // Hide button when no index.html is present in current view
    }

    var indexUrlPath = indexLinks[0].getAttribute('href'); // e.g. /username/repo/blob/main/index.html

    var li = document.createElement('li');

    var button = document.createElement('button');
    button.id = 'demo-button';
    button.className = 'btn btn-sm d-inline-flex flex-items-center'; // GitHub native
    button.title = 'index.html dosyasını Githack ile görüntüle';

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 640 512');
    svg.setAttribute('class', 'octicon mr-2 tmp-mr-2 svg-code-css'); // GitHub icon classes

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('d', 'M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z');

    svg.appendChild(path);
    button.appendChild(svg);

    var buttonText = document.createTextNode('Index Viewer');
    button.appendChild(buttonText);

    button.addEventListener('click', function () {
        // Convert /vnglst/pong-wars/blob/main/index.html to https://raw.githack.com/vnglst/pong-wars/main/index.html
        var githackUrl = 'https://raw.githack.com' + indexUrlPath.replace('/blob/', '/');
        window.open(githackUrl, '_blank');
    });

    if (container.tagName.toLowerCase() === 'ul') {
        li.appendChild(button);
        container.prepend(li);
    } else {
        // Add right margin if we just append to a div so it doesn't stick to other elements
        button.style.marginRight = '8px';
        container.prepend(button);
    }
}

var cachedItems = null;
var isFetchingItems = false;

function injectWidget() {
    if (document.getElementById('alperen-widget-box')) {
        return;
    }

    var sidebar = document.querySelector('rails-partial[data-partial-name="codeViewRepoRoute.Sidebar"]') ||
        document.querySelector('.BorderGrid');

    if (!sidebar) {
        return;
    }

    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'alperen-widget-box';
    widgetContainer.className = 'BorderGrid-row';

    var borderGrid = sidebar.classList.contains('BorderGrid') ? sidebar : sidebar.querySelector('.BorderGrid');

    if (borderGrid) {
        borderGrid.prepend(widgetContainer);
    } else {
        sidebar.prepend(widgetContainer);
    }

    function renderWidget(items) {
        if (items && items.length > 0) {
            const randomItem = items[Math.floor(Math.random() * items.length)];

            var cell = document.createElement('div');
            cell.className = 'BorderGrid-cell';

            cell.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h2 class="h4" style="margin: 0;">🚀 Index Viewer</h2>
                    <span style="font-size: 10px; color: var(--color-fg-muted); border: 1px solid var(--color-border-default); padding: 1px 6px; border-radius: 12px;">Sponsor</span>
                </div>
                
                <div style="margin-bottom: 12px; padding: 12px; background: var(--color-canvas-subtle); border-radius: 6px; border: 1px solid var(--color-border-default);">
                    <div style="font-weight: 600; margin-bottom: 4px; color: var(--color-fg-default);">${randomItem.title}</div>
                    <div class="text-small color-fg-muted" style="margin-bottom: 12px;">${randomItem.description}</div>
                    <a href="${randomItem.url}" target="_blank" class="btn btn-sm" style="width: 100%; text-align: center; display: block;">
                        ${randomItem.cta}
                    </a>
                </div>

                <p class="text-small color-fg-muted" style="margin: 0; display: flex; flex-direction: column; gap: 4px;">
                    <span>Bir <a href="https://alperenakkaya.dev/" target="_blank" class="text-bold Link--primary">alperenakkaya.dev</a> ürünüdür.</span>
                </p>
            `;

            widgetContainer.appendChild(cell);
        } else {
            widgetContainer.remove();
        }
    }

    if (cachedItems) {
        renderWidget(cachedItems);
        return;
    }

    if (isFetchingItems) return;
    isFetchingItems = true;

    chrome.runtime.sendMessage({ action: "fetchPromotions" }, function (response) {
        isFetchingItems = false;

        if (chrome.runtime.lastError || !response || !response.success) {
            console.warn('GitHub Index Viewer: İçerikler çekilemedi', chrome.runtime.lastError || response?.error);
            cachedItems = [{
                title: "Destek Ol",
                description: "Eklentiyi geliştirmeye devam etmemiz için bize destek olabilirsiniz.",
                url: "https://pay.alperenakkaya.dev/",
                cta: "☕ Kahve Ismarla"
            }];
            renderWidget(cachedItems);
        } else {
            cachedItems = response.data.ads || [];
            renderWidget(cachedItems);
        }
    });
}

var observer = new MutationObserver(function (mutations) {
    if (!document.getElementById('demo-button')) {
        addIndexViewerButton();
    }
    if (!document.getElementById('alperen-widget-box')) {
        injectWidget();
    }
});

window.addEventListener('load', function () {
    addIndexViewerButton();
    injectWidget();
    observer.observe(document.body, { childList: true, subtree: true });
});
