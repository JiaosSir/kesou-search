/**
 *  校验函数封装，可链式调用
 */
export class Verify {
    constructor(fn) {
        this.rule = fn        // 赋值校验规则
        this.nextRule = null  // 下一条校验规则
    }
    addRule(fn) {             // 添加校验规则
        this.nextRule = new Verify(fn)
        return this.nextRule
    }
    exec() {                  // 执行校验
        const res = this.rule() === 'next'
        console.log(res);
        res ? this.nextRule.exec() : null
    }
    end() {                   // 校验结束
        this.nextRule = {
            exec: () => 'end'
        }
    }
}