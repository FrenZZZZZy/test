{
    if (window.location.href.match(/http(s|):\/\/(.+)\.forgeofempires\.com\/game/)) {
        var tidCSS = null;
        var ftisDebug = false;

        const extURL = localStorage.getItem('extUrl');

        var newS = {
            debug: "FT_De",
            licence: "FT_L",
            appid: "Ap_I",
            loader: "lo",
            versionCheck: "FT_Ve_Ce"
        };

        window.newS = newS;

        function migrate() {
            var oldS = {
                debug: "FT_D",
                licence: "FT_S",
                id: "FT_I",
                appid: "A_I",
                loader: "l",
                versionCheck: "FT_V_C"
            }
            for (const oldK in oldS) {
                if (Object.hasOwnProperty.call(oldS, oldK)) {
                    const oldV = oldS[oldK];
                    if (localStorage.getItem(oldV) !== null) {
                        localStorage.setItem(newS[oldK], localStorage.getItem(oldV));
                        localStorage.removeItem(oldV);
                    }
                }
            }
        }

        migrate();

        localStorage.setItem(newS.loader,JSON.stringify(newS));

        function guid() {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        function promisedLoadCode(src) {
            return new Promise(async (resolve, reject) => {
                let sc = document.createElement('script');
                sc.src = src;

                sc.addEventListener('load', function () {
                    this.remove();
                    resolve();
                });
                sc.addEventListener('error', function () {
                    console.error('error loading script ' + src);
                    this.remove();
                    reject();
                });

                while (!document.head && !document.documentElement) await new Promise((resolve) => {
                    // @ts-ignore
                    requestIdleCallback(resolve);
                });

                (document.head || document.documentElement).appendChild(sc);
            });
        }
        function makeId(length = 8) {
            let result = [];
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let charactersLength = characters.length;

            for (let i = 0; i < length; i++) {
                result.push(characters.charAt(Math.floor(Math.random() *
                    charactersLength)));
            }

            return result.join('');
        }
        function InjectCSS() {
            if (document.head !== null) {
                let cssFiles = [
                    "box",
                    "appEA",
                    "jquery-ui.min",
                    "jquery-ui.structure.min",
                    "jquery-ui.theme.min",
                    "jquery-ui.min",
                    "jquery.toast.min"
                ];
                for (let i in cssFiles) {
                    if (!cssFiles.hasOwnProperty(i)) {
                        break;
                    }

                    let css = document.createElement('link');
                    css.href = chrome.runtime.getURL(`css/${cssFiles[i]}.css`);
                    css.rel = 'stylesheet';
                    document.head.appendChild(css);
                }
                clearInterval(tidCSS);
            }
        }
        async function InjectCode() {
            try {
                const extURL = chrome.runtime.getURL('');
                const s = [
                    "htmlbox",
                    "sort-table",
                    "jquery-ui.min",
                    "jquery.tabslet.min",
                    "jquery.toast.min",
                    "jquery.twbsPagination.min",
                    "selectize",
                    "socket.io.min",
                    "sort-table"
                ];
                for (let i = 0; i < s.length; i++) {
                    await promisedLoadCode(`${extURL}thirdParty/${s[i]}.js`);
                }
            } catch (err) { }
        }
        function bypassDetection() {
            var A_S = function (script) {
                try {
                    document.documentElement.setAttribute('onerror', script);
                    document.documentElement.dispatchEvent(new CustomEvent('error'));
                    document.documentElement.removeAttribute('onerror');
                } catch (error) {
                    
                }
            };
            A_S(`
                var ins = ";##[\\"MarketingTrackingCommand\\"].prototype.execute=function(){console.warn(\\"[ToolDetection] Detection bypassed\\");};##[\\"de.innogames.strategycity.behaviourtracker.BehaviourTracker\\"].prototype._sendData=function(){console.warn(\\"[Tracking] _sendData bypassed\\");};##[\\"de.innogames.strategycity.behaviourtracker.BehaviourTracker\\"].prototype._initScenarios=function(){console.warn(\\"[Tracking] _initScenarios bypassed\\");};";
                var iis = "addChild(b),b.init())";
                var hm = "[\\"haxe.IMap\\"]";
                var sfo = "startFoe";
                var sfn = "startModifiedFoe";
                var hae = "handleApplicationEvent:function(a){";
                var haen = "handleApplicationEvent:function(a){this.##=##;window.game=this;";
                const g = function(t,i,h){
                    ins = ins.replaceAll("##",h);
                    haen = haen.replaceAll("##",h);
                    return "" + t.slice(0, i+iis.length) + "" + ins + ""+ t.slice(i+iis.length);
                };
                var c = "openfl-content";
                var gl = 'game_loaded';
                const tr = function(s){
                    trackLoadingProcess(s); 
                };
                let s = document.scripts;
                var f = null;
                var j = 0;
                for (var i = 0; i < s.length; i++) {
                    var cs = s[i];
                    if (cs.text.indexOf("/ForgeHX-") > 0) {
                        f = cs;
                        j = i;
                        break
                    }
                }
                var str = f.text;
                var re = /\\'src\\', \\'(.+)\\'\\);/i;
                var found = str.match(re);
                var sfHX = undefined;
                if (found.length == 2) { sfHX = found[1]; }
                var re2 = /startFoe\\(\\"openfl-content\\", (.+), (.+)\\);/i;
                var found2 = str.match(re2);
                var sfargs = undefined;
                if (found2.length == 3) { sfargs = [found2[1],found2[2]]; }
                var A_S = function(script){
                    var sE = document.createElement("script");
                    sE.innerHTML = script;
                    document.head.appendChild(sE);
                };
                var B_FPS = function(s){
                    s = s.replace("this.set_frameRate(a.fps);","this.set_frameRate(45);");
                    s = s.replaceAll("set_requestBufferDuration(500);","set_requestBufferDuration(1);");
                    s = s.replace("fps:35","fps:45");
                    s = s.replace(hae,haen);
                    return s;
                }
                onGameLoaded = async function () {
                    tr(gl);
                    if (sfHX !== undefined && sfargs !== undefined) {
                        let res = await fetch(sfHX);
                        let text = await res.text();
                        let id = text.indexOf(hm);
                        let h = null;
                        h = text[id - 1];
                        id = text.indexOf(iis);
                        let ts = text;
                        ts = g(ts, id, h);
                        ts = ts.replace(sfo, sfn);
                        ts = B_FPS(ts);
                        A_S(ts);
                        startModifiedFoe(c, parseInt(sfargs[0]), parseInt(sfargs[1]));
                    }
                }
            `);
        }
        document.addEventListener('DOMContentLoaded', function () {

            if (localStorage.getItem("uuid") === null) {
                var uuid = guid();
                console.log(uuid);
                localStorage.setItem("uuid", uuid)
            }

            localStorage.setItem('ftisDebug', ftisDebug);

            //bypassDetection();
            const extURL = chrome.runtime.getURL("");
            localStorage.setItem('extUrl', extURL);
            let extStyle = document.createElement("link");
            extStyle.rel = "stylesheet";
            extStyle.href = extURL + "css/app.css";
            (document.head || document.documentElement).appendChild(extStyle);

            InjectCode();
            tidCSS = setInterval(InjectCSS, 0);

            extStyle.addEventListener("load", function () {
                let extScript = document.createElement("script");
                extScript.src = extURL + "js/app.js";

                extScript.addEventListener("load", function () {
                    extScript.remove();
                });

                let parent = document.createElement("div");

                let vueDiv = document.createElement("div"),
                    id = makeId();
                localStorage.setItem('AppID', id);
                vueDiv.id = id;
                vueDiv.innerHTML += `<helper></helper>`;

                parent.appendChild(vueDiv);
                vueDiv.after(extScript);

                document.body.appendChild(parent);
            });
        });
    }
}