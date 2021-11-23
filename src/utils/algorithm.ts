/**
 * 中缀表达式转后缀表达式
 */
function getPostfixExpression(infixEx: string) {
    infixEx += '';
    const optStack = []; // 操作符栈
    let postfixEx = ''; // 后缀表达式
    for (const c of infixEx) {
        // 如果是该字符是数字，则分析到该数字串的结束并将该数字串加入结果字符串
        if (getOperatorPriority(c) === 0) {
            postfixEx += c;
            continue;
        }
        // 如果s1为空，或栈顶运算符为左括号“(”，则直接将此运算符入栈
        if (optStack.length == 0 || c === '(') {
            optStack.push(c);
            continue;
        }
        // 如果是右括号，则把运算符栈顶元素弹出直到第一次遇到左括号
        if (c === ')') {
            while (optStack.length > 0 && optStack[optStack.length - 1] !== '(') {
                postfixEx += optStack.pop();
            }
            optStack.pop();
            continue;
        }
        // 如果当前运算符的优先级高于栈顶的运算符，则把该运算符入栈
        if (optStack.length > 0 && getOperatorPriority(c) > getOperatorPriority(optStack[optStack.length - 1])) {
            optStack.push(c);
            continue;
        }
        // 否则，将栈顶的运算符从栈中弹出至字符串末尾，直至栈顶运算符的优先级低于当前运算符并将该字符入栈
        while (optStack.length > 0 && getOperatorPriority(c) <= getOperatorPriority(optStack[optStack.length - 1])) {
            postfixEx += optStack.pop();
        }
        optStack.push(c);
    }
    while (optStack.length > 0) {
        postfixEx += optStack.pop();
    }
    console.log(postfixEx);
    return postfixEx;
}
/**
 *  获取运算符的优先级
 */
function getOperatorPriority(opt: string) {
    switch (opt) {
        case '*':
        case '×':
        case '/':
        case '%':
            return 3;
        case '+':
        case '-':
            return 2;
        case '(':
        case ')':
            return 1;
        default:
            return 0;
    }
}

export { getPostfixExpression };