console.debug("Starting background page");
chrome.runtime.onInstalled.addListener(() => {
    // TODO install logic here.
    console.debug("Installed");
});

const nativePort = chrome.runtime.connectNative('com.adrienguerard.fs_access_script');
nativePort.onMessage.addListener((msg) => {
    console.log("Received", msg);
});
nativePort.onDisconnect.addListener(() => {
    console.log("Disconnected");
});
nativePort.postMessage({ text: "Hello World!" });

interface Window {
    nativePort: any;
}
window['nativePort'] = nativePort;

interface ChooseDirectoryRequest {
    type: 'chooseDir';
}

const chooseDir = async (request: ChooseDirectoryRequest) => {
};

interface GetFileRequest {
    type: 'getFile';
}

type AnyRequest = ChooseDirectoryRequest | GetFileRequest;

chrome.runtime.onMessageExternal.addListener(
    (request: AnyRequest, sender, sendResponse) => {
        switch (request.type) {
            case 'chooseDir':
                return true;
            case 'getFile':
                return true;
            default:
                sendResponse({
                    error: {
                        message: "Unknown request type"
                    }
                });
        }
    });