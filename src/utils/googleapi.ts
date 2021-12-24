import Axios from "axios";
import QueryString from "qs";
/**
 * 支持的源语言
 */
export const supportSourceLanguages = new Map([["hi", "印地语"], ["ps", "普什图语"], ["pt", "葡萄牙语"], ["hmn", "苗语"], ["hr", "克罗地亚语"], ["ht", "海地克里奥尔语"], ["hu", "匈牙利语"], ["yi", "意第绪语"], ["hy", "亚美尼亚语"], ["yo", "约鲁巴语"], ["id", "印尼语"], ["ig", "伊博语"], ["af", "布尔语(南非荷兰语)"], ["is", "冰岛语"], ["it", "意大利语"], ["am", "阿姆哈拉语"], ["iw", "希伯来语"], ["ar", "阿拉伯语"], ["ja", "日语"], ["az", "阿塞拜疆语"], ["zu", "南非祖鲁语"], ["ro", "罗马尼亚语"], ["ceb", "宿务语"], ["be", "白俄罗斯语"], ["ru", "俄语"], ["bg", "保加利亚语"], ["rw", "卢旺达语"], ["bn", "孟加拉语"], ["jw", "印尼爪哇语"], ["bs", "波斯尼亚语"], ["sd", "信德语"], ["ka", "格鲁吉亚语"], ["si", "僧伽罗语"], ["sk", "斯洛伐克语"], ["sl", "斯洛文尼亚语"], ["sm", "萨摩亚语"], ["sn", "修纳语"], ["so", "索马里语"], ["sq", "阿尔巴尼亚语"], ["ca", "加泰罗尼亚语"], ["sr", "塞尔维亚语"], ["kk", "哈萨克语"], ["st", "塞索托语"], ["km", "高棉语"], ["su", "印尼巽他语"], ["kn", "卡纳达语"], ["sv", "瑞典语"], ["ko", "韩语"], ["sw", "斯瓦希里语"], ["ku", "库尔德语"], ["co", "科西嘉语"], ["ta", "泰米尔语"], ["ky", "吉尔吉斯语"], ["cs", "捷克语"], ["te", "泰卢固语"], ["tg", "塔吉克语"], ["th", "泰语"], ["la", "拉丁语"], ["lb", "卢森堡语"], ["cy", "威尔士语"], ["tk", "土库曼语"], ["tl", "菲律宾语"], ["da", "丹麦语"], ["tr", "土耳其语"], ["tt", "鞑靼语"], ["de", "德语"], ["auto", "检测语言"], ["lo", "老挝语"], ["lt", "立陶宛语"], ["lv", "拉脱维亚语"], ["zh-CN", "中文"], ["ug", "维吾尔语"], ["uk", "乌克兰语"], ["mg", "马尔加什语"], ["mi", "毛利语"], ["ur", "乌尔都语"], ["mk", "马其顿语"], ["ml", "马拉雅拉姆语"], ["haw", "夏威夷语"], ["mn", "蒙古语"], ["mr", "马拉地语"], ["uz", "乌兹别克语"], ["ms", "马来语"], ["mt", "马耳他语"], ["el", "希腊语"], ["en", "英语"], ["eo", "世界语"], ["my", "缅甸语"], ["es", "西班牙语"], ["et", "爱沙尼亚语"], ["eu", "巴斯克语"], ["vi", "越南语"], ["ne", "尼泊尔语"], ["fa", "波斯语"], ["nl", "荷兰语"], ["no", "挪威语"], ["fi", "芬兰语"], ["ny", "齐切瓦语"], ["fr", "法语"], ["fy", "弗里西语"], ["ga", "爱尔兰语"], ["gd", "苏格兰盖尔语"], ["or", "奥利亚语"], ["gl", "加利西亚语"], ["gu", "古吉拉特语"], ["xh", "南非科萨语"], ["pa", "旁遮普语"], ["ha", "豪萨语"], ["pl", "波兰语"]]);
/**
 * 支持的目标语言
 */
