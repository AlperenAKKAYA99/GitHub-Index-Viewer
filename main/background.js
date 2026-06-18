chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchPromotions") {
        fetch('https://ads.alperenakkaya.dev/url_ads/index.php')
            .then(response => {
                if (!response.ok) throw new Error('Ağ hatası: ' + response.status);
                return response.json();
            })
            .then(data => sendResponse({ success: true, data: data }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        
        return true; // Asenkron yanıt için kanalı açık tut
    }
});
