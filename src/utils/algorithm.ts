/**
 * 中缀表达式转后缀表达式
 */
export function getPostfixExpression(infixEx: string): string {
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
/**
 * 获取二叉树的中序遍历结果(递归)
 * https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/medium/94.binary-tree-inorder-traversal
 */
export function getInorderBinaryTree_recursive(root: TreeNode): Array<number> {
    if (!root) {
        return [];
    }
    // 处理左节点的中序
    const left = root.left ? getInorderBinaryTree_recursive(root.left) : [];
    // 处理右节点的中序
    const right = root.right ? getInorderBinaryTree_recursive(root.right) : [];
    // 左节点的中序 + 当前节点 + 右节点的中序
    return left.concat([root.val]).concat(right);
}
/**
 * 获取二叉树的中序遍历结果
 * https://blog.csdn.net/dabusiGin/article/details/102723054
 */
export function getInorderBinaryTree_iterative(root: TreeNode): Array<number> {
    if (!root) {
        return [];
    }
    const stack = [];
    const ret = [];
    let cur: TreeNode | undefined = root;
    while (stack.length > 0 || cur) {
        while (cur) {
            stack.push(root);
            cur = root.left;
        }
        if (stack.length > 0) {
            cur = <TreeNode>stack.pop();
            ret.push(cur.val);
            cur = cur.right;
        }
    }
    return ret;
}
/**
 * 获取二叉树的前序遍历结果
 * https://blog.csdn.net/dabusiGin/article/details/102547845
 */
export function getPreorderBinaryTree_iterative(root: TreeNode): Array<number> {
    if (!root) {
        return [];
    }
    // 入栈顺序 根节点 -> 右节点 -> 左节点
    const stack = [root];
    const ret = [];

    while (stack.length > 0) {
        const node = <TreeNode>stack.pop();
        ret.push(node.val);
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }

    return ret;
}
/**
 * 获取二叉树的后序遍历结果
 * https://blog.csdn.net/dabusigin/article/details/102736180
 */
export function getPostorderBinaryTree_iterative(root: TreeNode): Array<number> {
    if (!root) {
        return [];
    }
    // 依次将根节点、右儿子、左儿子压入一个栈中，最后一起打印栈中的元素
    const s1 = [], s2 = [];
    const ret = [];
    let cur: TreeNode | undefined = root;

    while (cur || s1.length > 0) {
        while (cur) {
            s1.push(cur);
            s2.push(cur);
            cur = cur.right;
        }
        if (s1.length > 0) {
            cur = <TreeNode>s1.pop();
            cur = cur.left;
        }
    }
    while (s2.length > 0) {
        ret.push((<TreeNode>s2.pop()).val);
    }
    return ret;
}
/**
 * 根据数组创建二叉树
 */
export function getTreeNodeByArray(arr: Array<number | null>): TreeNode | null {
    if (arr.length === 0 || arr[0] === null) {
        return null;
    }
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length > 0) {
        const node = <TreeNode>queue.shift();
        if (arr[i]) {
            node.left = new TreeNode(<number>arr[i]);
            queue.push(node.left);
        }
        i++;
        if (arr[i]) {
            node.right = new TreeNode(<number>arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

export class TreeNode {
    /**
     * 二叉树节点
     * @param val 节点值
     * @param left 左节点
     * @param right 右节点
     */
    constructor(public val: number, public left: TreeNode | undefined = undefined, public right: TreeNode | undefined = undefined) {
    }
}