export const supportTargetLanguages = new Map([["hi", "印地语"], ["ps", "普什图语"], ["pt", "葡萄牙语"], ["hmn", "苗语"], ["hr", "克罗地亚语"], ["ht", "海地克里奥尔语"], ["hu", "匈牙利语"], ["yi", "意第绪语"], ["hy", "亚美尼亚语"], ["yo", "约鲁巴语"], ["id", "印尼语"], ["ig", "伊博语"], ["af", "布尔语(南非荷兰语)"], ["is", "冰岛语"], ["it", "意大利语"], ["am", "阿姆哈拉语"], ["iw", "希伯来语"], ["ar", "阿拉伯语"], ["ja", "日语"], ["az", "阿塞拜疆语"], ["zu", "南非祖鲁语"], ["ro", "罗马尼亚语"], ["ceb", "宿务语"], ["be", "白俄罗斯语"], ["ru", "俄语"], ["bg", "保加利亚语"], ["rw", "卢旺达语"], ["bn", "孟加拉语"], ["jw", "印尼爪哇语"], ["bs", "波斯尼亚语"], ["sd", "信德语"], ["ka", "格鲁吉亚语"], ["si", "僧伽罗语"], ["sk", "斯洛伐克语"], ["sl", "斯洛文尼亚语"], ["sm", "萨摩亚语"], ["sn", "修纳语"], ["so", "索马里语"], ["sq", "阿尔巴尼亚语"], ["ca", "加泰罗尼亚语"], ["sr", "塞尔维亚语"], ["kk", "哈萨克语"], ["st", "塞索托语"], ["km", "高棉语"], ["su", "印尼巽他语"], ["kn", "卡纳达语"], ["sv", "瑞典语"], ["ko", "韩语"], ["sw", "斯瓦希里语"], ["zh-TW", "中文（繁体）"], ["ku", "库尔德语"], ["co", "科西嘉语"], ["ta", "泰米尔语"], ["ky", "吉尔吉斯语"], ["cs", "捷克语"], ["te", "泰卢固语"], ["tg", "塔吉克语"], ["th", "泰语"], ["la", "拉丁语"], ["lb", "卢森堡语"], ["cy", "威尔士语"], ["tk", "土库曼语"], ["tl", "菲律宾语"], ["da", "丹麦语"], ["tr", "土耳其语"], ["tt", "鞑靼语"], ["de", "德语"], ["lo", "老挝语"], ["lt", "立陶宛语"], ["lv", "拉脱维亚语"], ["zh-CN", "中文（简体）"], ["ug", "维吾尔语"], ["uk", "乌克兰语"], ["mg", "马尔加什语"], ["mi", "毛利语"], ["ur", "乌尔都语"], ["mk", "马其顿语"], ["ml", "马拉雅拉姆语"], ["haw", "夏威夷语"], ["mn", "蒙古语"], ["mr", "马拉地语"], ["uz", "乌兹别克语"], ["ms", "马来语"], ["mt", "马耳他语"], ["el", "希腊语"], ["en", "英语"], ["eo", "世界语"], ["my", "缅甸语"], ["es", "西班牙语"], ["et", "爱沙尼亚语"], ["eu", "巴斯克语"], ["vi", "越南语"], ["ne", "尼泊尔语"], ["fa", "波斯语"], ["nl", "荷兰语"], ["no", "挪威语"], ["fi", "芬兰语"], ["ny", "齐切瓦语"], ["fr", "法语"], ["fy", "弗里西语"], ["ga", "爱尔兰语"], ["gd", "苏格兰盖尔语"], ["or", "奥利亚语"], ["gl", "加利西亚语"], ["gu", "古吉拉特语"], ["xh", "南非科萨语"], ["pa", "旁遮普语"], ["ha", "豪萨语"], ["pl", "波兰语"]]);
/**
 * 请求的翻译库
 */
let googleTranslateBl = "boq_translate-webserver_20211220.12_p0";
/**
 * 随机id
 */
let googleTranslateSId = Math.round(Math.random() * 10000000000000000000).toString();
/**
 * 已初始化标识
 */
let inited = false;
/**
 * 初始化
 */
