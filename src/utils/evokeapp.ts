const knownMap = new Map<RegExp, string>([
    [/alipay.com/, 'alipays://platformapi/startapp?appId=20000067&url='],
    [/^ftp:\/\//, ''],
    [/^file:\/\//, ''],
    [/^https:\/\//, ''],
    [/^http:\/\//, ''],
]);
/**
 * 是否有效的链接
 * @param path 判断的字符串
 */
export function isEffectiveUrl(path: string): boolean {
    for (const key of knownMap.keys()) {
        if (key.test(path)) {
            return true;
        }
    }
    return false;
}
/**
 * 获取跳转链接
 * @param path 原链接
 * @returns 目标链接
 */
export function getTargetLink(path: string): string {
    let matchKey: RegExp | undefined;
    let prefix = undefined;
    for (const [key, value] of knownMap) {
        if (key.test(path)) {
            matchKey = key;
            prefix = value;
            break;
        }
    }
    if (matchKey && prefix) {
        return prefix + encodeURI(path);
    }
    return path;
}