function init() {
    if (inited) return;
    Axios.get("/api/translate").then((res) => {
        if (res.status === 200) {
            googleTranslateBl = /"FdrFJe":"([^"]+)"/i.exec(res.data)?.[1] ?? googleTranslateBl;
            googleTranslateSId = /"cfb2h":"([^"]+)"/i.exec(res.data)?.[1] ?? googleTranslateSId;
        }
    });
    inited = true;
}
/**
 * 翻译文本
 * @param origin 翻译的文本
 * @param sourceLang 原文语言类型
 * @param targetLang 要翻译的目标语言类型
 */
export function doTranslate(origin: string, sourceLang: string, targetLang: string) {
    init();
    const data = {
        'f.req': '[[["MkEWBc","[[\\"' + origin + '\\",\\"' + sourceLang + '\\",\\"' + targetLang + '\\",true],[null]]",null,"generic"]]]',
    };
    Axios.request({
        url: "/api/translate/_/TranslateWebserverUi/data/batchexecute",
        params: {
            rpcids: 'MkEWBc',
            'f.sid': googleTranslateSId,
            bl: googleTranslateBl,
            hl: 'zh-CN',
            'soc-app': 1,
            'soc-platform': 1,
            'soc-device': 4,
            '_reqid': Math.round(Math.random() * 1000000),
            rt: "c",
        },
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: QueryString.stringify(data),
        method: "POST",
    }).then((res) => { console.log(res.data) }).catch((err) => { });
}

export class TranslateResult {
    /**
     * 翻译结果
     * @param targetLang 目标语言
     * @param possibleSourceLang 可能的源语言类型
     * @param possibleSourceText 可能的源文本
     * @param resultText 翻译结果
     * @param sourcePhonetic 源文本发音
     * @param targetPhonetic 翻译结果发音
     */
    constructor(
        public targetLang: string,
        public possibleSourceLang: string,
        public possibleSourceText: string,
        public resultText: string,
        public sourcePhonetic: string,
        public targetPhonetic: string
    ) { }
}

/**
 * 获取翻译文本的匹配列表
 * @param origin 翻译的文本
 * @param sourceLang 原文语言类型
 * @param targetLang 要翻译的目标语言类型
 */
export function getMatchableList(origin: string, sourceLang: string, targetLang: string) {
    init();
    const data = {
        'f.req': '[[["AVdN8","[\\"' + origin + '\\",\\"' + sourceLang + '\\",\\"' + targetLang + '\\"]",null,"generic"]]]',
    };
    Axios.request({
        url: "/api/translate/_/TranslateWebserverUi/data/batchexecute",
        params: {
            rpcids: 'AVdN8',
            'f.sid': googleTranslateSId,
            bl: googleTranslateBl,
            hl: 'zh-CN',
            'soc-app': 1,
            'soc-platform': 1,
            'soc-device': 4,
            '_reqid': Math.round(Math.random() * 1000000),
            rt: "c",
        },
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: QueryString.stringify(data),
        method: "POST",
    }).then((res) => { }).catch((err) => { });
}
/**
 * 获取文本发音文件
 * @param origin 翻译的文本
 * @param sourceLang 原文语言类型
 */
export function getWordVoice(origin: string, sourceLang: string, callback: Function) {
    init();
    const data = {
        'f.req': '[[["jQ1olc","[\\"' + origin.trim().replaceAll(/\s/g, ' ')+ '\\",\\"' + sourceLang + '\\",null,\\"null\\"]",null,"generic"]]]',
    };
    const promise = Axios.request({
        url: "/api/translate/_/TranslateWebserverUi/data/batchexecute",
        params: {
            rpcids: 'jQ1olc',
            'f.sid': googleTranslateSId,
            bl: googleTranslateBl,
            hl: 'zh-CN',
            'soc-app': 1,
            'soc-platform': 1,
            'soc-device': 4,
            '_reqid': Math.round(Math.random() * 1000000),
            rt: "c",
        },
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: QueryString.stringify(data),
        method: "POST",
    }).then((res) => {
        if (res.status === 200) {
            const result = /\[\["wrb.fr","jQ1olc","\[\\"([^\]]+)\\"\]",null,null,null,"generic"\]\]/.exec(res.data)?.[1] ?? '';
            callback(result);
        }
    }).catch((err) => { });
}